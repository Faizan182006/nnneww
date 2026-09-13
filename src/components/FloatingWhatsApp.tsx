import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Sparkles, Send, ShieldCheck } from 'lucide-react';
import { generateQuickInquiryWhatsAppUrl, DEFAULT_WHATSAPP_NUMBER } from '../utils/whatsapp';

interface FloatingWhatsAppProps {
  phoneNumber?: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  phoneNumber = DEFAULT_WHATSAPP_NUMBER,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customQuery, setCustomQuery] = useState('');

  const defaultUrl = generateQuickInquiryWhatsAppUrl(phoneNumber);

  const handleCustomSend = (e: React.FormEvent) => {
    e.preventDefault();
    const text = customQuery.trim() || 'Hello! I’d like to know more about your perfume collection.';
    const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
    setCustomQuery('');
  };

  const handleDirectClick = () => {
    window.open(defaultUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      
      {/* Concierge Mini Card Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.94 }}
            transition={{ duration: 0.3 }}
            className="mb-3 w-80 sm:w-88 rounded-2xl bg-[#121417] border border-[#c8a97e]/30 shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden"
          >
            {/* Popover Header */}
            <div className="p-4 bg-gradient-to-r from-[#171a1e] to-[#0f1113] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center text-[#25D366]">
                    <MessageCircle className="w-5 h-5 fill-[#25D366]" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#25D366] border-2 border-[#121417] rounded-full" />
                </div>
                <div>
                  <h4 className="font-heading text-sm font-medium text-[#f4efe6]">
                    Corridor seven Concierge
                  </h4>
                  <p className="text-[10px] text-[#25D366] flex items-center gap-1 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-ping" />
                    Master Perfumer Online
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 text-[#888680] hover:text-[#f4efe6] rounded-full transition-colors"
                aria-label="Close concierge preview"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-4 space-y-3">
              <div className="p-3 rounded-lg bg-[#181a1d] text-xs text-[#d5d1c8] leading-relaxed border border-white/5">
                <p className="font-light">
                  "Welcome to Corridor seven. How may we assist with your olfactory journey today?"
                </p>
                <span className="text-[9px] text-[#888680] mt-1 block font-mono">
                  Typical reply time: Under 5 minutes
                </span>
              </div>

              {/* Quick Prompt Chips */}
              <div className="space-y-1.5">
                <p className="text-[10px] tracking-wider uppercase text-[#888680] font-medium">
                  Quick Inquiries:
                </p>
                <button
                  type="button"
                  onClick={() => {
                    const url = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello! I would like recommendations for an evening signature scent.')}`;
                    window.open(url, '_blank', 'noopener,noreferrer');
                    setIsOpen(false);
                  }}
                  className="w-full text-left p-2 rounded bg-white/[0.03] hover:bg-white/[0.08] text-[11px] text-[#e5e1d8] border border-white/5 transition-colors"
                >
                  ✨ Recommend an evening signature scent
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const url = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello! How does your complimentary tester vial and exchange policy work?')}`;
                    window.open(url, '_blank', 'noopener,noreferrer');
                    setIsOpen(false);
                  }}
                  className="w-full text-left p-2 rounded bg-white/[0.03] hover:bg-white/[0.08] text-[11px] text-[#e5e1d8] border border-white/5 transition-colors"
                >
                  📦 Inquire about sample vials & express delivery
                </button>
              </div>

              {/* Custom message field */}
              <form onSubmit={handleCustomSend} className="pt-2">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={customQuery}
                    onChange={(e) => setCustomQuery(e.target.value)}
                    placeholder="Type your question..."
                    className="w-full py-2.5 pl-3 pr-10 rounded-lg bg-[#0b0c0e] border border-white/10 text-xs text-[#f4efe6] placeholder-[#888680] focus:outline-none focus:border-[#c8a97e]"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 p-1.5 rounded-md bg-[#25D366] text-[#0b0c0e] hover:bg-[#28e16d] transition-colors"
                    aria-label="Send via WhatsApp"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            </div>

            {/* Footer */}
            <div className="p-3 bg-[#0d0e10] border-t border-white/5 text-center">
              <span className="text-[10px] text-[#888680] flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3 h-3 text-[#c8a97e]" />
                Official WhatsApp Verified Channel
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Main WhatsApp Button */}
      <div className="flex items-center gap-2">
        {/* Subtle tooltip chip on desktop */}
        <span className="hidden sm:inline-block px-3 py-1.5 rounded-full bg-[#121417]/95 backdrop-blur-md border border-[#c8a97e]/25 text-[11px] text-[#f4efe6] shadow-xl font-medium tracking-wide">
          Quick WhatsApp Order & Inquiry
        </span>

        {/* The Action Button */}
        <div className="relative">
          {/* Subtle Outer Pulse Ring */}
          <span className="absolute -inset-1 rounded-full bg-[#25D366]/35 animate-ping opacity-60 pointer-events-none" />

          <button
            id="floating-whatsapp-btn"
            type="button"
            onClick={() => {
              // Direct open or toggle popup
              if (window.innerWidth < 640) {
                handleDirectClick();
              } else {
                setIsOpen(!isOpen);
              }
            }}
            onDoubleClick={handleDirectClick}
            className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-[#1ebe5b] to-[#25D366] hover:from-[#25D366] hover:to-[#34eb7b] text-white shadow-[0_10px_30px_rgba(37,211,102,0.4)] flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 group"
            aria-label="Open WhatsApp fragrance inquiry"
            title="Chat directly on WhatsApp"
          >
            <MessageCircle className="w-7 h-7 fill-white" />
            <span className="sr-only">Quick WhatsApp Order</span>
          </button>
        </div>
      </div>

    </div>
  );
};
