import AuthForm from "@/components/AuthForm";
import { motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  if (user) {
    navigate("/library");
  }
  return (
    <div className="page-transition min-h-screen flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center mb-4">
          <motion.div
            animate={{
              rotate: [0, 10, 0, -10, 0],
              scale: [1, 1.1, 1, 1.1, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <img src="/icon.svg" alt="Orchus Logo" className="h-12 w-12" />
          </motion.div>
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-2">
          <span className="bg-clip-text text-white">Orchus</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-md">
          Build, combine, and use AI agents in one powerful marketplace
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="w-full max-w-md"
      >
        <AuthForm
          onSuccess={() => {
            navigate("/library");
          }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-12 text-center text-sm text-muted-foreground max-w-md"
      >
        <p>Create an account to get started.</p>
      </motion.div>
    </div>
  );
};

export default Login;
