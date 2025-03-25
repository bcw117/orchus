import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { AuthError } from "@supabase/supabase-js";

type AuthMode = "signin" | "signup";

interface AuthFormProps {
  onSuccess: () => void;
}

const AuthForm = ({ onSuccess }: AuthFormProps) => {
  const [mode, setMode] = useState<AuthMode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        toast.success("Signed in successfully!");
        onSuccess();
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) throw error;

        toast.success(
          "Account created successfully! Please check your email for verification."
        );
        // Automatically switch to sign in mode after successful signup
        setMode("signin");
      }
    } catch (error) {
      const authError = error as AuthError;
      toast.error(`Authentication failed: ${authError.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setMode(mode === "signin" ? "signup" : "signin");
  };

  return (
    <div className="animate-fade-in flex items-center justify-center w-full max-w-md mx-auto p-4">
      <Card className="w-full bg-[#1F1F1F] border border-border/30 shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            {mode === "signin" ? "Sign In" : "Create an Account"}
          </CardTitle>
          <CardDescription className="text-center text-card-foreground/70">
            {mode === "signin"
              ? "Enter your credentials to access your account"
              : "Fill in the details below to create your account"}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Input
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-[#464646] border-border/20 text-card-foreground"
              />
            </div>
            <div className="space-y-2">
              <Input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-[#464646] border-border/20 text-card-foreground"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading
                ? mode === "signin"
                  ? "Signing in..."
                  : "Creating account..."
                : mode === "signin"
                ? "Sign In"
                : "Create Account"}
            </Button>
            <div className="text-center text-sm text-card-foreground/80">
              {mode === "signin"
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                type="button"
                onClick={toggleMode}
                className="text-primary hover:text-primary/80 font-medium transition-colors"
              >
                {mode === "signin" ? "Sign Up" : "Sign In"}
              </button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AuthForm;
