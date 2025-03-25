
import { cn } from '@/lib/utils';
import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'outline' | 'secondary';
}

const Badge = ({ children, className, variant = 'default' }: BadgeProps) => {
  return (
    <span 
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        variant === 'default' && 'bg-primary/10 text-primary',
        variant === 'outline' && 'border border-primary/20 text-foreground',
        variant === 'secondary' && 'bg-secondary text-secondary-foreground',
        className
      )}
    >
      {children}
    </span>
  );
};

export default Badge;
