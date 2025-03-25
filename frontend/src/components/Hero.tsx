import React, { useEffect, useRef } from "react";
import AnimatedText from "./ui-components/AnimatedText";
import AnimatedButton from "./ui-components/AnimatedButton";
import BackgroundGradient from "./ui-components/BackgroundGradient";
import { Link, useNavigate } from "react-router-dom";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  // Parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;

      const x = e.clientX;
      const y = e.clientY;

      const width = window.innerWidth;
      const height = window.innerHeight;

      const moveX = (x - width / 2) * 0.01;
      const moveY = (y - height / 2) * 0.01;

      const heroImgElements =
        heroRef.current.querySelectorAll(".parallax-element");

      heroImgElements.forEach((element) => {
        const speed = Number((element as HTMLElement).dataset.speed || 1);
        (element as HTMLElement).style.transform = `translate(${
          moveX * speed
        }px, ${moveY * speed}px)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <AnimatedText animation="scale-in" delay={300}>
            <div className="flex justify-center mb-6">
              <img
                src="/icon.svg"
                alt="Orchus Logo"
                className="w-24 h-24 md:w-32 md:h-32"
              />
            </div>
          </AnimatedText>

          <AnimatedText animation="fade-in" delay={500}>
            <p className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed text-white">
              <h3 className="font-bold text-5xl">
                Build, combine and use AI agents.
              </h3>{" "}
              <br />
              <span className="text-[#99C0F1] font-bold text-3xl">
                All in one powerful marketplace
              </span>
            </p>
          </AnimatedText>

          <AnimatedText animation="fade-in" delay={700}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <AnimatedButton
                size="lg"
                className="group inline-flex items-center bg-transparent border border-white text-white hover:bg-white hover:text-black"
                onClick={() => {
                  navigate("/library");
                }}
              >
                <span className="inline-flex items-center">
                  Try it out!
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
            </div>
          </AnimatedText>
        </div>
      </div>
    </section>
  );
};

export default Hero;
