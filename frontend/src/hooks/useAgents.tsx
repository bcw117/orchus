
import { useAgents as useAgentsContext } from '../context/AgentContext';

export const useAgents = () => {
  const context = useAgentsContext();
  return context;
};
