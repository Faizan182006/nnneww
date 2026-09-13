import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, ArrowRight, RotateCcw, MessageCircle, Check } from 'lucide-react';
import { Fragrance } from '../types';
import { generateBuyNowWhatsAppUrl, generateConsultationWhatsAppUrl } from '../utils/whatsapp';

interface FragranceQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  fragrances: Fragrance[];
  onSelectProduct: (fragrance: Fragrance) => void;
}

export const FragranceQuizModal: React.FC<FragranceQuizModalProps> = ({
  isOpen,
  onClose,
  fragrances,
  onSelectProduct,
}) => {
  const [step, setStep] = useState<number>(1);
  const [selectedVibe, setSelectedVibe] = useState<string>('');
  const [selectedOccasion, setSelectedOccasion] = useState<string>('');
  const [selectedNotes, setSelectedNotes] = useState<string>('');

  if (!isOpen) return null;

  const resetQuiz = () => {
    setStep(1);
    setSelectedVibe('');
    setSelectedOccasion('');
    setSelectedNotes('');
  };

  // Logic to determine recommended fragrance
  const getRecommendation = (): Fragrance => {
    if (selectedNotes === 'oud' || selectedVibe === 'regal') {
      return fragrances.find((f) => f.id === 'oud-royale') || fragrances[0];
    }
    if (selectedNotes === 'woody' || selectedOccasion === 'evening') {
      return fragrances.find((f) => f.id === 'noir-elan') || fragrances[0];
    }
    if (selectedNotes === 'floral' || selectedVibe === 'delicate') {
      return fragrances.find((f) => f.id === 'velour-mist') || fragrances[1];
    }
    if (selectedNotes === 'amber' || selectedVibe === 'warm') {
      return fragrances.find((f) => f.id === 'aurelia') || fragrances[3];
    }
    if (selectedVibe === 'minimalist') {
      return fragrances.find((f) => f.id === 'celestial-santal') || fragrances[0];
    }
    return fragrances[0];
  };

  const recommendation = getRecommendation();

  return (
    <AnimatePresence>
      <div
        id="fragrance-quiz-modal"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
        role="dialog"
        aria-modal="true"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-xl bg-[#111316] border border-[#c8a97e]/30 rounded-2xl shadow-2xl overflow-hidden z-10"
        >
          {/* Header */}
          <div className="p-6 border-b border-white/10 bg-[#0e1012] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#c8a97e]" />
              <span className="text-xs tracking-[0.25em] uppercase text-[#c8a97e] font-semibold">
                Signature Scent Finder
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-[#888680] hover:text-[#f4efe6] rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 sm:p-8">
            {/* Step 1: Aura & Presence */}
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div>
                  <span className="text-[10px] tracking-widest text-[#c8a97e] uppercase font-mono">
                    Step 1 of 3
                  </span>
                  <h3 className="font-heading text-2xl text-[#f4efe6] font-light mt-1">
                    What emotional aura do you wish to project?
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'mysterious', title: 'Mysterious & Seductive', desc: 'Dark woods, black spices, smoke' },
                    { id: 'regal', title: 'Regal & Opulent', desc: 'Precious oud, leather, royal saffron' },
                    { id: 'warm', title: 'Warm & Sensual', desc: 'Amber, honey, Madagascar vanilla' },
                    { id: 'delicate', title: 'Clean, Silk & Ethereal', desc: 'White tea, dewy rose, skin musk' },
                    { id: 'minimalist', title: 'Modern & Architectural', desc: 'Australian sandalwood, cool spices' },
                  ].map((option) => (
                    <button
                      key={option.id}
                      onClick={() => {
                        setSelectedVibe(option.id);
                        setStep(2);
                      }}
                      className="p-4 rounded-xl text-left bg-[#16191d] hover:bg-[#1f2328] border border-white/5 hover:border-[#c8a97e]/40 transition-all group"
                    >
                      <p className="font-heading text-sm text-[#f4efe6] group-hover:text-[#c8a97e] font-medium">
                        {option.title}
                      </p>
                      <p className="text-[11px] text-[#888680] mt-1 font-light">{option.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Occasion */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div>
                  <span className="text-[10px] tracking-widest text-[#c8a97e] uppercase font-mono">
                    Step 2 of 3
                  </span>
                  <h3 className="font-heading text-2xl text-[#f4efe6] font-light mt-1">
                    When will this fragrance be primarily worn?
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'evening', title: 'Evening & Intimate Nights', desc: 'Romantic dinners, dimly-lit lounges' },
                    { id: 'signature', title: 'Everyday Signature', desc: 'Effortless luxury from morning to midnight' },
                    { id: 'galas', title: 'Grand Occasions & Galas', desc: 'Weddings, formal banquets, milestone events' },
                    { id: 'executive', title: 'Boardroom & Professional', desc: 'Understated authority and prestige' },
                  ].map((option) => (
                    <button
                      key={option.id}
                      onClick={() => {
                        setSelectedOccasion(option.id);
                        setStep(3);
                      }}
                      className="p-4 rounded-xl text-left bg-[#16191d] hover:bg-[#1f2328] border border-white/5 hover:border-[#c8a97e]/40 transition-all group"
                    >
                      <p className="font-heading text-sm text-[#f4efe6] group-hover:text-[#c8a97e] font-medium">
                        {option.title}
                      </p>
                      <p className="text-[11px] text-[#888680] mt-1 font-light">{option.desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Preferred Olfactory Family */}
            {step === 3 && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div>
                  <span className="text-[10px] tracking-widest text-[#c8a97e] uppercase font-mono">
                    Step 3 of 3
                  </span>
                  <h3 className="font-heading text-2xl text-[#f4efe6] font-light mt-1">
                    Which fragrance accords resonate most with you?
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'woody', title: 'Aged Woods & Black Pepper', tag: 'Woody / Spicy' },
                    { id: 'oud', title: 'Imperial Cambodian Agarwood', tag: 'Oud / Royal' },
                    { id: 'amber', title: 'Golden Amber & Madagascar Vanilla', tag: 'Amber / Gourmand' },
                    { id: 'floral', title: 'Grasse Rose & Cashmere Musk', tag: 'Floral / Musk' },
                  ].map((option) => (
                    <button
                      key={option.id}
                      onClick={() => {
                        setSelectedNotes(option.id);
                        setStep(4);
                      }}
                      className="p-4 rounded-xl text-left bg-[#16191d] hover:bg-[#1f2328] border border-white/5 hover:border-[#c8a97e]/40 transition-all group"
                    >
                      <p className="font-heading text-sm text-[#f4efe6] group-hover:text-[#c8a97e] font-medium">
                        {option.title}
                      </p>
                      <p className="text-[11px] text-[#c8a97e] mt-1 font-mono">{option.tag}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Final Recommendation */}
            {step === 4 && (
              <div className="space-y-6 animate-in fade-in duration-300 text-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c8a97e]/15 text-[#c8a97e] text-xs font-semibold uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Your Ideal Olfactory Match</span>
                </div>

                <div className="p-6 rounded-2xl bg-[#15181c] border border-[#c8a97e]/30 flex flex-col sm:flex-row items-center gap-6 text-left">
                  <div className="w-24 h-32 rounded-xl overflow-hidden bg-black/60 flex-shrink-0 border border-white/10">
                    <img
                      src={recommendation.image}
                      alt={recommendation.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <span className="text-[10px] tracking-[0.25em] uppercase text-[#c8a97e] font-semibold">
                      {recommendation.category} • {recommendation.size}
                    </span>
                    <h4 className="font-heading text-2xl text-[#f4efe6] font-medium mt-1">
                      {recommendation.name}
                    </h4>
                    <p className="text-xs text-[#9e9b94] font-light leading-relaxed mt-1 mb-3">
                      {recommendation.description}
                    </p>
                    <p className="text-xs font-semibold text-[#f4efe6]">
                      ₹{recommendation.price.toLocaleString()} • {recommendation.longevity} Longevity
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <a
                    href={generateBuyNowWhatsAppUrl(recommendation, recommendation.size, 1)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 rounded-md bg-gradient-to-r from-[#25D366] to-[#1ebe5b] hover:from-[#28e16d] hover:to-[#22cf64] text-white font-bold text-xs tracking-[0.2em] uppercase transition-all shadow-xl shadow-[#25D366]/20 flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Order {recommendation.name} On WhatsApp</span>
                  </a>

                  <button
                    onClick={() => {
                      onSelectProduct(recommendation);
                      onClose();
                    }}
                    className="w-full py-3 px-4 rounded-md bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-[#f4efe6] text-xs font-semibold tracking-wider uppercase transition-all"
                  >
                    Explore Full Flacon Details
                  </button>

                  <button
                    onClick={resetQuiz}
                    className="inline-flex items-center gap-1.5 text-xs text-[#888680] hover:text-[#c8a97e] pt-2"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Retake Olfactory Quiz</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
