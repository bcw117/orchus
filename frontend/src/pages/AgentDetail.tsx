
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAgents } from '@/hooks/useAgents';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Play } from 'lucide-react';
import { toast } from 'sonner';

const AgentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { userAgents, marketplaceAgents, runAgent } = useAgents();

  // Find the agent in either user agents or marketplace agents
  const agent = [...userAgents, ...marketplaceAgents].find(a => a.id === id);

  // Ensure the page scrolls to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle agent not found
  if (!agent) {
    useEffect(() => {
      toast.error('Agent not found');
      navigate('/library');
    }, []);
    return null;
  }

  return (
    <div className="page-transition min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 md:px-6 pt-28 pb-16">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6 -ml-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="sticky top-28">
              <div className="w-full aspect-square bg-muted rounded-lg overflow-hidden mb-4">
                <img 
                  src={agent.image} 
                  alt={agent.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {agent.isUserCreated && (
                <Badge variant="secondary" className="mb-4">
                  Custom Agent
                </Badge>
              )}
              
              <Button 
                className="w-full glass-button"
                onClick={() => runAgent(agent.id)}
              >
                <Play className="mr-2 h-4 w-4" />
                Run Agent
              </Button>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold tracking-tight mb-2">{agent.name}</h1>
            <p className="text-muted-foreground mb-6">
              {agent.description}
            </p>
            
            <Card className="glass-card mb-8">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Capabilities</h2>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-xs text-primary font-medium">1</span>
                    </div>
                    <span>Advanced processing of user requests</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-xs text-primary font-medium">2</span>
                    </div>
                    <span>Personalized responses based on context</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-xs text-primary font-medium">3</span>
                    </div>
                    <span>Seamless integration with your workflow</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            {agent.parentAgents && agent.parentAgents.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Combined From</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {agent.parentAgents.map(id => {
                    const parentAgent = marketplaceAgents.find(a => a.id === id);
                    return parentAgent ? (
                      <Card key={id} className="glass-card hover:shadow-md transition-all">
                        <CardContent className="p-4 flex items-center gap-3">
                          <div className="h-10 w-10 rounded bg-muted overflow-hidden">
                            <img 
                              src={parentAgent.image} 
                              alt={parentAgent.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">{parentAgent.name}</h3>
                            <p className="text-xs text-muted-foreground line-clamp-1">
                              {parentAgent.description}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    ) : null;
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AgentDetail;
