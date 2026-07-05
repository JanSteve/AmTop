import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight, Play } from 'lucide-react';

interface HeaderProps {
  onContactClick: () => void;
  onClientHubClick: () => void;
}

export default function Header({ onContactClick, onClientHubClick }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex flex-col items-center px-4 pointer-events-none">
      <motion.header
        id="main-header"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`pointer-events-auto w-full max-w-5xl rounded-[28px] border transition-all duration-500 overflow-hidden ${
          scrolled
            ? 'bg-white/95 backdrop-blur-xl border-black/10 shadow-[0_15px_40px_rgba(0,0,0,0.06)]'
            : 'bg-white/40 backdrop-blur-md border-black/5'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 md:px-8">
          {/* Logo */}
          <button
            id="header-logo-btn"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-xl font-display italic font-semibold tracking-wider text-black flex items-center gap-1 cursor-pointer"
          >
            amTOP<span className="w-1.5 h-1.5 rounded-full bg-black animate-pulse"></span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: 'About Us', target: 'story' },
              { label: 'Blog', target: 'projects' },
              { label: 'Contact', target: 'contact' }
            ].map((item) => (
              <button
                id={`nav-link-${item.target}`}
                key={item.target}
                onClick={() => scrollToSection(item.target)}
                className="text-xs font-mono font-medium tracking-widest uppercase text-black/75 hover:text-black transition-colors duration-200 cursor-pointer relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </nav>

          {/* Action Button */}
          <div className="hidden md:flex items-center gap-3">
            <button
              id="header-client-hub-btn"
              onClick={onClientHubClick}
              className="px-6 py-2.5 rounded-full text-[10px] font-mono font-bold tracking-[0.2em] uppercase border border-sky-400/35 hover:border-sky-500/60 hover:bg-sky-50 transition-all duration-300 flex items-center gap-2 cursor-pointer bg-sky-50/30 shadow-xs text-sky-600 active:scale-95"
            >
              SIGN IN
              <Play className="w-2.5 h-2.5 fill-sky-500 text-sky-500 shrink-0" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-black focus:outline-hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-nav-drawer"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white border-t border-black/10 px-6 pb-8 pt-4 overflow-hidden"
            >
              <div className="flex flex-col gap-5">
                {[
                  { label: 'About Us', target: 'story' },
                  { label: 'Blog', target: 'projects' },
                  { label: 'Contact', target: 'contact' }
                ].map((item) => (
                  <button
                    id={`mobile-nav-link-${item.target}`}
                    key={item.target}
                    onClick={() => scrollToSection(item.target)}
                    className="text-left text-xs font-mono font-medium tracking-widest uppercase text-black/70 hover:text-black py-1 cursor-pointer"
                  >
                    {item.label}
                  </button>
                ))}
                <hr className="border-black/5 my-1" />
                <button
                  id="mobile-client-hub-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onClientHubClick();
                  }}
                  className="w-full py-2.5 border border-sky-400/35 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-sky-50 text-sky-600 mb-1 cursor-pointer bg-sky-50/10"
                >
                  SIGN IN
                  <Play className="w-2.5 h-2.5 fill-sky-500 text-sky-500 shrink-0" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </div>
  );
}
