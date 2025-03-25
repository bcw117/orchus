import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AgentProvider } from "./context/AgentContext";
import { AuthProvider } from "./context/AuthContext";
import Index from "./pages/Index";
import Library from "./pages/Library";
import Marketplace from "./pages/Marketplace";
import AgentDetail from "./pages/AgentDetail";
import NotFound from "./pages/NotFound";
import Login from "@/pages/Login";
import RootLayout from "@/components/RootLayout";
import ProtectedRoute from "@/components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AgentProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <RootLayout>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route
                  path="/library"
                  element={
                    <ProtectedRoute>
                      <Library />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/marketplace"
                  element={
                    <ProtectedRoute>
                      <Marketplace />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/agent/:id"
                  element={
                    <ProtectedRoute>
                      <AgentDetail />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </RootLayout>
          </TooltipProvider>
        </AgentProvider>
      </AuthProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

export default App;
