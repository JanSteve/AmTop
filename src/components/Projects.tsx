import { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles, X, Info, Shield, Zap, TrendingUp, Search, Eye, AlertCircle, Check } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 50,
      damping: 14,
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 50,
      damping: 14,
    },
  },
};

interface FeatureItem {
  id: string;
  title: string;
  subtitle: string;
  description: string[];
  imageSrc: string;
  tag: string;
  ctaText: string;
  details: string[];
  icon: ReactNode;
}

export default function Projects() {
  const [notification, setNotification] = useState<string | null>(null);

  const features: FeatureItem[] = [
    {
      id: 'mission-control',
      title: 'Mission Control — Analytics Dashboard',
      subtitle: 'Worth ₹5,000/month',
      tag: 'Analytics Control Center',
      ctaText: 'CONNECT CHANNELS NOW',
      icon: <Eye className="w-5 h-5 text-indigo-400" />,
      details: [
        'Syncs Google Analytics 4 & Search Console',
        'Direct LinkedIn & Meta Ads API pipelines',
        'Zero-configuration setup in under 5 mins',
        'Unified automated reports generator'
      ],
      imageSrc: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop',
      description: [
        "Before you run ads or publish content, you need to know what's working and what isn't.",
        "Mission Control brings together data from Google Analytics 4, LinkedIn, Meta Ads, and Google Search Console into one dashboard.",
        "No jumping between platforms. No late-night spreadsheet updates. No manually collecting reports every week. Everything is connected, organised, and ready from day one so you can focus on making decisions instead of gathering data."
      ]
    },
    {
      id: 'ads-agent',
      title: 'The Ads Agent',
      subtitle: 'Worth ₹5,000/month',
      tag: 'Performance Marketing AI',
      ctaText: 'LAUNCH INTELLIGENT CAMPAIGN',
      icon: <Zap className="w-5 h-5 text-amber-400" />,
      details: [
        'Automated competitor angle analysis',
        'High-converting, non-robotic copy generation',
        'Dynamic audience pain point mapping (Reddit/Quora)',
        'Direct ad campaign builder integrations'
      ],
      imageSrc: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop',
      description: [
        "Most AI ad tools start writing immediately. Our Ads Agent starts by researching.",
        "It studies your competitors, identifies the angles they're using, understands what's performing well, and finds opportunities they're missing.",
        "Only then does it build your campaigns. The result isn't generic AI copy. It's ad creative and messaging built using real market intelligence—the same approach an experienced performance marketer would take."
      ]
    },
    {
      id: 'seo-agent',
      title: 'The SEO Agent',
      subtitle: 'Worth ₹5,000/month',
      tag: 'Organic Growth Authority',
      ctaText: 'BOOST ORGANIC POSITIONING',
      icon: <Search className="w-5 h-5 text-emerald-400" />,
      details: [
        'Strict adherence to Google EEAT standards',
        'Long-term organic authority assets',
        'Optimized for traditional & AI search engines',
        'Deep semantic entity and link-graph mapping'
      ],
      imageSrc: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=600&auto=format&fit=crop',
      description: [
        "The SEO Agent creates content the way modern search engines expect it to be written.",
        "It performs deep research, follows EEAT principles, and structures content for both traditional search and AI-powered search experiences.",
        "These aren't keyword-stuffed blog posts. They're long-term assets designed to bring consistent traffic and build authority over time."
      ]
    },
    {
      id: 'content-agent',
      title: 'The Content Agent',
      subtitle: 'Worth ₹5,000/month',
      tag: 'Social Attention Strategy',
      ctaText: 'BUILD 7-DAY CONTENT MAP',
      icon: <TrendingUp className="w-5 h-5 text-rose-400" />,
      details: [
        'Continuous competitor post tracking',
        'Industry attention pattern modeling',
        'Automated weekly scheduling ready',
        'High-engagement dialogue hooks'
      ],
      imageSrc: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=600&auto=format&fit=crop',
      description: [
        "Before creating content, the agent studies your industry.",
        "It looks at what competitors are posting, what audiences are engaging with, and what content is being ignored.",
        "Then it creates a full week of social media content tailored to your business. Not content for the sake of posting. Content designed to attract attention, start conversations, and move people closer to becoming customers."
      ]
    },
    {
      id: 'competitive-engine',
      title: 'The Competitive Intelligence Engine',
      subtitle: 'Worth ₹5,000/month',
      tag: 'Market Watch Autopilot',
      ctaText: 'DEPLOY 24/7 COMPETITOR ALERTS',
      icon: <Shield className="w-5 h-5 text-blue-400" />,
      details: [
        'Continuous multi-channel tracking',
        'Instant notifications of competitor offer changes',
        'New messaging and campaign alerts',
        'Proactive response and defense strategy suggestions'
      ],
      imageSrc: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=600&auto=format&fit=crop',
      description: [
        "This system works quietly in the background 24 hours a day.",
        "It continuously monitors your competitors across multiple channels.",
        "When they launch a new campaign, introduce a new offer, or change their messaging, you'll know about it. Instead of reacting after the market moves, you get the chance to act first."
      ]
    }
  ];

  return (
    <section id="projects" className="py-24 bg-[#FFFFFF] relative border-b border-black/5 overflow-hidden">
      {/* Glow detailing */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-zinc-200/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-20 border-b border-black/5 pb-10 max-w-4xl mx-auto gap-4">
          <span className="text-[10px] font-mono tracking-[0.3em] text-zinc-500 uppercase block">
            INSIDE AMTOP
          </span>
          <h2 className="font-display font-light text-4xl md:text-5xl lg:text-6xl tracking-tight text-black mt-2">
            Here's Everything You Get
          </h2>
          <div className="text-zinc-600 max-w-2xl text-sm font-mono tracking-wide leading-relaxed">
            I want to show you exactly what's inside amTop. Not to impress you with a long feature list, but because I want you to understand what it actually takes to build this yourself.
          </div>
        </div>

        {/* Custom Toast Notification */}
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8 p-4 bg-zinc-50 border border-black/10 rounded-xl flex items-center justify-between text-xs text-zinc-700 backdrop-blur-md"
            >
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-zinc-600" />
                <span>{notification}</span>
              </div>
              <button onClick={() => setNotification(null)} className="p-1 text-black/40 hover:text-black transition-colors">
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Feature List - Strictly Image on RIGHT, Content and CTA on LEFT */}
        <div className="flex flex-col gap-28 md:gap-36 mb-32">
          {features.map((feature) => {
            return (
              <motion.div
                id={`feature-item-${feature.id}`}
                key={feature.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={containerVariants}
                className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center"
              >
                {/* Left Column: Content and CTA */}
                <motion.div
                  variants={textVariants}
                  className="w-full lg:w-2/5 flex flex-col justify-center order-2 lg:order-1"
                >
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-widest text-zinc-500 uppercase mb-3">
                    {feature.icon}
                    {feature.tag}
                  </div>
                  
                  <h3 className="font-display font-light text-2xl md:text-3xl lg:text-4xl tracking-wide text-black leading-tight mb-3">
                    {feature.title}
                  </h3>
                  
                  <p className="text-xs font-mono tracking-wider text-emerald-600 uppercase font-semibold mb-6 flex items-center gap-1">
                    <Check className="w-4 h-4" /> {feature.subtitle}
                  </p>
                  
                  <div className="space-y-4 mb-6">
                    {feature.description.map((p, pIdx) => (
                      <p key={pIdx} className="text-sm leading-relaxed text-zinc-600 font-sans font-light">
                        {p}
                      </p>
                    ))}
                  </div>

                  {/* Bullet Spec Highlights */}
                  <div className="mb-8 border-t border-black/5 pt-4">
                    <h4 className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase font-bold mb-3">TECHNOLOGY HIGHLIGHTS</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-zinc-600 font-sans font-light">
                      {feature.details.map((detail, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-1.5">
                          <span className="text-emerald-500 mt-0.5">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <button
                      id={`feature-action-btn-${feature.id}`}
                      onClick={() => {
                        const el = document.getElementById('contact');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="inline-flex items-center gap-3 px-6 py-3 bg-black hover:bg-zinc-800 text-white text-xs font-mono font-bold tracking-widest uppercase rounded-full border border-transparent transition-all duration-300 cursor-pointer shadow-lg"
                    >
                      {feature.ctaText}
                      <ArrowRight className="w-3.5 h-3.5 text-white" />
                    </button>
                  </div>
                </motion.div>

                {/* Right Column: Device Frame Mockup */}
                <motion.div
                  variants={imageVariants}
                  className="w-full lg:w-3/5 order-1 lg:order-2"
                >
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[16/10] group border border-black/5 bg-zinc-100">
                    {/* Hover Image Zoom */}
                    <img
                      src={feature.imageSrc}
                      alt={feature.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transform scale-100 group-hover:scale-102 transition-transform duration-1000 ease-out brightness-95"
                    />
                    
                    {/* Dark gradient gloss overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                    
                    {/* Floating Branding Tag inside the image */}
                    <div className="absolute bottom-6 left-6 px-4 py-3 bg-white/95 backdrop-blur-md rounded-2xl border border-black/10 text-black flex items-center gap-2 shadow-lg">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span className="text-[10px] font-mono font-semibold tracking-wider uppercase text-zinc-700">
                        {feature.tag}
                      </span>
                    </div>

                    <div className="absolute top-6 right-6 px-3 py-1 bg-white/85 backdrop-blur-md border border-black/10 rounded-full text-[9px] font-mono text-zinc-700 tracking-wider">
                      amTOP Suite
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
