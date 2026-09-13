import React, { useState } from 'react';
import { MessageCircle, Mail, MapPin, ShieldCheck, Sparkles, Check } from 'lucide-react';
import { generateQuickInquiryWhatsAppUrl, generateConsultationWhatsAppUrl, DISPLAY_WHATSAPP_NUMBER } from '../utils/whatsapp';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 4000);
    }
  };

  return (
    <footer id="contact" className="bg-[#090a0c] border-t border-[#c8a97e]/20 text-[#e5e1d8] pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Concierge & Bespoke Consultation Banner */}
        <div className="mb-20 p-8 sm:p-12 rounded-2xl bg-gradient-to-r from-[#121417] via-[#16191d] to-[#121417] border border-[#c8a97e]/25 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-center md:text-left">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#c8a97e] font-semibold flex items-center justify-center md:justify-start gap-2 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Private Olfactory Concierge
            </span>
            <h3 className="font-heading text-2xl sm:text-3xl text-[#f4efe6] font-light mb-3">
              Require A Personalized Scent Consultation?
            </h3>
            <p className="text-xs sm:text-sm text-[#9e9b94] font-light leading-relaxed">
              Connect directly with our perfumery specialists on WhatsApp for bespoke fragrance curation, wedding and corporate gifting, or sample orders.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 flex-shrink-0 w-full md:w-auto">
            <a
              href={generateConsultationWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-sm bg-[#25D366] hover:bg-[#20bf5b] text-[#0b0c0e] font-bold text-xs tracking-[0.2em] uppercase transition-all shadow-xl shadow-[#25D366]/20"
            >
              <MessageCircle className="w-4 h-4 fill-[#0b0c0e]" />
              <span>WhatsApp Concierge</span>
            </a>
          </div>
        </div>

        {/* 4-Column Navigation Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/10">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <span className="font-heading text-2xl tracking-[0.25em] font-semibold text-[#f4efe6]">
                CORRIDOR SEVEN
              </span>
              <p className="text-[9px] tracking-[0.35em] uppercase text-[#c8a97e] mt-1 font-light">
                Haute Parfumerie • Grasse Extraits
              </p>
            </div>
            <p className="text-xs text-[#9e9b94] font-light leading-relaxed max-w-sm">
              Artisanal fragrances crafted with rare absolutes, slow-macerated botanicals, and high pure-oil concentrations to sculpt unforgettable olfactory signatures.
            </p>
            <div className="pt-2 text-xs text-[#888680] space-y-1 font-mono">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#c8a97e]" />
                Bespoke Atelier • Flagship Parfumerie
              </p>
              <p className="flex items-center gap-2">
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                WhatsApp Order Line: {DISPLAY_WHATSAPP_NUMBER}
              </p>
            </div>
          </div>

          {/* Collection Links */}
          <div className="space-y-3">
            <h4 className="text-xs tracking-[0.2em] uppercase text-[#f4efe6] font-semibold">
              The Collection
            </h4>
            <ul className="space-y-2 text-xs text-[#9e9b94]">
              <li>
                <a href="#collection" className="hover:text-[#c8a97e] transition-colors">
                  Noir Élan (Woody / Spicy)
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-[#c8a97e] transition-colors">
                  Velour Mist (Floral / Musk)
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-[#c8a97e] transition-colors">
                  Oud Royale (Imperial Agarwood)
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-[#c8a97e] transition-colors">
                  Aurelia (Amber / Vanilla)
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-[#c8a97e] transition-colors">
                  Celestial Santal (Extrait)
                </a>
              </li>
            </ul>
          </div>

          {/* Olfactory Craft */}
          <div className="space-y-3">
            <h4 className="text-xs tracking-[0.2em] uppercase text-[#f4efe6] font-semibold">
              Olfactory Craft
            </h4>
            <ul className="space-y-2 text-xs text-[#9e9b94]">
              <li>
                <a href="#notes-guide" className="hover:text-[#c8a97e] transition-colors">
                  The Fragrance Pyramid
                </a>
              </li>
              <li>
                <a href="#story" className="hover:text-[#c8a97e] transition-colors">
                  Slow-Maceration Process
                </a>
              </li>
              <li>
                <a href="#story" className="hover:text-[#c8a97e] transition-colors">
                  Ethical Botanical Sourcing
                </a>
              </li>
              <li>
                <a href="#story" className="hover:text-[#c8a97e] transition-colors">
                  Care & Preservation Guide
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="space-y-3">
            <h4 className="text-xs tracking-[0.2em] uppercase text-[#f4efe6] font-semibold">
              The Private Gazette
            </h4>
            <p className="text-xs text-[#9e9b94] font-light">
              Receive private notifications for limited vintage harvest batches and new olfactory releases.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address..."
                  className="w-full py-2.5 px-3 rounded bg-[#141618] border border-white/10 text-xs text-[#f4efe6] placeholder-[#888680] focus:outline-none focus:border-[#c8a97e]"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 px-3 bg-[#c8a97e] hover:bg-[#dfc8a5] text-[#0b0c0e] font-semibold text-[11px] tracking-[0.2em] uppercase rounded-sm transition-all"
              >
                {subscribed ? (
                  <span className="flex items-center justify-center gap-1 text-[#0b0c0e]">
                    <Check className="w-3.5 h-3.5" /> Enrolled
                  </span>
                ) : (
                  'Request Access'
                )}
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Credits & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#888680]">
          <p>© {new Date().getFullYear()} Corridor seven. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <span>IFRA Certified</span>
            <span>Cruelty-Free</span>
            <span>Handcrafted In Small Batches</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
