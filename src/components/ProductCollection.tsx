import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Eye, ShoppingBag, Sparkles, Filter, Check } from 'lucide-react';
import { Fragrance } from '../types';
import { formatINR, generateBuyNowWhatsAppUrl } from '../utils/whatsapp';

interface ProductCollectionProps {
  fragrances: Fragrance[];
  onSelectProduct: (fragrance: Fragrance) => void;
  onAddToCart: (fragrance: Fragrance, size: string, quantity: number) => void;
  addedFragranceId: string | null;
}

export const ProductCollection: React.FC<ProductCollectionProps> = ({
  fragrances,
  onSelectProduct,
  onAddToCart,
  addedFragranceId,
}) => {
  const [selectedFamily, setSelectedFamily] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  const families = ['All', 'Woody', 'Floral', 'Oud', 'Amber'];

  const filteredProducts = useMemo(() => {
    let result = fragrances;
    if (selectedFamily !== 'All') {
      result = result.filter((f) => f.family === selectedFamily);
    }

    if (sortBy === 'price-asc') {
      return [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      return [...result].sort((a, b) => b.price - a.price);
    }
    return result;
  }, [fragrances, selectedFamily, sortBy]);

  const handleBuyNow = (e: React.MouseEvent, fragrance: Fragrance) => {
    e.stopPropagation();
    const url = generateBuyNowWhatsAppUrl(fragrance, fragrance.size, 1);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleQuickAdd = (e: React.MouseEvent, fragrance: Fragrance) => {
    e.stopPropagation();
    onAddToCart(fragrance, fragrance.size, 1);
  };

  return (
    <section id="collection" className="py-24 bg-[#0b0c0e] relative">
      {/* Background Decorative Accents */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c8a97e]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Scroll Motion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#181a1d] border border-[#c8a97e]/20 text-[11px] tracking-[0.25em] text-[#c8a97e] uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>The Permanent Collection</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-light tracking-[0.05em] text-[#f4efe6] mb-4">
            Olfactory Signatures
          </h2>
          <p className="text-sm sm:text-base text-[#9e9b94] font-light leading-relaxed">
            Every bottle is an architectural formulation of high-concentration perfume oils, 
            macerated to perfection and bottled in weighted smoked glass.
          </p>
        </motion.div>

        {/* Filter & Sorting Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-10 border-b border-white/10 mb-12">
          {/* Family Category Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {families.map((family) => {
              const isActive = selectedFamily === family;
              return (
                <button
                  key={family}
                  id={`filter-family-${family.toLowerCase()}`}
                  onClick={() => setSelectedFamily(family)}
                  className={`px-5 py-2 rounded-full text-xs tracking-[0.15em] uppercase font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-[#c8a97e] text-[#0b0c0e] font-semibold shadow-lg shadow-[#c8a97e]/20'
                      : 'bg-[#181a1d] text-[#e5e1d8]/70 hover:text-[#f4efe6] hover:bg-[#22262a] border border-white/5'
                  }`}
                >
                  {family === 'All' ? 'All Creations' : `${family} Notes`}
                </button>
              );
            })}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            <span className="text-xs text-[#888680] tracking-wider uppercase flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-[#c8a97e]" />
              Sort:
            </span>
            <select
              id="sort-collection-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#181a1d] text-xs tracking-wider text-[#e5e1d8] border border-white/10 rounded-sm px-3 py-2 focus:outline-none focus:border-[#c8a97e] transition-colors"
            >
              <option value="featured">Featured Curations</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          <AnimatePresence>
            {filteredProducts.map((fragrance, index) => {
              const isAdded = addedFragranceId === fragrance.id;

              return (
                <motion.div
                  key={fragrance.id}
                  id={`product-card-${fragrance.id}`}
                  layout
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  onClick={() => onSelectProduct(fragrance)}
                  className="group relative bg-[#141618] rounded-xl overflow-hidden border border-[#c8a97e]/15 hover:border-[#c8a97e]/50 hover:-translate-y-2 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.9),0_0_30px_rgba(200,169,126,0.12)] transition-all duration-500 flex flex-col cursor-pointer"
                >
                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
                    <span className="px-3 py-1 rounded-full text-[10px] tracking-[0.2em] uppercase font-semibold bg-[#0b0c0e]/85 backdrop-blur-md text-[#c8a97e] border border-[#c8a97e]/30">
                      {fragrance.isBestseller ? 'Bestseller' : fragrance.category}
                    </span>
                    <span className="text-[11px] font-medium tracking-widest text-[#f4efe6] bg-[#0b0c0e]/85 backdrop-blur-md px-2.5 py-1 rounded border border-white/10">
                      {fragrance.size}
                    </span>
                  </div>

                  {/* Product Image Stage */}
                  <div className="relative h-80 sm:h-84 overflow-hidden bg-[#0d0e10]">
                    <img
                      src={fragrance.image}
                      alt={fragrance.name}
                      className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-108"
                      loading="lazy"
                    />
                    {/* Atmospheric Lighting Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141618] via-transparent to-transparent opacity-90" />
                    
                    {/* Quick Action Bar on Hover */}
                    <div className="absolute inset-x-4 bottom-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProduct(fragrance);
                        }}
                        className="flex-1 py-2.5 px-3 bg-[#0b0c0e]/90 hover:bg-[#0b0c0e] text-[#f4efe6] hover:text-[#c8a97e] border border-white/15 text-[11px] font-medium tracking-[0.15em] uppercase rounded backdrop-blur-md flex items-center justify-center gap-2 transition-all"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Details</span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handleQuickAdd(e, fragrance)}
                        className={`p-2.5 rounded border text-[11px] tracking-wider uppercase backdrop-blur-md transition-all ${
                          isAdded
                            ? 'bg-[#c8a97e] text-[#0b0c0e] border-[#c8a97e]'
                            : 'bg-[#0b0c0e]/90 text-[#f4efe6] hover:text-[#c8a97e] border-white/15 hover:bg-[#0b0c0e]'
                        }`}
                        title="Add to Olfactory Bag"
                      >
                        {isAdded ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Card Information */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Sub-classification */}
                      <div className="flex items-center justify-between text-[11px] tracking-[0.2em] uppercase text-[#c8a97e] mb-1.5 font-light">
                        <span>{fragrance.concentration.split('•')[0].trim()}</span>
                        <span className="text-[#888680]">{fragrance.gender}</span>
                      </div>

                      {/* Product Name */}
                      <h3 className="font-heading text-2xl font-medium tracking-[0.05em] text-[#f4efe6] group-hover:text-[#c8a97e] transition-colors mb-2">
                        {fragrance.name}
                      </h3>

                      {/* Short Description */}
                      <p className="text-xs text-[#9e9b94] font-light leading-relaxed line-clamp-2 mb-4 font-sans">
                        {fragrance.description}
                      </p>

                      {/* Fragrance Notes Highlights */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {fragrance.topNotes.slice(0, 2).map((note, i) => (
                          <span
                            key={i}
                            className="text-[10px] px-2 py-0.5 rounded bg-white/[0.03] border border-white/5 text-[#d5d1c8]"
                          >
                            {note}
                          </span>
                        ))}
                        <span className="text-[10px] px-2 py-0.5 rounded bg-white/[0.03] border border-white/5 text-[#c8a97e]">
                          +{fragrance.heartNotes.length + fragrance.baseNotes.length} more
                        </span>
                      </div>
                    </div>

                    {/* Price & Primary WhatsApp Buy Now CTA */}
                    <div className="pt-4 border-t border-white/5">
                      <div className="flex items-baseline justify-between mb-4">
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-heading font-medium tracking-wide text-[#f4efe6]">
                            {formatINR(fragrance.price)}
                          </span>
                          {fragrance.originalPrice && (
                            <span className="text-xs text-[#888680] line-through">
                              {formatINR(fragrance.originalPrice)}
                            </span>
                          )}
                        </div>
                        <span className="text-[10px] tracking-wider text-[#888680] uppercase">
                          Free Express Shipping
                        </span>
                      </div>

                      {/* Action Buttons Grid */}
                      <div className="grid grid-cols-2 gap-2.5">
                        {/* View Details CTA */}
                        <button
                          type="button"
                          id={`btn-view-${fragrance.id}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectProduct(fragrance);
                          }}
                          className="w-full py-3 px-3 rounded-sm bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-[#c8a97e]/40 text-[#f4efe6] text-[11px] font-semibold tracking-[0.18em] uppercase transition-all flex items-center justify-center gap-1.5"
                        >
                          <span>View Details</span>
                        </button>

                        {/* WhatsApp BUY NOW CTA */}
                        <button
                          type="button"
                          id={`btn-buy-now-${fragrance.id}`}
                          onClick={(e) => handleBuyNow(e, fragrance)}
                          className="w-full py-3 px-3 rounded-sm bg-gradient-to-r from-[#25D366] to-[#1ebe5b] hover:from-[#28e16d] hover:to-[#22cf64] text-white text-[11px] font-bold tracking-[0.18em] uppercase transition-all shadow-lg shadow-[#25D366]/20 hover:shadow-[#25D366]/30 flex items-center justify-center gap-1.5"
                          title="Instant WhatsApp Order"
                        >
                          <MessageCircle className="w-4 h-4 fill-white" />
                          <span>Buy Now</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
