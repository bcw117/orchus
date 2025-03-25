
import React from 'react';
import { Terminal, Code, Shield, Zap, Smartphone, BarChart3 } from 'lucide-react';
import GlassCard from './ui-components/GlassCard';
import AnimatedText from './ui-components/AnimatedText';

const features = [
  {
    icon: <Terminal className="w-10 h-10 text-primary" />,
    title: 'Advanced Analytics',
    description: 'Gain deeper insights with our powerful analytics tools that transform complex data into actionable intelligence.'
  },
  {
    icon: <Code className="w-10 h-10 text-primary" />,
    title: 'Seamless Integration',
    description: 'Integrate effortlessly with your existing systems through our comprehensive API and extension ecosystem.'
  },
  {
    icon: <Shield className="w-10 h-10 text-primary" />,
    title: 'Enterprise Security',
    description: 'Rest easy with bank-level encryption, regular security audits, and compliance with global standards.'
  },
  {
    icon: <Zap className="w-10 h-10 text-primary" />,
    title: 'Lightning Performance',
    description: 'Experience unparalleled speed with our optimized infrastructure designed for mission-critical applications.'
  },
  {
    icon: <Smartphone className="w-10 h-10 text-primary" />,
    title: 'Cross-Platform',
    description: 'Access your data anywhere, anytime with native applications for all major platforms and devices.'
  },
  {
    icon: <BarChart3 className="w-10 h-10 text-primary" />,
    title: 'Predictive Intelligence',
    description: 'Stay ahead of trends with AI-powered forecasting and recommendation engines that evolve with your data.'
  }
];

const Features = () => {
  return (
    <section id="features" className="py-24 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <AnimatedText animation="fade-in" delay={200}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Designed for the modern workflow
            </h2>
          </AnimatedText>
          
          <AnimatedText animation="fade-in" delay={400}>
            <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
              Orchus combines powerful functionality with intuitive design, creating a seamless experience that adapts to your unique needs.
            </p>
          </AnimatedText>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div className="flex" key={index}>
              <AnimatedText animation="fade-in" delay={100 * (index + 1)}>
                <GlassCard className="h-full flex flex-col" hoverEffect>
                  <div className="rounded-full w-16 h-16 flex items-center justify-center bg-primary/10 mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-foreground/70 leading-relaxed">{feature.description}</p>
                </GlassCard>
              </AnimatedText>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
