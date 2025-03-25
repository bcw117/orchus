import { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles, Library, ShoppingBag, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const { signOut, user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        scrolled
          ? "py-3 bg-[#17202A]/90 backdrop-blur-md shadow-md"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/icon.svg" alt="Orchus Logo" className="h-6 w-6" />
          <span className="font-bold text-2xl">Orchus</span>
        </Link>

        {user && (
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/library"
              className={`nav-link ${
                location.pathname === "/library" ? "active" : ""
              }`}
            >
              <div className="flex items-center gap-1.5">
                <Library className="h-4 w-4" />
                <span>Library</span>
              </div>
            </Link>
            <Link
              to="/marketplace"
              className={`nav-link ${
                location.pathname === "/marketplace" ? "active" : ""
              }`}
            >
              <div className="flex items-center gap-1.5">
                <ShoppingBag className="h-4 w-4" />
                <span>Marketplace</span>
              </div>
            </Link>
          </div>
        )}

        <div className="flex items-center space-x-4">
          {user && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="flex items-center gap-1.5 subtle-ring-focus border-white/10 hover:bg-white/10"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          )}
        </div>
      </div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary/20"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
    </header>
  );
};

export default Navigation;
