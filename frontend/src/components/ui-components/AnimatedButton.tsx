
import { cn } from '@/lib/utils';
import React from 'react';

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

const AnimatedButton = ({ 
  children, 
  className, 
  variant = 'default', 
  size = 'md',
  loading,
  ...props 
}: AnimatedButtonProps) => {
  return (
    <button 
      className={cn(
        'relative inline-flex items-center justify-center overflow-hidden rounded-md font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50 disabled:pointer-events-none',
        
        // Variants
        variant === 'default' && 'bg-primary text-primary-foreground hover:bg-primary/90',
        variant === 'outline' && 'border border-white/10 bg-transparent hover:bg-white/5 text-foreground',
        variant === 'ghost' && 'bg-transparent hover:bg-white/5 text-foreground',
        
        // Sizes
        size === 'sm' && 'h-8 px-3 text-xs',
        size === 'md' && 'h-10 px-4 text-sm',
        size === 'lg' && 'h-12 px-6 text-base',
        
        loading && 'cursor-not-allowed',
        className
      )}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Loading</span>
        </div>
      ) : (
        <>
          <span className="relative z-10">{children}</span>
          <div className="absolute inset-0 h-full w-full scale-0 rounded-md transition-all duration-300 group-hover:scale-100 group-hover:bg-white/10" />
        </>
      )}
    </button>
  );
};

export default AnimatedButton;
