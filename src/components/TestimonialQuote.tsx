import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, X, Sparkles, Volume2, VolumeX } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

export default function TestimonialQuote() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [muted, setMuted] = useState(false);

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={containerVariants}
      className="relative py-32 bg-[#050505] text-white overflow-hidden border-b border-white/5"
    >
      {/* Background visual cover image with blur and low contrast */}
      <div className="absolute inset-0 z-0 opacity-20">
        <img
          src="https://images.unsplash.com/photo-1522062176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop"
          alt="Creative modern workshop studio ambient"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover filter grayscale blur-xs scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/90 to-[#050505]"></div>
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        {/* Floating Subtitle */}
        <motion.span variants={itemVariants} className="text-[10px] font-mono tracking-[0.3em] text-white/40 uppercase mb-8 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 animate-pulse text-zinc-300" />
          CASE STUDY VIDEO OUTLINE
        </motion.span>

        {/* Big Quote / Headline */}
        <motion.blockquote
          variants={itemVariants}
          className="font-display font-light text-2xl md:text-3xl lg:text-4xl tracking-tight leading-relaxed max-w-4xl text-white/95"
        >
          “Fathom® is an elite design partner. They rebuilt our visual language and established an aesthetic baseline that commands authority and stands the test of time.”
        </motion.blockquote>

        {/* Pulsing Play Trigger */}
        <motion.div
          variants={itemVariants}
          className="mt-12 relative"
        >
          {/* Pulsing ripples */}
          <span className="absolute -inset-4 rounded-full bg-white/10 animate-ping" style={{ animationDuration: '3s' }}></span>
          <span className="absolute -inset-8 rounded-full bg-white/5 animate-ping" style={{ animationDuration: '4s' }}></span>

          <button
            id="open-casestudy-video-btn"
            onClick={() => setIsVideoOpen(true)}
            className="w-20 h-20 rounded-full bg-white text-black hover:bg-zinc-200 hover:scale-105 active:scale-95 flex items-center justify-center shadow-2xl transition-all duration-300 cursor-pointer relative z-10 group"
            aria-label="Play case study video"
          >
            <Play className="w-8 h-8 fill-black text-black translate-x-0.5 group-hover:scale-110 transition-transform duration-300" />
          </button>
        </motion.div>

        <motion.span variants={itemVariants} className="text-[10px] font-mono font-bold text-white/40 tracking-wider uppercase mt-6">
          Click to play interactive video outline
        </motion.span>
      </div>

      {/* Video Lightbox Modal (Simulated high-end video case study play) */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            id="video-lightbox-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-6"
          >
            {/* Close trigger clicking outside */}
            <div className="absolute inset-0" onClick={() => setIsVideoOpen(false)}></div>

            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25 }}
              className="relative bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden aspect-16/9 w-full max-w-4xl shadow-2xl z-10 flex flex-col justify-between p-8"
            >
              {/* Top controls */}
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                  <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest">
                    STARK CASE STUDY CODENAME: SHINE
                  </span>
                </div>
                <button
                  id="close-lightbox-btn"
                  onClick={() => setIsVideoOpen(false)}
                  className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full cursor-pointer transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Dynamic visualization simulating active rendering */}
              <div className="absolute inset-0 flex flex-col items-center justify-center z-0 p-12 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop"
                  alt="Aesthetic workspace content studio preview"
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover opacity-20 filter saturate-50 brightness-50"
                />

                {/* Animated graphic loops matching modern aesthetic */}
                <div className="relative flex flex-col items-center gap-6">
                  {/* Floating geometric audio waveform visualization */}
                  <div className="flex items-end gap-1.5 h-16">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((bar) => {
                      const randomDuration = Math.random() * 0.8 + 0.5;
                      return (
                        <motion.span
                          key={bar}
                          animate={{ height: ['15%', '100%', '15%'] }}
                          transition={{
                            duration: randomDuration,
                            repeat: Infinity,
                            ease: 'easeInOut'
                          }}
                          className="w-1.5 bg-indigo-400 rounded-full"
                          style={{ height: '30%' }}
                        ></motion.span>
                      );
                    })}
                  </div>

                  <p className="font-display font-medium text-lg md:text-xl text-zinc-300 text-center max-w-md">
                    "Since launching the campaign, Stark recorded a 278% increase in social media conversions."
                  </p>
                </div>
              </div>

              {/* Bottom controls */}
              <div className="flex items-center justify-between relative z-10 mt-auto pt-6 border-t border-zinc-800/60">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono font-bold text-zinc-500">HD 1080P</span>
                  <button
                    id="lightbox-mute-btn"
                    onClick={() => setMuted(!muted)}
                    className="p-1.5 text-zinc-400 hover:text-white rounded-md flex items-center gap-1 cursor-pointer"
                  >
                    {muted ? (
                      <>
                        <VolumeX className="w-4 h-4" />
                        <span className="text-[10px] font-mono font-bold">MUTED</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-4 h-4 text-indigo-300" />
                        <span className="text-[10px] font-mono font-bold text-indigo-300">AUDIO ACTIVE</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="text-[10px] font-mono font-bold text-zinc-500">
                  EST. WATCHTIME: 1:45
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
