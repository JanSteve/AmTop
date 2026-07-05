import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { blogPostsData } from '../data';
import { ArrowRight, BookOpen, Clock, X, Info } from 'lucide-react';

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

export default function Blog() {
  const [notification, setNotification] = useState<string | null>(null);

  return (
    <motion.section
      id="blog"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={containerVariants}
      className="py-24 bg-[#050505] border-t border-white/5 relative"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-row items-end justify-between mb-16 pb-6 border-b border-white/5">
          <motion.div variants={itemVariants}>
            <span className="text-[10px] font-mono tracking-[0.3em] text-white/40 uppercase">
              CREATIVE DISPATCH
            </span>
            <h2 className="font-display font-light text-4xl md:text-5xl tracking-tight text-white mt-2">
              Daily updates from our team.
            </h2>
          </motion.div>
          <motion.button
            variants={itemVariants}
            id="view-all-blog-btn"
            onClick={() => {
              setNotification("Entering amTop Editorial Library. Real-time dispatches sync directly with our CDN feed!");
            }}
            className="text-[10px] font-mono font-bold text-white/50 hover:text-white tracking-widest uppercase flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            VIEW ALL DISPATCHES
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Custom Toast Notification */}
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8 p-4 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between text-xs text-zinc-300 backdrop-blur-md"
            >
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-indigo-300" />
                <span>{notification}</span>
              </div>
              <button onClick={() => setNotification(null)} className="p-1 text-white/40 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Blog Post Cards Grid */}
        <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPostsData.map((post) => (
            <motion.article
              variants={itemVariants}
              id={`blog-card-${post.id}`}
              key={post.id}
              data-cursor="read"
              whileHover={{ y: -8 }}
              className="bg-[#111114] rounded-2xl overflow-hidden border border-white/5 shadow-xs hover:border-white/15 hover:shadow-2xl hover:shadow-white/1 transition-all duration-300 flex flex-col h-full cursor-pointer group"
              onClick={() => {
                setNotification(`Opening full article: "${post.title}" inside our custom typographic reader mode.`);
              }}
            >
              {/* Image Banner */}
              <div className="relative aspect-16/10 overflow-hidden bg-stone-900">
                <img
                  src={post.imageSrc}
                  alt={post.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Floating Category Pill */}
                <div className="absolute top-4 left-4 px-2.5 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-md text-[9px] font-mono font-bold text-white uppercase tracking-wider">
                  {post.category}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex items-center gap-4 text-[10px] font-mono text-white/40 mb-3 font-semibold uppercase tracking-wider">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-indigo-300" />
                      {post.readTime}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/20"></span>
                    <span>{post.date}</span>
                  </div>

                  <h3 className="font-display font-light text-xl tracking-wide text-white group-hover:text-indigo-200 transition-colors duration-200 line-clamp-2 leading-snug">
                    {post.title}
                  </h3>
                </div>

                {/* Footer Arrow trigger */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-white/40 group-hover:text-white/70 transition-colors">
                    Read article
                  </span>
                  <span className="w-8 h-8 rounded-full border border-white/10 bg-white/5 text-white/60 group-hover:bg-white group-hover:text-black group-hover:border-white flex items-center justify-center transition-all duration-300">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

      </div>
    </motion.section>
  );
}
