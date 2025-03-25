import { cn } from "@/lib/utils";
import React from "react";

interface BackgroundGradientProps {
  className?: string;
}

const BackgroundGradient = ({ className }: BackgroundGradientProps) => {
  return (
    <div
      className={cn(
        "absolute inset-0 -z-10 overflow-hidden pointer-events-none",
        className
      )}
    >
      <div className="absolute top-1/4 right-1/4 w-full h-[500px] rounded-full bg-accent/30 blur-[100px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 left-1/3 w-[600px] h-[600px] rounded-full bg-primary/20 blur-[120px] animate-pulse-slow animation-delay-300" />
    </div>
  );
};

export default BackgroundGradient;
