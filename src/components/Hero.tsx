import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';
import { ArrowRight, Compass, ShieldCheck, Sparkles, Award, Droplets, Wind } from 'lucide-react';
import { Fragrance } from '../types';

interface HeroProps {
  featuredFragrance: Fragrance;
  onExploreCollection: () => void;
  onDiscoverBrand: () => void;
  onSelectProduct: (fragrance: Fragrance) => void;
}

interface MistParticle {
  id: number;
  x: number;
  y: number;
  note: string;
  size: number;
}

export const Hero: React.FC<HeroProps> = ({
  featuredFragrance,
  onExploreCollection,
  onDiscoverBrand,
  onSelectProduct,
}) => {
  const [isSpraying, setIsSpraying] = useState(false);
  const [mistParticles, setMistParticles] = useState<MistParticle[]>([]);
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse tilt animation for the perfume flacon
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseFromCenterX = (e.clientX - rect.left) / width - 0.5;
    const mouseFromCenterY = (e.clientY - rect.top) / height - 0.5;
    mouseX.set(mouseFromCenterX);
    mouseY.set(mouseFromCenterY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Trigger interactive fragrance mist spray
  const triggerMistSpray = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSpraying) return;
    setIsSpraying(true);

    const notes = [
      'Calabrian Bergamot',
      'Crushed Black Pepper',
      'French Lavender',
      'Indonesian Oud',
      'Smoked Amber',
      'Velvet Tonka',
    ];

    const particles: MistParticle[] = notes.map((note, idx) => ({
      id: Date.now() + idx,
      x: (Math.random() - 0.5) * 220,
      y: -60 - Math.random() * 120,
      note,
      size: 40 + Math.random() * 40,
    }));

    setMistParticles(particles);

    setTimeout(() => {
      setIsSpraying(false);
    }, 2800);
  };

  // Marquee items
  const marqueeItems = [
    'EXTRAIT DE PARFUM (28% CONCENTRATION)',
    '6-WEEK SLOW MACERATION IN GRASSE',
    'WILD CAMBODIAN AGARWOOD (OUD)',
    'DIRECT WHATSAPP ORDERS: +91 80806 95405',
    'COMPLIMENTARY 2ML TESTER VIAL INCLUDED',
    'HAND-POURED IN REFINED SMOKED GLASS',
    'INSURED WHITE-GLOVE DELIVERY ACROSS INDIA',
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-between overflow-hidden pt-24 pb-0 lg:pt-28 bg-[#0b0c0e]"
    >
      {/* Ambient Cinematic Gradient & Mist Canvas */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft amber radial glow behind bottle */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.12, 0.22, 0.12],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[550px] lg:w-[800px] h-[350px] sm:h-[550px] lg:h-[800px] bg-[#c8a97e]/15 rounded-full blur-[130px] pointer-events-none"
        />

        {/* Deep vignette */}
        <div className="absolute inset-0 bg-radial from-transparent via-[#0b0c0e]/60 to-[#0b0c0e]" />

        {/* Ambient floating fragrance mist particles */}
        <motion.div
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/4 left-1/4 w-36 h-36 bg-[#e2cca8]/10 rounded-full blur-2xl"
        />
        <motion.div
          animate={{
            y: [20, -20, 20],
            x: [10, -10, 10],
            opacity: [0.15, 0.4, 0.15],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-1/3 right-1/4 w-52 h-52 bg-[#9e7f53]/10 rounded-full blur-3xl"
        />

        {/* Subtle grid pattern / architectural lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_45%,#000_70%,transparent_100%)] opacity-40" />
      </div>

      {/* Main Grid Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 flex-1 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full py-12 lg:py-16">
          
          {/* Left Column: Brand Statement & Typography */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 text-center lg:text-left pt-4 lg:pt-0"
          >
            {/* Brand Eyebrow Tag */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#181a1d] border border-[#c8a97e]/25 mb-6 text-xs tracking-[0.25em] text-[#c8a97e] uppercase"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#c8a97e] animate-pulse" />
              <span>Haute Parfumerie • Grasse Distillates</span>
            </motion.div>

            {/* Powerful Headline with Motion Reveal */}
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-[0.04em] text-[#f4efe6] leading-[1.08] mb-6">
              A Fragrance <br />
              <span className="font-editorial italic font-normal text-[#e6d3b4]">
                That Becomes
              </span>{' '}
              <br />
              <span className="gold-gradient-text font-medium">Your Signature.</span>
            </h1>

            {/* Short Luxury Brand Description */}
            <p className="text-sm sm:text-base md:text-lg text-[#9e9b94] font-light max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8 tracking-wide font-sans">
              Hand-poured at high extrait concentrations using rare botanical extracts,
              aged woods, and sensual resins. <span className="text-[#f4efe6] font-medium">Corridor seven</span> creates
              indelible olfactory silhouettes designed to evolve uniquely with your skin’s chemistry.
            </p>

            {/* CTAs with Interactive Spring Physics */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-5 mb-10">
              <motion.button
                id="hero-shop-collection-btn"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={onExploreCollection}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#c8a97e] via-[#dfc8a5] to-[#c8a97e] hover:from-[#dfc8a5] hover:to-[#c8a97e] text-[#0b0c0e] font-semibold text-xs tracking-[0.25em] uppercase rounded-sm shadow-xl shadow-[#c8a97e]/20 hover:shadow-[#c8a97e]/40 transition-all duration-300 group"
              >
                <span>Shop Collection</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </motion.button>

              <motion.button
                id="hero-discover-brand-btn"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={onDiscoverBrand}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/[0.04] hover:bg-white/[0.09] border border-[#c8a97e]/30 hover:border-[#c8a97e]/60 text-[#f4efe6] font-medium text-xs tracking-[0.25em] uppercase rounded-sm transition-all duration-300 group"
              >
                <Compass className="w-4 h-4 text-[#c8a97e] transition-transform group-hover:rotate-45" />
                <span>Discover The Brand</span>
              </motion.button>
            </div>

            {/* Trust & Luxury Assurance Badges */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-left">
              <div className="flex items-start gap-2.5">
                <div className="p-1.5 rounded bg-white/[0.04] text-[#c8a97e] mt-0.5">
                  <Droplets className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold tracking-wider text-[#f4efe6] uppercase">
                    28% Extrait
                  </p>
                  <p className="text-[10px] text-[#888680]">8–14hr Sillage</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-1.5 rounded bg-white/[0.04] text-[#c8a97e] mt-0.5">
                  <Award className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold tracking-wider text-[#f4efe6] uppercase">
                    Artisanal
                  </p>
                  <p className="text-[10px] text-[#888680]">Grasse Distillates</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="p-1.5 rounded bg-white/[0.04] text-[#c8a97e] mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold tracking-wider text-[#f4efe6] uppercase">
                    WhatsApp Concierge
                  </p>
                  <p className="text-[10px] text-[#888680]">+91 80806 95405</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 3D Tilt Perfume Flacon & Scent Mist Interaction */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex flex-col items-center justify-center"
            style={{ perspective: 1000 }}
          >
            {/* Ambient Background Rotating Gold Ring Astrolabe */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-72 sm:w-96 h-72 sm:h-96 rounded-full border border-[#c8a97e]/20 animate-[spin_50s_linear_infinite]" />
              <div className="w-80 sm:w-[420px] h-80 sm:h-[420px] rounded-full border border-dashed border-[#c8a97e]/15 animate-[spin_80s_linear_infinite_reverse]" />
            </div>

            {/* 3D Interactive Card with Motion Spring Tilt */}
            <motion.div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
              }}
              onClick={() => onSelectProduct(featuredFragrance)}
              className="relative cursor-pointer group w-full max-w-sm sm:max-w-md transition-shadow duration-300"
            >
              {/* Luxury Frame Container with Dynamic Metallic Sheen */}
              <div className="relative rounded-2xl overflow-hidden p-3 bg-gradient-to-b from-[#22262a]/85 via-[#181a1d]/90 to-[#0e1012] border border-[#c8a97e]/30 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_45px_rgba(200,169,126,0.18)] group-hover:border-[#c8a97e]/70 transition-all duration-500">
                
                {/* Badge on Bottle */}
                <div className="absolute top-6 left-6 z-20">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.2em] bg-[#0b0c0e]/85 backdrop-blur-md text-[#c8a97e] border border-[#c8a97e]/30">
                    Signature Creation
                  </span>
                </div>

                <div className="absolute top-6 right-6 z-20">
                  <span className="text-[11px] font-mono tracking-widest text-[#e6d3b4]/90 bg-[#0b0c0e]/80 px-2.5 py-1 rounded backdrop-blur-md border border-white/10">
                    ₹2,499
                  </span>
                </div>

                {/* High Quality Perfume Bottle Image Stage */}
                <div className="relative h-[380px] sm:h-[440px] rounded-xl overflow-hidden bg-[#101214]">
                  <img
                    src={featuredFragrance.image}
                    alt={featuredFragrance.name}
                    className="w-full h-full object-cover object-center transform group-hover:scale-106 transition-transform duration-1000 ease-out"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0e] via-transparent to-transparent opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#0b0c0e]/40 via-transparent to-[#0b0c0e]/80" />

                  {/* Scent Mist Spray Overlay Animation */}
                  <AnimatePresence>
                    {isSpraying && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
                      >
                        {/* Golden Mist Cloud */}
                        <motion.div
                          initial={{ scale: 0.2, opacity: 0 }}
                          animate={{ scale: 2.2, opacity: [0, 0.7, 0] }}
                          transition={{ duration: 2.2, ease: 'easeOut' }}
                          className="w-64 h-64 rounded-full bg-gradient-to-tr from-[#c8a97e]/40 via-[#f4efe6]/30 to-transparent blur-3xl"
                        />

                        {/* Floating Fragrance Note Pills wafting out */}
                        {mistParticles.map((p) => (
                          <motion.div
                            key={p.id}
                            initial={{ opacity: 0, scale: 0.5, x: 0, y: 0 }}
                            animate={{
                              opacity: [0, 1, 0],
                              scale: [0.8, 1.1, 0.9],
                              x: p.x,
                              y: p.y,
                            }}
                            transition={{ duration: 2.4, ease: 'easeOut' }}
                            className="absolute px-3 py-1 rounded-full bg-[#0b0c0e]/90 border border-[#c8a97e] text-[10px] tracking-wider uppercase text-[#f4efe6] shadow-lg backdrop-blur-md whitespace-nowrap"
                          >
                            ✨ {p.note}
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Bottom Overlay Label */}
                <div className="p-5 text-center bg-[#0b0c0e]/85 backdrop-blur-md rounded-xl mt-2 border border-white/5 relative z-10">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-[10px] tracking-[0.3em] uppercase text-[#c8a97e] font-light">
                      {featuredFragrance.category}
                    </p>
                    
                    {/* Interactive "Disperse Scent Mist" trigger */}
                    <button
                      type="button"
                      onClick={triggerMistSpray}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#c8a97e]/15 hover:bg-[#c8a97e]/30 border border-[#c8a97e]/30 text-[10px] tracking-wider uppercase text-[#c8a97e] hover:text-[#f4efe6] transition-colors"
                      title="Disperse interactive fragrance mist"
                    >
                      <Wind className="w-3 h-3" />
                      <span>{isSpraying ? 'Diffusing...' : 'Spray Scent'}</span>
                    </button>
                  </div>

                  <h3 className="font-heading text-xl sm:text-2xl font-medium tracking-[0.1em] text-[#f4efe6] group-hover:text-[#c8a97e] transition-colors">
                    {featuredFragrance.name}
                  </h3>
                  <p className="text-xs text-[#9e9b94] font-light mt-1 mb-3">
                    Top notes: {featuredFragrance.topNotes.slice(0, 2).join(' • ')}
                  </p>

                  <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-[#c8a97e] group-hover:text-[#e6d3b4] uppercase transition-colors">
                    <span>Explore Fragrance Notes & Details</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Infinite Luxury Motion Graphics Marquee Banner */}
      <div className="relative w-full border-y border-[#c8a97e]/20 bg-[#0e1012] py-3.5 overflow-hidden z-20">
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#0b0c0e] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#0b0c0e] to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex whitespace-nowrap gap-8"
          animate={{ x: [0, -1200] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: 'loop',
              duration: 32,
              ease: 'linear',
            },
          }}
        >
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, idx) => (
            <div key={idx} className="flex items-center gap-6 flex-shrink-0">
              <span className="text-[11px] tracking-[0.3em] uppercase text-[#e5e1d8]/80 font-medium font-mono">
                {item}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#c8a97e]" />
            </div>
          ))}
        </motion.div>
      </div>

    </section>
  );
};
