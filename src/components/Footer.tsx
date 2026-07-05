import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, ArrowUpCircle, Mail, Phone, MapPin } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 60,
      damping: 14,
    },
  },
};

export default function Footer() {
  const [formData, setFormData] = useState({ email: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.email) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ email: '' });
    }, 1200);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.footer
      id="contact"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
      className="bg-white text-black relative overflow-hidden pt-24 pb-12 border-t border-black/5"
    >
      {/* Background massive decorative "amTOP" display outline letters */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full select-none pointer-events-none z-0 overflow-hidden text-center">
        <h1 className="font-display font-light text-[22vw] leading-none tracking-tighter text-black/[0.015] uppercase whitespace-nowrap">
          amTOP
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Top Interactive Newsletter row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start pb-16 border-b border-black/10">
          
          <motion.div variants={itemVariants} className="lg:col-span-5">
            <span className="text-[10px] font-mono tracking-[0.3em] text-zinc-500 uppercase">
              GET STARTED
            </span>
            <h2 className="font-display font-light text-3xl md:text-4xl tracking-tight leading-tight text-black mt-3">
              Start Growing With amTop
            </h2>
            <p className="text-sm text-zinc-600 mt-4 leading-relaxed max-w-md font-sans">
              Sign up today and get your ads, content, and SEO running within 24 hours. No team. No agency. No confusion.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="lg:col-span-7 w-full bg-zinc-50 p-6 md:p-8 rounded-3xl border border-black/10 backdrop-blur-xs">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  id="newsletter-form"
                  key="newsletter-form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-4"
                >
                  <div className="flex flex-col">
                    <label htmlFor="newsletter-email" className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500 mb-1.5 font-bold">
                      ENTER YOUR BUSINESS EMAIL FOR INSTANT ACCESS
                    </label>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        id="newsletter-email"
                        type="email"
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ email: e.target.value })}
                        className="flex-1 px-4 py-3 bg-white border border-black/15 rounded-xl text-sm text-black placeholder-zinc-400 focus:outline-hidden focus:border-zinc-500 focus:bg-zinc-50/50 transition-all duration-300"
                        required
                      />
                      <button
                        id="submit-newsletter-btn"
                        type="submit"
                        disabled={isSubmitting}
                        className="py-3 px-6 bg-black hover:bg-zinc-800 text-white text-xs font-mono font-bold tracking-widest uppercase rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-sm"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            DISPATCHING...
                          </>
                        ) : (
                          <>
                            START FREE
                            <Send className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  id="newsletter-success-panel"
                  key="success-panel"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-6 text-center"
                >
                  <CheckCircle2 className="w-12 h-12 text-zinc-700 mb-4 animate-bounce" />
                  <h3 className="font-display font-light text-xl text-black">Your Trial Setup is Initialized!</h3>
                  <p className="text-sm text-zinc-600 mt-2 max-w-sm font-sans">
                    We have registered your interest. Our on-boarding specialist will reach out to you within under 4 business hours to set up your system.
                  </p>
                  <button
                    id="reset-newsletter-btn"
                    onClick={() => setIsSubmitted(false)}
                    className="mt-4 text-[10px] font-mono text-zinc-600 hover:text-black uppercase tracking-widest cursor-pointer"
                  >
                    REGISTER ANOTHER EMAIL
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>

        {/* Middle Brand and Link columns */}
        <motion.div variants={containerVariants} className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-12 py-16">
          
          {/* Logo Brand column */}
          <motion.div variants={itemVariants} className="col-span-2 lg:col-span-4 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-display font-medium italic tracking-tight text-black flex items-center gap-1">
                amTOP<span className="w-1.5 h-1.5 rounded-full bg-black"></span>
              </h3>
              <p className="text-sm text-zinc-600 mt-4 max-w-sm leading-relaxed font-sans font-light">
                Not another AI tool that generates random content. A complete marketing system built around proven frameworks and real-world results.
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 block">DIRECT SUPPORT</span>
              <a href="mailto:amarnath@amtop.in" className="text-sm text-zinc-700 hover:text-black font-mono flex items-center gap-2 transition-colors">
                <Mail className="w-4 h-4 text-zinc-500" />
                amarnath@amtop.in
              </a>
            </div>
          </motion.div>

          {/* Links Column 1: Products */}
          <motion.div variants={itemVariants} className="col-span-1 lg:col-span-2 lg:col-start-6">
            <h4 className="text-[10px] font-mono tracking-[0.2em] text-zinc-500 uppercase mb-4 font-bold">
              PRODUCTS
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-zinc-600 font-sans font-light">
              <li><a href="#projects" className="hover:text-black transition-colors">Products</a></li>
              <li><a href="#projects" className="hover:text-black transition-colors">Changelog</a></li>
              <li><a href="#projects" className="hover:text-black transition-colors">Enterprise</a></li>
              <li><a href="#projects" className="hover:text-black transition-colors">Explore</a></li>
            </ul>
          </motion.div>

          {/* Links Column 2: Core Platform */}
          <motion.div variants={itemVariants} className="col-span-1 lg:col-span-2">
            <h4 className="text-[10px] font-mono tracking-[0.2em] text-zinc-500 uppercase mb-4 font-bold">
              PLATFORM
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-zinc-600 font-sans font-light">
              <li><a href="#projects" className="hover:text-black transition-colors">Pricing</a></li>
              <li><a href="#projects" className="hover:text-black transition-colors">Customers</a></li>
              <li><a href="#story" className="hover:text-black transition-colors">Company</a></li>
            </ul>
          </motion.div>

          {/* Links Column 3: Corporate */}
          <motion.div variants={itemVariants} className="col-span-1 lg:col-span-2">
            <h4 className="text-[10px] font-mono tracking-[0.2em] text-zinc-500 uppercase mb-4 font-bold">
              COMPANY
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-zinc-600 font-sans font-light">
              <li><a href="#story" className="hover:text-black transition-colors">About</a></li>
              <li><a href="#blog" className="hover:text-black transition-colors">Blog</a></li>
              <li><a href="#contact" className="hover:text-black transition-colors">Careers</a></li>
              <li><a href="#contact" className="hover:text-black transition-colors">Contact Us</a></li>
            </ul>
          </motion.div>

          {/* Links Column 4: Legal */}
          <motion.div variants={itemVariants} className="col-span-1 lg:col-span-2">
            <h4 className="text-[10px] font-mono tracking-[0.2em] text-zinc-500 uppercase mb-4 font-bold">
              LEGAL
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-zinc-600 font-sans font-light">
              <li><a href="#contact" className="hover:text-black transition-colors">Terms & Services</a></li>
              <li><a href="#contact" className="hover:text-black transition-colors font-mono text-[10px] tracking-widest text-emerald-600 block font-bold">LOGIN</a></li>
            </ul>
          </motion.div>

        </motion.div>

        {/* Bottom copyright & To-top trigger */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-black/5 text-[11px] font-mono text-zinc-500 gap-4 relative z-10">
          <div>
            © {new Date().getFullYear()} amTOP Systems. All rights reserved. Registered email support: amarnath@amtop.in
          </div>
          
          <div className="flex items-center gap-6">
            <button
              id="footer-totop-btn"
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-zinc-500 hover:text-black cursor-pointer transition-colors"
            >
              BACK TO TOP
              <ArrowUpCircle className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

      </div>
    </motion.footer>
  );
}
