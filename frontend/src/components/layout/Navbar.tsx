import { useState, useEffect } from "react";
import { X, UserCircle, Instagram, Facebook, Twitter, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { to: "/", label: "Accueil" },
    { to: "/destinations", label: "Destinations" },
    { to: "/about", label: "À propos" },
    { to: "/blog", label: "Blog" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-12 py-4 transition-all duration-500",
        isScrolled ? "bg-white shadow-sm py-3" : "bg-transparent py-6"
      )}
    >
      {/* Brand Logo */}
      <Link to="/" className="relative z-[110]">
        <img
          src="/images/logo.png"
          alt="Explor’île Logo"
          className={cn(
            "h-auto object-contain transition-all duration-500",
            isScrolled ? "w-[80px] md:w-[95px]" : "w-[90px] md:w-[105px]"
          )}
        />
      </Link>

      <div className="flex items-center gap-4 md:gap-10">
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "text-[15px] font-bold tracking-tight transition-all relative group",
                location.pathname === link.to ? "text-forest-green" : "text-slate-900 hover:text-forest-green"
              )}
            >
              {link.label}
              <span className={cn(
                "absolute -bottom-1 left-0 h-[2px] bg-forest-green transition-all duration-300",
                location.pathname === link.to ? "w-full" : "w-0 group-hover:w-full"
              )} />
            </Link>
          ))}
        </nav>

        {/* Action Icons */}
        <div className="flex items-center gap-2 relative z-[110]">
          <button className="p-2 hover:bg-slate-100 rounded-full transition-colors group">
            <UserCircle className={cn(
              "w-6 h-6 transition-colors",
              isMobileMenuOpen ? "text-white/60" : "text-slate-800 group-hover:text-forest-green"
            )} />
          </button>

          {/* Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              "p-2 rounded-full transition-all active:scale-90 md:hidden",
              isMobileMenuOpen ? "text-white" : "text-slate-900"
            )}
          >
            {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Dark Premium Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-[#0F1C0F] z-[100] md:hidden flex flex-col"
          >
            {/* Background Texture/Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

            <div className="flex-1 flex flex-col justify-center items-center px-12 relative z-10">
              <nav className="flex flex-col gap-8 text-center">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    <Link
                      to={link.to}
                      className={cn(
                        "text-3xl font-black transition-all inline-block hover:scale-110",
                        location.pathname === link.to ? "text-orange-yellow" : "text-white"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>

            {/* Menu Footer */}
            <div className="p-12 relative z-10 border-t border-white/10">
              <div className="flex flex-col items-center gap-8">
                <div className="flex gap-8">
                  <motion.a whileHover={{ y: -5 }} href="#" className="text-white/60 hover:text-orange-yellow transition-colors">
                    <Facebook className="w-6 h-6" />
                  </motion.a>
                  <motion.a whileHover={{ y: -5 }} href="#" className="text-white/60 hover:text-orange-yellow transition-colors">
                    <Instagram className="w-6 h-6" />
                  </motion.a>
                  <motion.a whileHover={{ y: -5 }} href="#" className="text-white/60 hover:text-orange-yellow transition-colors">
                    <Twitter className="w-6 h-6" />
                  </motion.a>
                </div>
                <div className="text-center space-y-2">
                  <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em]">Madagascar Authentique</p>
                  <p className="text-xs font-bold text-white/60 tracking-widest italic">contact@explorile.mg</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
