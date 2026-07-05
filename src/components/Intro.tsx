import { motion } from 'motion/react';
import { ReactNode } from 'react';
import { servicesData } from '../data';
import { Layers, Compass, BarChart3, ArrowUpRight } from 'lucide-react';

interface IntroProps {
  onServiceSelect: (serviceId: string) => void;
}

interface RevealTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

function RevealText({ children, className = '', delay = 0 }: RevealTextProps) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.16, 1, 0.3, 1], // Premium cinematic easeOutExpo
      }}
      className={className}
    >
      {children}
    </motion.p>
  );
}

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

export default function Intro({ onServiceSelect }: IntroProps) {
  // Map icons dynamically
  const getIcon = (name: string) => {
    switch (name) {
      case 'create':
        return <Layers className="w-6 h-6 text-white" />;
      case 'engage':
        return <Compass className="w-6 h-6 text-white" />;
      case 'grow':
        return <BarChart3 className="w-6 h-6 text-white" />;
      default:
        return <Layers className="w-6 h-6 text-white" />;
    }
  };

  return (
    <motion.section
      id="about"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
      className="py-24 bg-[#0a0a0c] text-white relative overflow-hidden border-b border-white/5"
    >
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-zinc-900/40 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Core Statement Banner */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-[10px] font-mono tracking-[0.3em] text-white/40 uppercase mb-4"
          >
            WHO WE ARE
          </motion.p>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-light text-3xl md:text-4xl lg:text-5xl tracking-tight leading-tight text-white"
          >
            We're <span className="italic font-light text-zinc-300">amTOP</span> — India's premier manufacturer of high-performance, lead-free uPVC profiles for world-class windows and doors.
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[10px] font-mono tracking-[0.2em] text-white/30 uppercase mt-6"
          >
            Sustainable uPVC Architecture
          </motion.p>
        </div>

        {/* Editorial Narrative Grid with Scroll Reveal Paragraphs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 my-24 border-t border-white/5 pt-16">
          <div className="lg:col-span-4">
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-[10px] font-mono tracking-[0.3em] text-zinc-400 uppercase mb-3"
            >
              PHILOSOPHY
            </motion.p>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-light text-2xl md:text-3xl tracking-tight text-white leading-tight"
            >
              Lead-free structural innovation.
            </motion.h3>
          </div>
          
          <div className="lg:col-span-8 space-y-8">
            <RevealText className="text-zinc-400 font-sans text-base md:text-lg leading-relaxed font-light">
              We believe that the spaces we inhabit shape our lives, and the quality of our windows and doors is fundamental to that experience. As India’s forward-thinking uPVC profiles manufacturer, amTOP designs systems that bring together safety, sustainability, and absolute architectural elegance.
            </RevealText>
            
            <RevealText className="text-zinc-400 font-sans text-base md:text-lg leading-relaxed font-light">
              Our products are engineered using premium Calcium-Zinc stabilizers, making them 100% lead-free, non-toxic, and environmentally safe. With superior resistance to UV radiation and intense Indian weather conditions, amTOP profiles maintain their pristine appearance and structural integrity for decades.
            </RevealText>
            
            <RevealText className="text-zinc-400 font-sans text-base md:text-lg leading-relaxed font-light">
              By utilizing advanced multi-chamber design, co-extruded TPE gaskets, and custom-galvanized steel reinforcements, we ensure our window and door systems deliver exceptional soundproof shielding, energy savings, and ultimate storm resistance.
            </RevealText>
          </div>
        </div>

        {/* Triple Action Cards Grid */}
        <motion.div 
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
        >
          {servicesData.map((service) => (
            <motion.div
              id={`intro-card-${service.id}`}
              key={service.id}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              onClick={() => onServiceSelect(service.id)}
              className="bg-[#111114] text-white rounded-2xl p-8 border border-white/5 hover:border-white/25 hover:shadow-2xl hover:shadow-white/1 cursor-pointer flex flex-col justify-between min-h-[260px] group transition-all duration-300"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-white/10 transition-transform duration-300">
                  {getIcon(service.iconName)}
                </div>
                <h3 className="font-display font-light text-2xl tracking-wide mb-3 text-white">
                  {service.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed font-sans">
                  {service.description}
                </p>
              </div>

              <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/5">
                <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-white/40 group-hover:text-white/70 transition-colors">
                  Discover details
                </span>
                <span className="w-8 h-8 rounded-full border border-white/10 bg-white/5 text-white/60 group-hover:bg-white group-hover:text-black group-hover:border-white flex items-center justify-center transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
