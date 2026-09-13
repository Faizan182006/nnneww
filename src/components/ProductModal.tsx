import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  MessageCircle,
  ShoppingBag,
  Sparkles,
  Clock,
  Wind,
  Calendar,
  Layers,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  Minus,
  Plus,
  Share2,
} from 'lucide-react';
import { Fragrance } from '../types';
import { formatINR, generateBuyNowWhatsAppUrl } from '../utils/whatsapp';

interface ProductModalProps {
  fragrance: Fragrance | null;
  onClose: () => void;
  onAddToCart: (fragrance: Fragrance, size: string, quantity: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  fragrance,
  onClose,
  onAddToCart,
}) => {
  if (!fragrance) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(fragrance.size);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'story' | 'notes' | 'ingredients' | 'shipping' | 'returns'>('notes');
  const [copiedLink, setCopiedLink] = useState(false);
  const [justAddedToBag, setJustAddedToBag] = useState(false);

  // Price adjustment for sizes
  const unitPrice =
    selectedSize === '50ml' && fragrance.size === '100ml'
      ? Math.round(fragrance.price * 0.7)
      : selectedSize === '100ml' && fragrance.size === '50ml'
      ? Math.round(fragrance.price * 1.4)
      : fragrance.price;

  const totalPrice = unitPrice * quantity;

  const handleWhatsAppBuyNow = () => {
    const url = generateBuyNowWhatsAppUrl(
      fragrance,
      selectedSize,
      quantity
    );
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleAddBag = () => {
    onAddToCart(fragrance, selectedSize, quantity);
    setJustAddedToBag(true);
    setTimeout(() => setJustAddedToBag(false), 2200);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      <div
        id="product-detail-modal"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-product-title"
      >
        {/* Backdrop with frosted dark blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl bg-[#111316] border border-[#c8a97e]/30 rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.95)] overflow-hidden z-10 max-h-[92vh] flex flex-col"
        >
          {/* Header Bar with close */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0e1012]">
            <div className="flex items-center gap-2">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#c8a97e] font-light">
                Corridor seven • Olfactory Archive
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleShare}
                className="p-2 text-[#888680] hover:text-[#c8a97e] rounded-full hover:bg-white/5 transition-colors"
                title="Share perfume link"
              >
                {copiedLink ? <Check className="w-4 h-4 text-[#25D366]" /> : <Share2 className="w-4 h-4" />}
              </button>
              <button
                id="close-product-modal-btn"
                type="button"
                onClick={onClose}
                className="p-2 text-[#888680] hover:text-[#f4efe6] rounded-full hover:bg-white/5 transition-colors"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Scrollable Content Body */}
          <div className="overflow-y-auto p-6 sm:p-8 custom-scrollbar">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              
              {/* Left: Gallery & Bottle Display */}
              <div className="lg:col-span-6 flex flex-col gap-4">
                {/* Main Large Image */}
                <div className="relative h-[340px] sm:h-[420px] rounded-xl overflow-hidden bg-[#0d0e10] border border-white/10">
                  <img
                    src={fragrance.gallery[activeImageIndex] || fragrance.image}
                    alt={fragrance.name}
                    className="w-full h-full object-cover object-center transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e1012] via-transparent to-transparent opacity-60 pointer-events-none" />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                    <span className="px-3 py-1 rounded-full text-[10px] tracking-[0.2em] uppercase font-semibold bg-[#0b0c0e]/85 backdrop-blur-md text-[#c8a97e] border border-[#c8a97e]/30">
                      {fragrance.concentration}
                    </span>
                    <span className="px-3 py-1 rounded-full text-[10px] tracking-[0.15em] uppercase text-[#e5e1d8] bg-[#0b0c0e]/80 backdrop-blur-md border border-white/10">
                      {fragrance.character}
                    </span>
                  </div>
                </div>

                {/* Thumbnails row */}
                {fragrance.gallery.length > 1 && (
                  <div className="flex gap-3 overflow-x-auto pb-1">
                    {fragrance.gallery.map((imgUrl, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                          activeImageIndex === idx
                            ? 'border-[#c8a97e] ring-2 ring-[#c8a97e]/30 scale-105'
                            : 'border-white/10 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={imgUrl}
                          alt={`${fragrance.name} view ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}

                {/* Olfactory Metrics Matrix */}
                <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-[#14171a] border border-white/5 mt-2">
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-[#c8a97e] mt-0.5" />
                    <div>
                      <p className="text-[10px] tracking-[0.15em] uppercase text-[#888680]">Longevity</p>
                      <p className="text-xs font-semibold text-[#f4efe6]">{fragrance.longevity}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Wind className="w-4 h-4 text-[#c8a97e] mt-0.5" />
                    <div>
                      <p className="text-[10px] tracking-[0.15em] uppercase text-[#888680]">Sillage</p>
                      <p className="text-xs font-semibold text-[#f4efe6]">{fragrance.sillage}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Calendar className="w-4 h-4 text-[#c8a97e] mt-0.5" />
                    <div>
                      <p className="text-[10px] tracking-[0.15em] uppercase text-[#888680]">Occasion</p>
                      <p className="text-xs font-semibold text-[#f4efe6]">{fragrance.occasion}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Layers className="w-4 h-4 text-[#c8a97e] mt-0.5" />
                    <div>
                      <p className="text-[10px] tracking-[0.15em] uppercase text-[#888680]">Classification</p>
                      <p className="text-xs font-semibold text-[#f4efe6]">{fragrance.gender}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Formulation Details & Purchase Controls */}
              <div className="lg:col-span-6 flex flex-col justify-between">
                <div>
                  {/* Family tag */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs tracking-[0.25em] uppercase text-[#c8a97e] font-semibold">
                      {fragrance.category}
                    </span>
                    <span className="text-xs text-[#888680] flex items-center gap-1">
                      ★ {fragrance.rating} ({fragrance.reviewsCount} verified connoisseurs)
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h2
                    id="modal-product-title"
                    className="font-heading text-3xl sm:text-4xl font-light tracking-[0.05em] text-[#f4efe6] mb-2"
                  >
                    {fragrance.name}
                  </h2>
                  <p className="font-editorial italic text-base text-[#e6d3b4] mb-4">
                    "{fragrance.tagline}"
                  </p>

                  {/* Price Section */}
                  <div className="flex items-baseline gap-3 p-4 rounded-lg bg-[#15181c] border border-white/5 mb-6">
                    <span className="font-heading text-3xl font-medium tracking-wide text-[#f4efe6]">
                      {formatINR(totalPrice)}
                    </span>
                    {fragrance.originalPrice && (
                      <span className="text-sm text-[#888680] line-through">
                        {formatINR(fragrance.originalPrice * quantity)}
                      </span>
                    )}
                    <span className="ml-auto text-[11px] font-semibold text-[#25D366] bg-[#25D366]/10 px-2.5 py-1 rounded border border-[#25D366]/20">
                      Taxes Included • Free Luxury Box
                    </span>
                  </div>

                  {/* Flacon Size Selection */}
                  <div className="mb-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs tracking-[0.15em] uppercase text-[#888680] font-medium">
                        Select Flacon Volume
                      </span>
                      <span className="text-xs text-[#c8a97e]">Selected: {selectedSize}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {fragrance.sizesAvailable.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setSelectedSize(s)}
                          className={`py-3 px-4 rounded-md text-xs font-semibold tracking-wider uppercase border transition-all ${
                            selectedSize === s
                              ? 'bg-[#c8a97e]/15 border-[#c8a97e] text-[#f4efe6] shadow-sm'
                              : 'bg-white/[0.02] border-white/10 text-[#888680] hover:text-[#e5e1d8]'
                          }`}
                        >
                          {s} Extrait Bottle
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity Selector */}
                  <div className="mb-6 flex items-center justify-between">
                    <span className="text-xs tracking-[0.15em] uppercase text-[#888680] font-medium">
                      Quantity
                    </span>
                    <div className="inline-flex items-center border border-white/10 rounded-md bg-[#15181c] p-1">
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-1.5 text-[#888680] hover:text-[#f4efe6] transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-4 text-xs font-bold text-[#f4efe6] min-w-[2.5rem] text-center font-mono">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-1.5 text-[#888680] hover:text-[#f4efe6] transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* WhatsApp BUY NOW Primary Direct Order CTA */}
                  <div className="space-y-3 mb-8">
                    <button
                      type="button"
                      id="modal-whatsapp-buy-now-btn"
                      onClick={handleWhatsAppBuyNow}
                      className="w-full py-4 px-6 rounded-md bg-gradient-to-r from-[#25D366] via-[#20bf5b] to-[#128C7E] hover:from-[#28e16d] hover:to-[#17a08f] text-white font-bold text-xs tracking-[0.2em] uppercase transition-all shadow-xl shadow-[#25D366]/20 hover:shadow-[#25D366]/30 flex items-center justify-center gap-3 group"
                    >
                      <MessageCircle className="w-5 h-5 fill-white" />
                      <span>Buy Via WhatsApp • {formatINR(totalPrice)}</span>
                    </button>

                    {/* Secondary Add to Olfactory Bag */}
                    <button
                      type="button"
                      id="modal-add-to-bag-btn"
                      onClick={handleAddBag}
                      className="w-full py-3.5 px-6 rounded-md bg-white/[0.04] hover:bg-white/[0.08] border border-[#c8a97e]/30 hover:border-[#c8a97e]/60 text-[#f4efe6] font-semibold text-xs tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-2.5"
                    >
                      {justAddedToBag ? (
                        <>
                          <Check className="w-4 h-4 text-[#25D366]" />
                          <span className="text-[#25D366]">Added to Olfactory Bag</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4 text-[#c8a97e]" />
                          <span>Add to Olfactory Bag</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Tabs Navigation for In-depth Details */}
                  <div className="border-t border-white/10 pt-6">
                    <div className="flex border-b border-white/10 gap-4 sm:gap-6 overflow-x-auto text-xs tracking-[0.15em] uppercase font-medium pb-2 mb-4">
                      <button
                        onClick={() => setActiveTab('notes')}
                        className={`pb-2 transition-colors relative ${
                          activeTab === 'notes' ? 'text-[#c8a97e] font-semibold' : 'text-[#888680] hover:text-[#e5e1d8]'
                        }`}
                      >
                        Olfactory Pyramid
                        {activeTab === 'notes' && (
                          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#c8a97e]" />
                        )}
                      </button>

                      <button
                        onClick={() => setActiveTab('story')}
                        className={`pb-2 transition-colors relative ${
                          activeTab === 'story' ? 'text-[#c8a97e] font-semibold' : 'text-[#888680] hover:text-[#e5e1d8]'
                        }`}
                      >
                        The Story
                        {activeTab === 'story' && (
                          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#c8a97e]" />
                        )}
                      </button>

                      <button
                        onClick={() => setActiveTab('ingredients')}
                        className={`pb-2 transition-colors relative ${
                          activeTab === 'ingredients' ? 'text-[#c8a97e] font-semibold' : 'text-[#888680] hover:text-[#e5e1d8]'
                        }`}
                      >
                        Ingredients
                        {activeTab === 'ingredients' && (
                          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#c8a97e]" />
                        )}
                      </button>

                      <button
                        onClick={() => setActiveTab('shipping')}
                        className={`pb-2 transition-colors relative ${
                          activeTab === 'shipping' ? 'text-[#c8a97e] font-semibold' : 'text-[#888680] hover:text-[#e5e1d8]'
                        }`}
                      >
                        Shipping & Guarantee
                        {activeTab === 'shipping' && (
                          <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#c8a97e]" />
                        )}
                      </button>
                    </div>

                    {/* Active Tab Panel */}
                    <div className="min-h-[140px] text-xs leading-relaxed text-[#9e9b94]">
                      {activeTab === 'notes' && (
                        <div className="space-y-3 animate-in fade-in duration-300">
                          {/* Top Notes */}
                          <div className="p-3 rounded-lg bg-[#15181c] border border-white/5">
                            <div className="flex items-center gap-2 text-[#c8a97e] font-semibold uppercase tracking-wider mb-1">
                              <Sparkles className="w-3.5 h-3.5" />
                              <span>Top Notes (First 15–30 Mins)</span>
                            </div>
                            <p className="text-[#f4efe6] font-medium pl-5">
                              {fragrance.topNotes.join(' • ')}
                            </p>
                          </div>

                          {/* Heart Notes */}
                          <div className="p-3 rounded-lg bg-[#15181c] border border-white/5">
                            <div className="flex items-center gap-2 text-[#e2cca8] font-semibold uppercase tracking-wider mb-1">
                              <Layers className="w-3.5 h-3.5" />
                              <span>Heart / Middle Notes (2–4 Hours)</span>
                            </div>
                            <p className="text-[#f4efe6] font-medium pl-5">
                              {fragrance.heartNotes.join(' • ')}
                            </p>
                          </div>

                          {/* Base Notes */}
                          <div className="p-3 rounded-lg bg-[#15181c] border border-white/5">
                            <div className="flex items-center gap-2 text-[#8c724f] font-semibold uppercase tracking-wider mb-1">
                              <ShieldCheck className="w-3.5 h-3.5" />
                              <span>Base Notes (4–12+ Hours Sillage)</span>
                            </div>
                            <p className="text-[#f4efe6] font-medium pl-5">
                              {fragrance.baseNotes.join(' • ')}
                            </p>
                          </div>
                        </div>
                      )}

                      {activeTab === 'story' && (
                        <div className="space-y-2 animate-in fade-in duration-300">
                          <p className="text-sm font-light text-[#e5e1d8] leading-relaxed">
                            {fragrance.olfactoryStory}
                          </p>
                          <p className="text-xs text-[#888680] mt-3">
                            Distilled in limited small-batch cycles to preserve the volatility of fragile natural oils.
                          </p>
                        </div>
                      )}

                      {activeTab === 'ingredients' && (
                        <div className="space-y-2 animate-in fade-in duration-300">
                          <p className="text-[11px] font-mono text-[#888680]">
                            {fragrance.ingredients}
                          </p>
                          <div className="pt-2 text-[11px] text-[#c8a97e] flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4" />
                            <span>100% IFRA Certified • Cruelty Free • Non-Staining Formula</span>
                          </div>
                        </div>
                      )}

                      {activeTab === 'shipping' && (
                        <div className="space-y-3 animate-in fade-in duration-300">
                          <div className="flex items-start gap-2.5">
                            <Truck className="w-4 h-4 text-[#c8a97e] mt-0.5" />
                            <div>
                              <p className="font-semibold text-[#f4efe6]">White-Glove Express Delivery Across India</p>
                              <p className="text-[#888680]">Delivered within 2–4 business days via insured express courier in climate-safe velvet box.</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2.5">
                            <RotateCcw className="w-4 h-4 text-[#c8a97e] mt-0.5" />
                            <div>
                              <p className="font-semibold text-[#f4efe6]">Complimentary 2ml Sample Vial Included</p>
                              <p className="text-[#888680]">Test the complimentary 2ml sample first before opening the main flacon. If it doesn’t suit your chemistry, return the unopened full bottle for a 100% refund or exchange.</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
