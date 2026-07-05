import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles, X, Info, ChevronRight, MessageSquare, Flame } from 'lucide-react';

const storyContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const storyImageVariants = {
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

const storyTextVariants = {
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

interface StoryChapter {
  id: string;
  chapterNum: string;
  title: string;
  subtitle: string;
  description: string[];
  imageSrc: string;
  tag: string;
  ctaText: string;
  stats?: { value: string; label: string };
}

export default function Story() {
  const [notification, setNotification] = useState<string | null>(null);

  const storyChapters: StoryChapter[] = [
    {
      id: 'chapter-1',
      chapterNum: 'CHAPTER 01',
      title: 'How It All Started',
      subtitle: 'It Started With a Spreadsheet Nobody Wanted to Manage',
      tag: 'The Spark',
      ctaText: 'SEE THE AUTOPILOT SYSTEM',
      stats: { value: '1 Spreadsheet', label: 'Started it all' },
      imageSrc: 'https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8?q=80&w=600&auto=format&fit=crop',
      description: [
        "A year ago, Yu-kai's team and I were sitting in front of our laptops, surrounded by tabs — Google Analytics, Meta Ads Manager, Google Search Console, PageSpeed Insights.",
        "Every week, we had to collect data from all these tools and update one huge spreadsheet by hand. Nobody told us to do it. But we knew that without the numbers, we couldn't make smart decisions.",
        "So every week, we repeated the same process: Copy the data. Paste the data. Format the data. Try to understand what it meant.",
        "One evening, while staring at that spreadsheet, I thought: \"There has to be a better way.\"",
        "So I started automating the process. And it worked. The spreadsheet updated itself, and suddenly we had hours of our time back.",
        "Then another question came to my mind: \"If I can automate reporting, can I automate Meta Ads? Can I automate content creation? Can I automate SEO?\"",
        "That simple question became the starting point of amTop."
      ]
    },
    {
      id: 'chapter-2',
      chapterNum: 'CHAPTER 02',
      title: 'The Problem',
      subtitle: "I Spent Months Looking for a Tool That Didn't Exist",
      tag: 'Disappointment',
      ctaText: 'EXPERIENCE AGENTIC INTELLIGENCE',
      stats: { value: '100% Robot', label: 'Generic AI outputs' },
      imageSrc: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=600&auto=format&fit=crop',
      description: [
        "I tried almost every AI marketing tool I could find. Most tools were simply creating low-quality content. Then I tried AI tools for Meta Ads. The results were disappointing.",
        "The ad copy felt robotic. The creatives looked weak. Most of them were things I wouldn't click on myself. Social media content wasn't any better. Post after post with little engagement and no real value.",
        "Every tool promised amazing results. Most of them delivered disappointment. After months of trying different products, I started wondering if what I wanted was even possible."
      ]
    },
    {
      id: 'chapter-3',
      chapterNum: 'CHAPTER 03',
      title: 'The Realization',
      subtitle: 'Then Something Finally Clicked',
      tag: 'The Catalyst',
      ctaText: 'VIEW THE SYSTEM FRAMEWORK',
      stats: { value: '₹10.5L+', label: 'Generated in 1 week' },
      imageSrc: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop',
      description: [
        "Just when I was about to give up, I noticed something interesting. The best marketers around me weren't complaining about AI. They were quietly using it every day and getting real results.",
        "In fact, our own team had generated $11,000 in revenue using AI-powered campaigns. So the question wasn't whether AI worked. It clearly did.",
        "The real question was: Why were all these tools failing?",
        "Then I looked at it differently. Imagine two chefs using the exact same ingredients. One follows a proven recipe. The other just throws everything into a pan and hopes for the best. The ingredients are the same. The results are completely different.",
        "That was exactly what was happening with AI marketing tools. They were skipping the important steps and jumping straight into creating campaigns.",
        "But real marketing doesn't work like that. A good marketer always follows three steps: 1. Understand the audience. 2. Study the competition. 3. Build the campaign.",
        "Most tools were starting directly at step three. No wonder the results were poor. The problem wasn't AI. The problem was the process."
      ]
    },
    {
      id: 'chapter-4',
      chapterNum: 'CHAPTER 04',
      title: 'Building the Solution',
      subtitle: 'We Decided to Build It Ourselves',
      tag: 'Hard Work',
      ctaText: 'MEET OUR TEAM OF AGENTS',
      stats: { value: '24/7', label: 'Continuous research' },
      imageSrc: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop',
      description: [
        "Creating a system that could follow a real marketing framework wasn't easy. Sometimes the AI ignored instructions. Sometimes it produced things we never asked for.",
        "Many days, I honestly wasn't sure if it would work. But we kept improving it, We kept testing, We kept refining. And then something changed.",
        "The generic content disappeared, The weak ads disappeared.",
        "Instead, the AI agents started acting like real marketing strategists. They researched conversations on Reddit to find real customer pain points. They analyzed competitor websites. They studied successful ads and landing pages. They gathered insights before creating anything.",
        "For the first time, the output actually felt useful. I stopped spending my day doing repetitive marketing tasks. Instead, I became the strategist guiding the process.",
        "The $11,000 we generated wasn't because AI is magical. It happened because we finally gave AI the right system to follow.",
        "And honestly, most AI-generated content online isn't bad because AI is bad. It's bad because people expect great results from poor instructions. Even the best technology needs a good framework."
      ]
    },
    {
      id: 'chapter-5',
      chapterNum: 'CHAPTER 05',
      title: 'What We Built',
      subtitle: 'The process is simple: Audience Research ➔ Competitor Research ➔ Campaign Creation',
      tag: 'The Outcome',
      ctaText: 'EXPLORE THE SYSTEMS TODAY',
      stats: { value: '0 Confusion', label: 'Just results' },
      imageSrc: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop',
      description: [
        "That's it. Simple doesn't mean easy. But it works.",
        "We used this framework ourselves and saw real results. Then we spent months turning everything we learned into one platform.",
        "That's how amTop was born. Not another AI tool that generates random content. A complete marketing system built around proven frameworks and real-world results."
      ]
    }
  ];

  return (
    <section id="story" className="py-24 bg-white relative border-b border-black/5 overflow-hidden">
      {/* Decorative ambient glowing lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-black/5 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-20 border-b border-black/5 pb-10 max-w-4xl mx-auto gap-4">
          <span className="text-[10px] font-mono tracking-[0.3em] text-zinc-500 uppercase block">
            OUR JOURNEY
          </span>
          <h2 className="font-display font-light text-4xl md:text-5xl lg:text-6xl tracking-tight text-black mt-2">
            How It All Started
          </h2>
          <div className="text-zinc-600 max-w-2xl text-sm font-mono tracking-wide leading-relaxed">
            Discover the philosophy and the relentless iterations that transformed a broken marketing process into a high-performance automation ecosystem.
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

        {/* Story List - Alternating layouts for Chapters 1-5 */}
        <div className="flex flex-col gap-28 md:gap-36">
          {storyChapters.map((chapter, idx) => {
            const isImageRight = idx % 2 === 0; // Chapter 1 (0), 3 (2), 5 (4) are image-right
            return (
              <motion.div
                id={`story-${chapter.id}`}
                key={chapter.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
                variants={storyContainerVariants}
                className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center"
              >
                {/* Text Column */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: isImageRight ? -50 : 50 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: {
                        type: 'spring',
                        stiffness: 50,
                        damping: 14,
                      },
                    },
                  }}
                  className={`w-full lg:w-2/5 flex flex-col justify-center order-2 ${
                    isImageRight ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-mono tracking-widest text-zinc-500 uppercase mb-3">
                    <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
                    {chapter.chapterNum} • {chapter.tag}
                  </div>
                  
                  <h3 className="font-display font-light text-2xl md:text-3xl lg:text-4xl tracking-wide text-black leading-tight mb-3">
                    {chapter.title}
                  </h3>
                  
                  <p className="text-xs font-mono tracking-wider text-zinc-600 uppercase font-semibold mb-6">
                    {chapter.subtitle}
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    {chapter.description.map((p, pIdx) => (
                      <p key={pIdx} className="text-sm leading-relaxed text-zinc-600 font-sans font-light">
                        {p}
                      </p>
                    ))}
                  </div>

                  <div>
                    <button
                      id={`story-chapter-btn-${chapter.id}`}
                      onClick={() => {
                        const el = document.getElementById('contact');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="inline-flex items-center gap-3 px-6 py-3 bg-black hover:bg-zinc-800 text-white text-xs font-mono font-bold tracking-widest uppercase rounded-full border border-transparent transition-all duration-300 cursor-pointer shadow-lg"
                    >
                      {chapter.ctaText}
                      <ChevronRight className="w-3.5 h-3.5 text-white group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>

                {/* Image Column */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: isImageRight ? 50 : -50 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: {
                        type: 'spring',
                        stiffness: 50,
                        damping: 14,
                      },
                    },
                  }}
                  className={`w-full lg:w-3/5 order-1 ${
                    isImageRight ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[16/10] group border border-black/5 bg-zinc-100">
                    {/* Hover Image Zoom */}
                    <img
                      src={chapter.imageSrc}
                      alt={chapter.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transform scale-100 group-hover:scale-102 transition-transform duration-1000 ease-out"
                    />
                    
                    {/* Dark gradient gloss overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                    
                    {/* Floating Branding Tag inside the image */}
                    {chapter.stats && (
                      <div className="absolute bottom-6 left-6 px-4 py-3 bg-white/95 backdrop-blur-md rounded-2xl border border-black/10 text-black flex items-center gap-3 shadow-lg">
                        <div className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center">
                          <Flame className="w-4 h-4 text-orange-500" />
                        </div>
                        <div className="leading-tight">
                          <p className="text-xs font-mono font-bold text-black tracking-wide">{chapter.stats.value}</p>
                          <p className="text-[10px] text-zinc-500 font-sans">{chapter.stats.label}</p>
                        </div>
                      </div>
                    )}

                    <div className="absolute top-6 right-6 px-3 py-1 bg-white/85 backdrop-blur-md border border-black/10 rounded-full text-[9px] font-mono text-zinc-700 tracking-wider">
                      amTOP Framework
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
