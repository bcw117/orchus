
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAgents } from '@/hooks/useAgents';
import AgentCard from '@/components/AgentCard';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Combine, X } from 'lucide-react';

const Marketplace = () => {
  const { 
    marketplaceAgents, 
    selectedAgents, 
    combineAgents, 
    clearSelectedAgents 
  } = useAgents();
  
  // Ensure the page scrolls to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-transition min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 md:px-6 pt-28 pb-16">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Agent Marketplace</h1>
          <p className="text-muted-foreground mt-1">
            Discover and combine powerful AI agents
          </p>
        </header>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {marketplaceAgents.map((agent) => (
            <AgentCard 
              key={agent.id} 
              agent={agent} 
              mode="marketplace" 
            />
          ))}
        </div>
      </main>
      
      {selectedAgents.length > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 glass-card border-t border-white/20 py-4 px-4 md:px-6 shadow-lg z-40"
        >
          <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center">
              <span className="text-sm font-medium mr-3">
                {selectedAgents.length} agents selected
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSelectedAgents}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
            </div>
            
            <Button 
              onClick={combineAgents} 
              className="glass-button sm:self-end w-full sm:w-auto"
              disabled={selectedAgents.length < 2}
            >
              <Combine className="mr-2 h-4 w-4" />
              Combine Agents
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Marketplace;
