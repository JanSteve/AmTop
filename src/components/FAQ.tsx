import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, HelpCircle, AlertCircle } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 70,
      damping: 15,
    },
  },
};

interface FAQItem {
  question: string;
  answer: string[];
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Open first item by default

  const toggleIndex = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const faqData: FAQItem[] = [
    {
      question: "Could You Build This Yourself?",
      answer: [
        "Absolutely. That's exactly what we did. You could spend the next two years developing frameworks, testing workflows, fixing broken automations, running failed campaigns, and rebuilding everything from scratch.",
        "You could invest lakhs experimenting until the system finally works. Nobody is stopping you. But we've already done that work. The testing. The failures. The rebuilding. The countless iterations.",
        "Everything we've learned is already built into amTop. You can spend two years creating it yourself. Or you can start using it this week."
      ]
    },
    {
      question: "Why is amTop Different?",
      answer: [
        "There are plenty of AI tools on the market, but amTop isn't just another AI tool. It's a complete marketing system. Every agent inside amTop runs on frameworks we've developed through real campaigns with real budgets and real results.",
        "These aren't prompts copied from YouTube videos. They aren't generic templates dressed up with AI. They're the exact systems we've refined through trial, error, and real world execution.",
        "When the Ads Agent creates a campaign, it's following a proven process. When the SEO Agent writes a blog, it's working from a framework. When the Content Agent creates a weekly plan, it's guided by research and strategy.",
        "That's the difference. Tools generate content. Systems generate outcomes."
      ]
    },
    {
      question: "What Happens If You Wait?",
      answer: [
        "Let Me Tell You About Margaret. Margaret was a secretary for fifteen years. She was the fastest typist in her office. Nobody could compete with her.",
        "Then one day, computers arrived. Her manager told her they would help everyone work better. Margaret didn't see the need. She was already good at her job. And honestly, she wasn't wrong. But five years later, the job had completely changed. The people who learned computers weren't just typing faster. They were editing documents instantly. Sharing files. Organizing information. Doing things a typewriter could never do.",
        "Margaret didn't lose because she wasn't talented. She lost because the world changed and she didn't adapt with it. Marketing is going through a similar shift right now. Your current approach may still work. Your ads may be performing. Your content may be getting results.",
        "But the companies building agentic marketing systems today aren't simply doing the same work faster. They're operating differently: researching audiences automatically, generating campaigns in hours instead of weeks, publishing content consistently without spending entire days creating it, and monitoring competitors around the clock.",
        "By the time this becomes standard practice, the gap between early adopters and everyone else will be much harder to close.",
        "The question isn't whether this technology will become part of marketing. The question is whether you'll adopt it early or wait until everyone else already has."
      ]
    }
  ];

  return (
    <motion.section
      id="faq"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={containerVariants}
      className="py-24 bg-white relative border-b border-black/5"
    >
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span variants={itemVariants} className="text-[10px] font-mono tracking-[0.3em] text-zinc-500 uppercase flex items-center justify-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-zinc-500" />
            FREQUENTLY ASKED QUESTIONS
          </motion.span>
          <motion.h2 variants={itemVariants} className="font-display font-light text-4xl md:text-5xl tracking-tight text-black mt-2">
            Common Inquiries
          </motion.h2>
        </div>

        {/* Accordion Container */}
        <motion.div variants={containerVariants} className="flex flex-col border-t border-black/10">
          {faqData.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                variants={itemVariants}
                id={`faq-item-${idx}`}
                key={idx}
                className="border-b border-black/10 py-6 transition-colors duration-200"
              >
                {/* Accordion Header */}
                <button
                  id={`faq-trigger-btn-${idx}`}
                  onClick={() => toggleIndex(idx)}
                  className="w-full flex items-center justify-between text-left py-2 font-display font-light text-lg sm:text-xl text-black hover:text-zinc-700 cursor-pointer group"
                >
                  <span className="pr-6 leading-tight group-hover:translate-x-1 transition-transform duration-300">
                    {item.question}
                  </span>
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ${
                    isOpen ? 'bg-black text-white' : 'bg-black/5 border border-black/10 text-zinc-700 hover:bg-black/10'
                  }`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </span>
                </button>

                {/* Accordion Content with smooth heights */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-content-${idx}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 pb-2 pr-4 md:pr-12 space-y-4 text-sm leading-relaxed text-zinc-600 font-sans font-light">
                        {item.answer.map((para, paraIdx) => (
                          <p key={paraIdx}>{para}</p>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </motion.section>
  );
}
