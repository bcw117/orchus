import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import AnimatedButton from "./ui-components/AnimatedButton";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300",
        scrolled
          ? "backdrop-blur-lg bg-background/70 border-b border-white/5"
          : ""
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-center gap-8">
            <a href="#" className="flex items-center gap-2">
              <span className="text-2xl font-bold">Orchus</span>
            </a>

            <nav className="flex items-center space-x-8">
              <a
                href="#services"
                className="text-lg font-semibold text-foreground/80 hover:text-foreground transition-colors duration-200"
              >
                Services
              </a>

              <a
                href="#library"
                className="text-lg font-semibold text-foreground/80 hover:text-foreground transition-colors duration-200"
              >
                Library
              </a>
              <a
                href="#about"
                className="text-lg font-semibold text-foreground/80 hover:text-foreground transition-colors duration-200"
              >
                About
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/login">
              <AnimatedButton
                variant="ghost"
                size="sm"
                className="hidden sm:inline-flex "
              >
                <p className="text-sm font-semibold">Login</p>
              </AnimatedButton>
            </Link>
            <AnimatedButton
              variant="default"
              size="sm"
              className="bg-transparent border border-white text-white hover:bg-white hover:text-black"
            >
              <p className="text-sm font-semibold">Get Started</p>
            </AnimatedButton>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
