import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

export interface Agent {
  id: string;
  name: string;
  description: string;
  image: string;
  isUserCreated?: boolean;
  parentAgents?: string[];
}

interface AgentContextType {
  marketplaceAgents: Agent[];
  userAgents: Agent[];
  selectedAgents: string[];
  toggleAgentSelection: (agentId: string) => void;
  combineAgents: () => void;
  runAgent: (agentId: string) => Promise<void>;
  clearSelectedAgents: () => void;
}

const AgentContext = createContext<AgentContextType | undefined>(undefined);

export const AgentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [marketplaceAgents, setMarketplaceAgents] = useState<Agent[]>([]);
  const [userAgents, setUserAgents] = useState<Agent[]>([]);
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);

  // Fetch marketplace agents from the backend on component mount
  useEffect(() => {
    const fetchMarketplaceAgents = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/get_marketplace_agents"
        );
        if (!response.ok) {
          toast.error("Failed to load marketplace agents");
          return;
        }
        const agents = await response.json();
        setMarketplaceAgents(agents);
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while loading marketplace agents");
      }
    };

    fetchMarketplaceAgents();
  }, []);

  // Load user agents from localStorage
  useEffect(() => {
    const savedUserAgents = localStorage.getItem("userAgents");
    if (savedUserAgents) {
      setUserAgents(JSON.parse(savedUserAgents));
    }
  }, []);

  // Save user agents to localStorage whenever they change
  useEffect(() => {
    if (userAgents.length > 0) {
      localStorage.setItem("userAgents", JSON.stringify(userAgents));
    }
  }, [userAgents]);

  const toggleAgentSelection = (agentId: string) => {
    setSelectedAgents((prev) => {
      if (prev.includes(agentId)) {
        return prev.filter((id) => id !== agentId);
      } else {
        // Only allow selecting up to 3 agents
        if (prev.length < 3) {
          return [...prev, agentId];
        } else {
          toast.error("You can only select up to 3 agents at a time");
          return prev;
        }
      }
    });
  };

  const clearSelectedAgents = () => {
    setSelectedAgents([]);
  };

  const combineAgents = async () => {
    if (selectedAgents.length < 2) {
      toast.error("Please select at least 2 agents to combine");
      return;
    }

    // Get the selected agent objects
    const selectedAgentObjects = marketplaceAgents.filter((agent) =>
      selectedAgents.includes(agent.id)
    );

    // Create a new combined agent
    const newAgent: Agent = {
      id: `combined-${Date.now()}`,
      name: `Combined Agent (${selectedAgentObjects
        .map((a) => a.name.split(" ")[0])
        .join(" + ")})`,
      description: `A powerful agent combining capabilities of ${selectedAgentObjects
        .map((a) => a.name)
        .join(", ")}`,
      image: "/fly.svg",
      isUserCreated: true,
      parentAgents: selectedAgents,
    };

    // Add the new agent to user agents
    setUserAgents((prev) => [...prev, newAgent]);

    // Clear selected agents
    setSelectedAgents([]);

    try {
      // Combine the agents
      const combineOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          agent_ids: selectedAgentObjects.map((a) => a.id),
        }),
      };

      const response = await fetch(
        "http://localhost:8080/combine",
        combineOptions
      );
      if (!response.ok) {
        throw new Error("Failed to combine agents");
      }

      // Clear selected agents
      setSelectedAgents([]);
      toast.success("Agents combined successfully! Added to your library.");
    } catch (error) {
      toast.error("Failed to combine agents");
      console.error(error);
    }
  };

  const runAgent = async (agentId: string) => {
    toast.info("Agent is running...");

    try {
      const startOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          agent_id: agentId,
        }),
      };

      const response = await fetch(
        "http://localhost:8080/start_agent_run",
        startOptions
      );
      if (!response.ok) {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.error}`);
        return;
      }
      const data = await response.json();
      toast.success(`Agent completed successfully! State: ${data.state}`);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while running the agent");
    }
  };

  return (
    <AgentContext.Provider
      value={{
        marketplaceAgents,
        userAgents,
        selectedAgents,
        toggleAgentSelection,
        combineAgents,
        runAgent,
        clearSelectedAgents,
      }}
    >
      {children}
    </AgentContext.Provider>
  );
};

export const useAgents = () => {
  const context = useContext(AgentContext);
  if (!context) {
    throw new Error("useAgents must be used within an AgentProvider");
  }
  return context;
};
