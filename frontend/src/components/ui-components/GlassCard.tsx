
import { cn } from '@/lib/utils';
import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

const GlassCard = ({ children, className, hoverEffect = false }: GlassCardProps) => {
  return (
    <div 
      className={cn(
        'glass-card p-6 rounded-xl transition-all duration-300',
        hoverEffect && 'hover:shadow-glow hover:scale-[1.02]',
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassCard;
