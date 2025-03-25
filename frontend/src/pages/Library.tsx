import { useEffect } from "react";
import { motion } from "framer-motion";
import { useAgents } from "@/hooks/useAgents";
import AgentCard from "@/components/AgentCard";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { ArrowRight, PlusCircle, Sparkles } from "lucide-react";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const Library = () => {
  const { userAgents } = useAgents();
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  // Ensure the page scrolls to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles className="h-12 w-12 text-primary/70" />
        </motion.div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="page-transition min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-4 md:px-6 pt-28 pb-16">
        <header className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Your Agent Library
              </h1>
              <p className="text-muted-foreground mt-1">
                View and run your collection of AI agents
              </p>
            </div>

            <Button
              onClick={() => navigate("/marketplace")}
              className="glass-button self-start md:self-auto"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Agents
            </Button>
          </div>
        </header>

        {userAgents.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <PlusCircle className="h-8 w-8 text-primary/70" />
            </div>
            <h2 className="text-xl font-semibold mb-2">
              Your library is empty
            </h2>
            <p className="text-muted-foreground max-w-md mb-6">
              Visit the marketplace to discover and combine agents to add to
              your library
            </p>
            <Button
              onClick={() => navigate("/marketplace")}
              className="glass-button"
            >
              Go to Marketplace
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {userAgents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} mode="library" />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Library;
