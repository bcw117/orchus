
import { cn } from '@/lib/utils';
import React from 'react';

interface AnimatedTextProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fade-in' | 'slide-in' | 'scale-in' | 'none';
  delay?: number; // in ms
}

const AnimatedText = ({ 
  children, 
  className,
  animation = 'fade-in',
  delay = 0
}: AnimatedTextProps) => {
  const getAnimationClass = () => {
    switch(animation) {
      case 'fade-in':
        return 'animate-fade-in';
      case 'slide-in':
        return 'translate-y-4 animate-fade-in opacity-0';
      case 'scale-in':
        return 'animate-scale-in';
      default:
        return '';
    }
  };

  return (
    <div 
      className={cn(
        getAnimationClass(),
        className
      )}
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
    >
      {children}
    </div>
  );
};

export default AnimatedText;
