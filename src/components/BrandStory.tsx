import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Clock, Compass, Feather, Droplets, CheckCircle2 } from 'lucide-react';
import { generateConsultationWhatsAppUrl } from '../utils/whatsapp';

export const BrandStory: React.FC = () => {
  const [activeStage, setActiveStage] = useState<'top' | 'heart' | 'base'>('heart');

  return (
    <section id="story" className="py-28 bg-[#0b0c0e] relative overflow-hidden border-t border-white/5">
      {/* Ambient background light */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#c8a97e]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#8c724f]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Masthead */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-[11px] tracking-[0.3em] uppercase text-[#c8a97e] font-medium block mb-3">
            The Philosophy of Corridor seven
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-light tracking-[0.04em] text-[#f4efe6] mb-6">
            More Than a Fragrance.
          </h2>
          <p className="font-editorial italic text-lg sm:text-xl text-[#e6d3b4] font-normal leading-relaxed">
            "A perfume is not an accessory. It is the invisible architecture of your presence."
          </p>
        </div>

        {/* Editorial 2-Column Story Spread */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          
          {/* Left: Atmospheric Editorial Photography */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-[#c8a97e]/25 shadow-2xl bg-[#141618]">
              <img
                src="https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=1200&auto=format&fit=crop"
                alt="Corridor seven slow maceration laboratory"
                className="w-full h-[450px] sm:h-[520px] object-cover object-center filter contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c0e] via-transparent to-transparent opacity-80" />

              {/* Editorial Quote Plaque */}
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-xl bg-[#0b0c0e]/85 backdrop-blur-md border border-white/10">
                <p className="text-xs tracking-[0.2em] uppercase text-[#c8a97e] font-semibold mb-1">
                  Artisanal Extraction
                </p>
                <p className="text-sm text-[#e5e1d8] font-light">
                  Hand-macerated for six continuous weeks in French glass carboys to allow volatile resins to marry peacefully.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right: Narrative Chapters */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-8"
          >
            {/* Pillar 1: Craftsmanship */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-[#c8a97e]">01 //</span>
                <h3 className="font-heading text-xl sm:text-2xl font-medium tracking-wide text-[#f4efe6]">
                  Slow-Macerated Craftsmanship
                </h3>
              </div>
              <p className="text-sm sm:text-base text-[#9e9b94] font-light leading-relaxed pl-8 font-sans">
                While commercial perfumes rely on rapid synthetic blending, Corridor seven honors the ancestral tradition of Grasse. Our master distillers blend high-purity natural extracts with specialized fixatives, allowing each batch to age in temperature-regulated dark cellars until the blend achieves its harmonized resonance.
              </p>
            </div>

            {/* Pillar 2: Rare Botanical Ingredients */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-[#c8a97e]">02 //</span>
                <h3 className="font-heading text-xl sm:text-2xl font-medium tracking-wide text-[#f4efe6]">
                  Noble & Untamed Ingredients
                </h3>
              </div>
              <p className="text-sm sm:text-base text-[#9e9b94] font-light leading-relaxed pl-8 font-sans">
                Wild Cambodian agarwood aged for 18 months; Florentine orris butter harvested only after three years of curing; sun-drenched Calabrian bergamot and Bourbon vanilla beans from Madagascar. We source without compromise, working only with ethical family plantations.
              </p>
            </div>

            {/* Pillar 3: Modern Individuality */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-[#c8a97e]">03 //</span>
                <h3 className="font-heading text-xl sm:text-2xl font-medium tracking-wide text-[#f4efe6]">
                  Skin Chemistry & Individuality
                </h3>
              </div>
              <p className="text-sm sm:text-base text-[#9e9b94] font-light leading-relaxed pl-8 font-sans">
                We design genderless olfactory silhouettes that do not mask the wearer, but interact with individual body heat and sebum. On your skin, a Corridor seven formulation behaves unlike on anyone else — creating a bespoke signature that is unequivocally yours.
              </p>
            </div>

            {/* WhatsApp Consultation Action */}
            <div className="pt-4 pl-8">
              <a
                href={generateConsultationWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 text-xs tracking-[0.2em] uppercase font-semibold text-[#c8a97e] hover:text-[#e6d3b4] pb-1 border-b border-[#c8a97e]/40 hover:border-[#c8a97e] transition-all"
              >
                <span>Speak With Our Master Perfumer On WhatsApp</span>
                <Sparkles className="w-3.5 h-3.5" />
              </a>
            </div>

          </motion.div>
        </div>

        {/* Section: The Architecture of Fragrance (Interactive Pyramid) */}
        <div id="notes-guide" className="p-8 sm:p-12 rounded-2xl bg-[#121417] border border-[#c8a97e]/20 relative overflow-hidden">
          <div className="max-w-3xl mb-8">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#c8a97e] font-semibold">
              The Olfactory Evolution
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl font-light text-[#f4efe6] mt-1 mb-3">
              How a Corridor seven Fragrance Unfolds On Your Skin
            </h3>
            <p className="text-xs sm:text-sm text-[#9e9b94] font-light leading-relaxed">
              True luxury perfumery is dynamic, not linear. As your body warmth activates different molecular weights, the fragrance evolves across three distinct chapters.
            </p>
          </div>

          {/* 3 Interactive Stages */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <button
              onClick={() => setActiveStage('top')}
              className={`text-left p-5 rounded-xl border transition-all ${
                activeStage === 'top'
                  ? 'bg-[#1a1d21] border-[#c8a97e] shadow-lg shadow-[#c8a97e]/10'
                  : 'bg-[#15181b]/60 border-white/5 hover:border-white/15'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] tracking-widest uppercase font-mono text-[#c8a97e]">
                  Stage 01
                </span>
                <span className="text-[10px] text-[#888680]">0 – 30 mins</span>
              </div>
              <h4 className="font-heading text-lg font-medium text-[#f4efe6] mb-1">
                Top Notes (The Introduction)
              </h4>
              <p className="text-xs text-[#9e9b94]">
                The sparkling opening burst. Citrus, crisp herbs, and volatile spices that create immediate magnetism.
              </p>
            </button>

            <button
              onClick={() => setActiveStage('heart')}
              className={`text-left p-5 rounded-xl border transition-all ${
                activeStage === 'heart'
                  ? 'bg-[#1a1d21] border-[#c8a97e] shadow-lg shadow-[#c8a97e]/10'
                  : 'bg-[#15181b]/60 border-white/5 hover:border-white/15'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] tracking-widest uppercase font-mono text-[#c8a97e]">
                  Stage 02
                </span>
                <span className="text-[10px] text-[#888680]">30 mins – 4 hours</span>
              </div>
              <h4 className="font-heading text-lg font-medium text-[#f4efe6] mb-1">
                Heart Notes (The Persona)
              </h4>
              <p className="text-xs text-[#9e9b94]">
                The emotional soul of the perfume. Rich florals, noble cedarwoods, spices, and velvety aromatics.
              </p>
            </button>

            <button
              onClick={() => setActiveStage('base')}
              className={`text-left p-5 rounded-xl border transition-all ${
                activeStage === 'base'
                  ? 'bg-[#1a1d21] border-[#c8a97e] shadow-lg shadow-[#c8a97e]/10'
                  : 'bg-[#15181b]/60 border-white/5 hover:border-white/15'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] tracking-widest uppercase font-mono text-[#c8a97e]">
                  Stage 03
                </span>
                <span className="text-[10px] text-[#888680]">4 – 14+ hours</span>
              </div>
              <h4 className="font-heading text-lg font-medium text-[#f4efe6] mb-1">
                Base Notes (The Memory)
              </h4>
              <p className="text-xs text-[#9e9b94]">
                Heavy molecular resins, Cambodian oud, amber, and skin musks that form your indelible sillage.
              </p>
            </button>
          </div>

          {/* Active Detail Breakdown Card */}
          <div className="p-6 rounded-xl bg-[#0b0c0e] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-[#c8a97e]/15 text-[#c8a97e]">
                <Droplets className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#f4efe6]">
                  {activeStage === 'top' && 'Volatile Citrus & Cold Spices in Corridor seven'}
                  {activeStage === 'heart' && 'Slow-Distilled Centifolia Rose & Atlas Woods'}
                  {activeStage === 'base' && 'Matured Resins, Cambodian Oud & Tonka Beans'}
                </p>
                <p className="text-xs text-[#888680] mt-0.5">
                  Extrait strength ensures each stage lingers up to 3x longer than commercial Eau de Toilettes.
                </p>
              </div>
            </div>

            <div className="text-right self-end sm:self-center">
              <span className="text-xs text-[#c8a97e] font-mono font-medium">
                28% Pure Parfum Oil
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
