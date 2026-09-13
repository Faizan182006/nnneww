import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, ArrowRight, MessageCircle } from 'lucide-react';
import { Fragrance } from '../types';
import { formatINR, generateBuyNowWhatsAppUrl } from '../utils/whatsapp';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  fragrances: Fragrance[];
  onSelectProduct: (fragrance: Fragrance) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  fragrances,
  onSelectProduct,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const searchResults = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return fragrances;

    return fragrances.filter((f) => {
      const matchName = f.name.toLowerCase().includes(query);
      const matchCategory = f.category.toLowerCase().includes(query);
      const matchDescription = f.description.toLowerCase().includes(query);
      const matchTopNotes = f.topNotes.some((n) => n.toLowerCase().includes(query));
      const matchHeartNotes = f.heartNotes.some((n) => n.toLowerCase().includes(query));
      const matchBaseNotes = f.baseNotes.some((n) => n.toLowerCase().includes(query));
      const matchOccasion = f.occasion.toLowerCase().includes(query);

      return (
        matchName ||
        matchCategory ||
        matchDescription ||
        matchTopNotes ||
        matchHeartNotes ||
        matchBaseNotes ||
        matchOccasion
      );
    });
  }, [searchTerm, fragrances]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        id="search-modal"
        className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4"
        role="dialog"
        aria-modal="true"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        />

        {/* Search Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-2xl bg-[#111316] border border-[#c8a97e]/30 rounded-2xl shadow-2xl overflow-hidden z-10"
        >
          {/* Search Input Field */}
          <div className="p-4 sm:p-5 border-b border-white/10 flex items-center gap-3 bg-[#0e1012]">
            <Search className="w-5 h-5 text-[#c8a97e]" />
            <input
              type="text"
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search perfumes by name, notes (e.g. oud, vanilla, pepper), or family..."
              className="flex-1 bg-transparent text-sm sm:text-base text-[#f4efe6] placeholder-[#888680] focus:outline-none"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="text-xs text-[#888680] hover:text-[#f4efe6] px-2 py-1"
              >
                Clear
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-1 text-[#888680] hover:text-[#f4efe6] rounded-full"
              aria-label="Close search"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Filter Suggestion Pills */}
          <div className="px-5 py-2.5 bg-[#15181b] border-b border-white/5 flex items-center gap-2 overflow-x-auto text-[11px]">
            <span className="text-[#888680] uppercase tracking-wider">Suggested:</span>
            {['Woody', 'Oud', 'Vanilla', 'Bergamot', 'Rose', 'Amber'].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSearchTerm(tag)}
                className="px-2.5 py-0.5 rounded-full bg-white/[0.04] hover:bg-[#c8a97e]/20 text-[#d5d1c8] hover:text-[#c8a97e] transition-colors border border-white/5"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Results List */}
          <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2.5 custom-scrollbar">
            {searchResults.length === 0 ? (
              <div className="py-12 text-center text-[#888680]">
                <p className="text-sm">No olfactory matches found for "{searchTerm}".</p>
                <p className="text-xs mt-1">
                  Try searching for notes like "Oud", "Sandalwood", "Pepper", or "Vanilla".
                </p>
              </div>
            ) : (
              searchResults.map((f) => (
                <div
                  key={f.id}
                  onClick={() => {
                    onSelectProduct(f);
                    onClose();
                  }}
                  className="p-3.5 rounded-xl bg-[#15181c]/60 hover:bg-[#1b1f24] border border-white/5 hover:border-[#c8a97e]/30 flex items-center justify-between gap-4 cursor-pointer transition-all group"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-14 h-16 rounded-lg overflow-hidden bg-black/60 flex-shrink-0 border border-white/10">
                      <img src={f.image} alt={f.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-heading text-base font-medium text-[#f4efe6] group-hover:text-[#c8a97e] transition-colors truncate">
                        {f.name}
                      </h4>
                      <p className="text-[11px] text-[#c8a97e] uppercase tracking-wider">
                        {f.category} • {f.size}
                      </p>
                      <p className="text-xs text-[#888680] truncate font-light mt-0.5">
                        Notes: {f.topNotes.slice(0, 2).join(', ')}, {f.baseNotes[0]}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="font-heading text-sm font-medium text-[#f4efe6]">
                      {formatINR(f.price)}
                    </span>
                    <a
                      href={generateBuyNowWhatsAppUrl(f, f.size, 1)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 rounded bg-[#25D366]/15 hover:bg-[#25D366] text-[#25D366] hover:text-white transition-colors"
                      title="Direct WhatsApp Buy Now"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
