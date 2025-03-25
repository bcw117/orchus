import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Plus, Check } from "lucide-react";
import { useAgents } from "@/hooks/useAgents";
import { Agent } from "@/context/AgentContext";
import { motion } from "framer-motion";

interface AgentCardProps {
  agent: Agent;
  mode: "library" | "marketplace";
}

const AgentCard = ({ agent, mode }: AgentCardProps) => {
  const { selectedAgents, toggleAgentSelection, runAgent } = useAgents();
  const isSelected = selectedAgents.includes(agent.id);
  const [isRunning, setIsRunning] = useState(false);

  console.log(agent.image);

  const handleRunAgent = async () => {
    setIsRunning(true);
    await runAgent(agent.id);
    setIsRunning(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col bg-card border-border/30 shadow-lg">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg font-semibold">
              {agent.name}
            </CardTitle>
            {agent.isUserCreated && (
              <Badge variant="secondary" className="ml-2">
                Custom
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="py-2 flex-grow">
          <div className="w-full h-32 bg-muted rounded-md mb-4 overflow-hidden">
            <img
              src={agent.image == "/placeholder.svg" ? "/fly.svg" : agent.image}
              alt={agent.name}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-sm text-card-foreground/80">{agent.description}</p>

          {agent.parentAgents && agent.parentAgents.length > 0 && (
            <div className="mt-3">
              <p className="text-xs text-card-foreground/70 mb-1">
                Combined from:
              </p>
              <div className="flex flex-wrap gap-1">
                {agent.parentAgents.map((id) => (
                  <Badge key={id} variant="outline" className="text-xs">
                    Agent #{id}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="pt-2">
          {mode === "marketplace" ? (
            <Button
              variant={isSelected ? "default" : "outline"}
              className={`w-full justify-center transition-all ${
                isSelected
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-[#3b1d42]"
              }`}
              onClick={() => toggleAgentSelection(agent.id)}
            >
              {isSelected ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Selected
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Select
                </>
              )}
            </Button>
          ) : (
            <Button
              variant="default"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={handleRunAgent}
              disabled={isRunning}
            >
              {isRunning ? (
                <>Running...</>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Run Agent
                </>
              )}
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default AgentCard;
