import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import AuthForm from "@/components/AuthForm";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import CallToAction from "@/components/CallToAction";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Index = () => {
  const { user, isLoading } = useAuth();

  // Reset scroll position when component mounts
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

  if (user) {
    return <Navigate to="/library" replace />;
  }

  return (
    <div className="page-transition min-h-screen flex flex-col items-center justify-center">
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
};

export default Index;
