import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Compass, ShieldCheck, Sparkles, Award, Droplets } from 'lucide-react';
import { Fragrance } from '../types';

interface HeroProps {
  featuredFragrance: Fragrance;
  onExploreCollection: () => void;
  onDiscoverBrand: () => void;
  onSelectProduct: (fragrance: Fragrance) => void;
}

export const Hero: React.FC<HeroProps> = ({
  featuredFragrance,
  onExploreCollection,
  onDiscoverBrand,
  onSelectProduct,
}) => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 lg:pt-28 lg:pb-24 bg-[#0b0c0e]"
    >
      {/* Cinematic Ambient Gradient & Fragrance Mist Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft amber radial glow behind bottle */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[550px] lg:w-[750px] h-[350px] sm:h-[550px] lg:h-[750px] bg-[#c8a97e]/12 rounded-full blur-[120px] pointer-events-none animate-pulse" />
        
        {/* Deep vignette */}
        <div className="absolute inset-0 bg-radial from-transparent via-[#0b0c0e]/60 to-[#0b0c0e]" />

        {/* Ambient floating fragrance mist particles */}
        <motion.div
          animate={{
            y: [-15, 15, -15],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#e2cca8]/10 rounded-full blur-2xl"
        />
        <motion.div
          animate={{
            y: [15, -15, 15],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-[#9e7f53]/10 rounded-full blur-3xl"
        />

        {/* Subtle grid pattern / architectural lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_45%,#000_70%,transparent_100%)] opacity-40" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[75vh]">
          
          {/* Left Column: Brand Statement & Typography */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 text-center lg:text-left pt-6 lg:pt-0"
          >
            {/* Brand Eyebrow Tag */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#181a1d] border border-[#c8a97e]/25 mb-6 text-xs tracking-[0.25em] text-[#c8a97e] uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#c8a97e] animate-pulse" />
              <span>Haute Parfumerie • Grasse Distillates</span>
            </div>

            {/* Powerful Headline */}
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

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-5 mb-10">
              <button
                id="hero-shop-collection-btn"
                onClick={onExploreCollection}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#c8a97e] via-[#dfc8a5] to-[#c8a97e] hover:from-[#dfc8a5] hover:to-[#c8a97e] text-[#0b0c0e] font-semibold text-xs tracking-[0.25em] uppercase rounded-sm shadow-xl shadow-[#c8a97e]/15 hover:shadow-[#c8a97e]/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group"
              >
                <span>Shop Collection</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                id="hero-discover-brand-btn"
                onClick={onDiscoverBrand}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/[0.04] hover:bg-white/[0.09] border border-[#c8a97e]/30 hover:border-[#c8a97e]/60 text-[#f4efe6] font-medium text-xs tracking-[0.25em] uppercase rounded-sm transition-all duration-300 group"
              >
                <Compass className="w-4 h-4 text-[#c8a97e] transition-transform group-hover:rotate-45" />
                <span>Discover The Brand</span>
              </button>
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
                    Direct Concierge
                  </p>
                  <p className="text-[10px] text-[#888680]">Instant WhatsApp</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Floating Perfume Bottle & Glassmorphic Plinth */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex flex-col items-center justify-center"
          >
            {/* Ambient Background Aura */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-72 sm:w-96 h-72 sm:h-96 rounded-full border border-[#c8a97e]/15 animate-[spin_60s_linear_infinite]" />
              <div className="w-80 sm:w-[420px] h-80 sm:h-[420px] rounded-full border border-dashed border-[#c8a97e]/10 animate-[spin_90s_linear_infinite_reverse]" />
            </div>

            {/* Floating Bottle Card */}
            <motion.div
              animate={{
                y: [-8, 8, -8],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              onClick={() => onSelectProduct(featuredFragrance)}
              className="relative cursor-pointer group w-full max-w-sm sm:max-w-md"
            >
              {/* Luxury Frame Container */}
              <div className="relative rounded-2xl overflow-hidden p-3 bg-gradient-to-b from-[#22262a]/80 via-[#181a1d]/90 to-[#0e1012] border border-[#c8a97e]/30 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9),0_0_40px_rgba(200,169,126,0.15)] group-hover:border-[#c8a97e]/60 transition-all duration-700">
                
                {/* Badge on Bottle */}
                <div className="absolute top-6 left-6 z-20">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.2em] bg-[#0b0c0e]/80 backdrop-blur-md text-[#c8a97e] border border-[#c8a97e]/30">
                    Signature Creation
                  </span>
                </div>

                <div className="absolute top-6 right-6 z-20">
                  <span className="text-[11px] font-mono tracking-widest text-[#e6d3b4]/90 bg-[#0b0c0e]/70 px-2.5 py-1 rounded backdrop-blur-md border border-white/5">
                    ₹2,499
                  </span>
                </div>

                {/* High Quality Perfume Bottle Image */}
                <div className="relative h-[380px] sm:h-[440px] rounded-xl overflow-hidden bg-[#101214]">
                  <img
                    src={featuredFragrance.image}
                    alt={featuredFragrance.name}
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-1000 ease-out"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0e] via-transparent to-transparent opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#0b0c0e]/40 via-transparent to-[#0b0c0e]/80" />
                </div>

                {/* Bottom Overlay Label */}
                <div className="p-5 text-center bg-[#0b0c0e]/80 backdrop-blur-md rounded-xl mt-2 border border-white/5">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-[#c8a97e] font-light mb-1">
                    {featuredFragrance.category}
                  </p>
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
    </section>
  );
};
