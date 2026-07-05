import { useState, useEffect, useRef, ChangeEvent } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Play, Pause, Sparkles, Volume2, VolumeX, Asterisk, ArrowRight } from 'lucide-react';

export default function Hero() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(15);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Scroll effect for the phone mockup parallax
  const { scrollY } = useScroll();
  const phoneY = useTransform(scrollY, [0, 600], [0, -40]);
  const textScale = useTransform(scrollY, [0, 400], [1, 0.96]);
  const textOpacity = useTransform(scrollY, [0, 400], [1, 0.4]);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch((err) => {
          console.log("Autoplay blocked, user interaction required:", err);
          setIsPlaying(false);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const percentage = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(percentage);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration || 15);
    }
  };

  const handleProgressChange = (e: ChangeEvent<HTMLInputElement>) => {
    const percentage = Number(e.target.value);
    setProgress(percentage);
    if (videoRef.current && videoRef.current.duration) {
      videoRef.current.currentTime = (percentage / 100) * videoRef.current.duration;
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-24 pb-14 flex flex-col items-center justify-between overflow-hidden bg-white hero-gradient"
    >
      {/* Premium Cinematic Background Video Layer */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none opacity-[0.04] mix-blend-darken">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-105 filter blur-[2px]"
          src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-and-numbers-31907-large.mp4"
        />
        {/* Soft elegant vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white"></div>
      </div>

      {/* Sophisticated Ambient Glow Accents */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-sky-400/5 rounded-full blur-[120px] pointer-events-none animate-pulse duration-5000"></div>
      <div className="absolute bottom-1/4 right-1/10 w-[450px] h-[450px] bg-cyan-300/5 rounded-full blur-[140px] pointer-events-none"></div>

      {/* 2-Column Horizontal Split Page Layout */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center relative z-10 text-left mt-8 mb-12 flex-grow">
        
        {/* Left Column: 41.6% space (col-span-5) containing separate semantic divs */}
        <div className="lg:col-span-5 flex flex-col items-start text-left w-full gap-6">
          
          {/* Div 1: Floating Tag Component */}
          <div className="w-full">
            <motion.div
              id="hero-tag"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 text-left py-1"
            >
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-sky-50 text-sky-500 border border-sky-200">
                <Play className="w-2 h-2 fill-sky-500 text-sky-500" />
              </span>
              <span className="text-[10px] sm:text-[11px] md:text-xs font-mono font-bold tracking-[0.06em] sm:tracking-[0.1em] text-sky-600 uppercase">
                WHY PAY ₹50,000–₹2,00,000 EVERY MONTH TO A MARKETING AGENCY?
              </span>
            </motion.div>
          </div>

          {/* Div 2: Headline Component (separate div block) */}
          <div className="w-full">
            <motion.h1
              id="hero-headline"
              style={{ scale: textScale, opacity: textOpacity }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
              className="font-display font-light text-4xl sm:text-5xl md:text-6xl tracking-tight text-black max-w-xl leading-[1.08]"
            >
              Your digital marketing <br />
              shouldn't cost you a <br />
              <span className="text-black italic font-light opacity-95">
                marketing team
              </span>
            </motion.h1>
          </div>

          {/* Div 3: Subtext Description with Separator line & Normal Tagline Text */}
          <div className="w-full border-l-2 border-sky-400/40 pl-6 py-1 flex flex-col gap-3">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-zinc-600 text-base md:text-lg leading-relaxed font-sans font-light max-w-lg"
            >
              Get your ads, content, and SEO running within 24 hours of signing up.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="text-zinc-500 font-mono text-[11px] md:text-xs uppercase tracking-[0.2em] font-bold mt-1"
            >
              No team. No agency. No confusion
            </motion.div>
          </div>

          {/* Div 4: Super Attractive Premium Orange CTA Button */}
          <div className="w-full pt-2">
            <motion.button
              id="start-free-hero-btn"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              onClick={() => {
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative inline-flex items-center gap-3.5 px-10 py-5 bg-[#FF6A00] hover:bg-[#E55F00] text-white text-xs md:text-sm font-mono font-bold tracking-[0.25em] uppercase rounded-full transition-all duration-300 shadow-xl hover:shadow-[0_20px_35px_-5px_rgba(255,106,0,0.25)] cursor-pointer hover:scale-[1.03] active:scale-95 overflow-hidden border border-orange-400/25 hover:border-orange-400/60"
            >
              {/* Laser sweeping lighting accent on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <span className="relative z-10">START FREE NOW</span>
              <ArrowRight className="w-4 h-4 text-orange-200 group-hover:translate-x-1.5 transition-transform duration-300 relative z-10 shrink-0" />
            </motion.button>
          </div>

        </div>

        {/* Right Column: 58.3% space (col-span-7) containing side-by-side Video Player Frame */}
        <div className="lg:col-span-7 w-full flex justify-center lg:justify-end">
          <motion.div
            id="hero-video-showcase"
            style={{ y: phoneY }}
            initial={{ opacity: 0, y: 50, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
            className="w-full relative origin-center"
          >
            {/* Shadow and ambient lighting around video player with skyblue/indigo glow */}
            <div className="absolute -inset-8 bg-gradient-to-tr from-sky-500/20 via-blue-600/10 to-transparent blur-3xl rounded-[40px] pointer-events-none animate-pulse duration-[8000ms]"></div>

            {/* iPad Device Frame */}
            <div className="relative w-full bg-[#18181b] p-4 pb-6 rounded-[36px] shadow-2xl border-4 border-zinc-300/65 select-none overflow-hidden">
              {/* Sleek metallic outer rim highlight */}
              <div className="absolute inset-0.5 rounded-[32px] border border-white/10 pointer-events-none" />
              
              {/* Front facing camera dot */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#0d0d0f] flex items-center justify-center pointer-events-none">
                <div className="w-1 h-1 rounded-full bg-[#1c2e4a]"></div>
              </div>

              {/* iOS Home Indicator Bar at the bottom of the device bezel */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 rounded-full bg-zinc-600/60 pointer-events-none" />

              {/* iPad Screen Area */}
              <div className="relative w-full bg-[#0d0d10] rounded-2xl aspect-[4/3] shadow-inner overflow-hidden group">
                
                {/* Real Video Component Screen */}
                <div className="absolute inset-0 z-0">
                  <video
                    ref={videoRef}
                    src="https://assets.mixkit.co/videos/preview/mixkit-digital-marketing-specialist-analyzing-data-41582-large.mp4"
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/35 mix-blend-multiply"></div>
                </div>

                {/* Interactive Simulated Video Overlay Graphics - beautifully styled and permanently active */}
                <div className="absolute inset-0 z-10 flex flex-col justify-between p-5 pointer-events-none">
                  <div className="flex items-center justify-between">
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-1.5 px-2.5 py-1 bg-black/60 backdrop-blur-xs rounded-full text-[9px] font-mono text-white tracking-widest uppercase"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                      amTOP System Active
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-1 text-[10px] font-mono text-white/95 font-bold tracking-widest"
                    >
                      <span>AGENTIC</span>
                    </motion.div>
                  </div>

                  {/* Floating graphic cards that react to the mock player */}
                  <div className="flex flex-wrap gap-4 mb-2">
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="p-3 bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-black/10 flex items-center gap-2.5 max-w-[220px]"
                    >
                      <span className="w-7 h-7 rounded-full bg-black/5 flex items-center justify-center font-display font-bold text-xs text-black">
                        aT
                      </span>
                      <div className="leading-tight text-left">
                        <p className="text-[11px] font-bold text-black font-sans">Meta Ads ROI</p>
                        <p className="text-[9px] text-zinc-500 font-sans">Campaign automated</p>
                      </div>
                      <span className="text-xs font-mono font-bold text-emerald-600 ml-auto">4.8x</span>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="p-3 bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-black/10 flex items-center gap-2.5 max-w-[200px]"
                    >
                      <div className="leading-tight text-left">
                        <p className="text-[11px] font-bold text-black font-sans">SEO Traffic</p>
                        <p className="text-[9px] text-zinc-500 font-sans">Organic authority</p>
                      </div>
                      <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-600 px-2 py-0.5 rounded-md ml-auto font-bold">
                        +32% MoM
                      </span>
                    </motion.div>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        </div>

      </div>

      {/* Infinite Marquee Brand Ecosystem Strip */}
      <div className="w-full relative z-10 select-none overflow-hidden border-t border-b border-black/[0.06] bg-zinc-50/30 py-6 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 mb-4">
          <span className="text-[10px] font-mono tracking-[0.4em] text-zinc-400 uppercase block text-center lg:text-left">
            TRUSTED BRAND ECOSYSTEM
          </span>
        </div>

        {/* Elegant Horizontal Loop Strip */}
        <div className="relative w-full overflow-hidden flex items-center">
          {/* Subtle side vignettes to blend borders */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div className="animate-marquee flex items-center gap-12 whitespace-nowrap py-1">
            {[
              { name: 'STARK CORP' },
              { name: 'BUGEE DESIGN' },
              { name: 'FARRAR PUBL.' },
              { name: 'KROMA SKIN' },
              { name: 'LUNAR FIT' },
              { name: 'BLINK STUDIO' },
            ].concat([
              { name: 'STARK CORP' },
              { name: 'BUGEE DESIGN' },
              { name: 'FARRAR PUBL.' },
              { name: 'KROMA SKIN' },
              { name: 'LUNAR FIT' },
              { name: 'BLINK STUDIO' },
            ]).map((brand, i) => (
              <div
                key={`brand-strip-${i}`}
                className="px-6 py-3 bg-white border border-black/[0.08] rounded-full shadow-sm hover:shadow-md hover:border-black/20 flex items-center gap-2.5 transition-all duration-300 cursor-pointer hover:scale-105"
              >
                {i % 2 === 0 ? (
                  <Sparkles className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                ) : (
                  <Asterisk className="w-4 h-4 text-zinc-400 shrink-0" />
                )}
                <span className="font-mono text-[9px] md:text-[11px] font-bold tracking-[0.25em] text-black/75 uppercase">
                  {brand.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
