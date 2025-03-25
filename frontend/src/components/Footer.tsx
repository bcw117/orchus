import React from "react";
import { Twitter, Linkedin, Github, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative pt-16 pb-8 bg-background/80 backdrop-blur-md border-t border-white/10 w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 pb-12 border-b border-white/10">
          <div>
            <a href="#" className="flex items-center gap-2 mb-6">
              <img src="/icon.svg" alt="Orchus Logo" className="w-8 h-8" />
              <span className="text-2xl font-medium">Orchus</span>
            </a>
            <p className="text-foreground/70 mb-6">
              Transforming the future of technology with elegant, powerful
              solutions.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-foreground/60 hover:text-primary transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-foreground/60 hover:text-primary transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-foreground/60 hover:text-primary transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="text-foreground/60 hover:text-primary transition-colors"
              >
                <Github size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-4">Product</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  Integrations
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  Changelog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  Roadmap
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Resources</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  Guides
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  API Reference
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  Community
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  Team
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  Press
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-foreground/70 hover:text-primary transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-foreground/60 text-sm">
            &copy; {new Date().getFullYear()} Orchus. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-foreground/60 hover:text-primary transition-colors text-sm"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-foreground/60 hover:text-primary transition-colors text-sm"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-foreground/60 hover:text-primary transition-colors text-sm"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
