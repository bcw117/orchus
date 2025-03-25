import React from "react";
import AnimatedButton from "./ui-components/AnimatedButton";
import AnimatedText from "./ui-components/AnimatedText";

const CallToAction = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-accent/10 backdrop-blur-3xl"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-accent/30 to-accent/5 rounded-2xl p-8 md:p-12 lg:p-16 border border-white/10 shadow-glass">
          <div className="text-center">
            <AnimatedText animation="fade-in">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
                Ready to transform your workflow?
              </h2>
            </AnimatedText>

            <AnimatedText animation="fade-in" delay={200}>
              <p className="text-lg text-foreground/80 mb-8 max-w-2xl mx-auto">
                Join thousands of forward-thinking organizations already using
                Orchus to drive innovation and efficiency.
              </p>
            </AnimatedText>

            <AnimatedText animation="fade-in" delay={400}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <AnimatedButton size="lg" className="group">
                  <span className="inline-flex items-center">
                    Get Started
                    <svg
                      className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </span>
                </AnimatedButton>
                <AnimatedButton variant="outline" size="lg">
                  Contact Sales
                </AnimatedButton>
              </div>
            </AnimatedText>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
