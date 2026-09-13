import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MessageCircle, Trash2, Plus, Minus, ShieldCheck, Gift, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';
import { formatINR, generateCartWhatsAppUrl, DEFAULT_WHATSAPP_NUMBER } from '../utils/whatsapp';

interface OlfactoryBagDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (fragranceId: string, size: string, quantity: number) => void;
  onRemoveItem: (fragranceId: string, size: string) => void;
  onExploreProducts: () => void;
}

export const OlfactoryBagDrawer: React.FC<OlfactoryBagDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onExploreProducts,
}) => {
  const totalAmount = items.reduce(
    (sum, item) => sum + item.fragrance.price * item.quantity,
    0
  );

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckoutWhatsApp = () => {
    const url = generateCartWhatsAppUrl(items, DEFAULT_WHATSAPP_NUMBER);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          id="cart-drawer-container"
          className="fixed inset-0 z-50 overflow-hidden"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="w-screen max-w-md bg-[#101214] border-l border-[#c8a97e]/20 shadow-2xl flex flex-col justify-between"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#0e1012]">
                <div>
                  <h3 className="font-heading text-lg font-medium tracking-wide text-[#f4efe6]">
                    Your Olfactory Bag
                  </h3>
                  <p className="text-[11px] text-[#c8a97e] tracking-widest uppercase font-light">
                    {totalQuantity} {totalQuantity === 1 ? 'Flacon' : 'Flacons'} Selected
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 text-[#888680] hover:text-[#f4efe6] rounded-full hover:bg-white/5 transition-colors"
                  aria-label="Close bag"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items List */}
              <div className="p-6 overflow-y-auto flex-1 space-y-4 custom-scrollbar">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-16">
                    <div className="w-16 h-16 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center text-[#888680] mb-4">
                      <Gift className="w-8 h-8 text-[#c8a97e]/60" />
                    </div>
                    <h4 className="font-heading text-lg text-[#f4efe6] mb-1">
                      Your bag is empty
                    </h4>
                    <p className="text-xs text-[#888680] max-w-xs mb-6 font-light">
                      Discover our handcrafted extraits and select your signature olfactory silhouette.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onExploreProducts();
                      }}
                      className="px-6 py-2.5 bg-[#c8a97e] hover:bg-[#dfc8a5] text-[#0b0c0e] text-xs font-semibold tracking-[0.2em] uppercase rounded-sm transition-all"
                    >
                      Explore Fragrances
                    </button>
                  </div>
                ) : (
                  items.map((item) => (
                    <div
                      key={`${item.fragrance.id}-${item.size}`}
                      className="p-4 rounded-xl bg-[#15181b] border border-white/5 flex gap-4 items-center justify-between"
                    >
                      <div className="w-16 h-20 rounded-lg overflow-hidden bg-black/50 border border-white/10 flex-shrink-0">
                        <img
                          src={item.fragrance.image}
                          alt={item.fragrance.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-heading text-sm font-medium text-[#f4efe6] truncate">
                            {item.fragrance.name}
                          </h4>
                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.fragrance.id, item.size)}
                            className="text-[#888680] hover:text-red-400 p-1 transition-colors"
                            title="Remove flacon"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <p className="text-[10px] text-[#c8a97e] uppercase tracking-wider mb-1">
                          {item.fragrance.category} • {item.size}
                        </p>
                        <p className="text-xs font-medium text-[#e5e1d8]">
                          {formatINR(item.fragrance.price * item.quantity)}
                        </p>

                        {/* Quantity controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <div className="inline-flex items-center border border-white/10 rounded bg-[#0b0c0e] px-1 py-0.5">
                            <button
                              type="button"
                              onClick={() =>
                                onUpdateQuantity(
                                  item.fragrance.id,
                                  item.size,
                                  Math.max(1, item.quantity - 1)
                                )
                              }
                              className="p-1 text-[#888680] hover:text-[#f4efe6]"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-[11px] font-bold text-[#f4efe6] font-mono">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                onUpdateQuantity(
                                  item.fragrance.id,
                                  item.size,
                                  item.quantity + 1
                                )
                              }
                              className="p-1 text-[#888680] hover:text-[#f4efe6]"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Checkout Actions & Footer */}
              {items.length > 0 && (
                <div className="p-6 border-t border-white/10 bg-[#0e1012] space-y-4">
                  {/* Complimentary Perks */}
                  <div className="p-3 rounded-lg bg-[#15181b] border border-white/5 text-[11px] text-[#d5d1c8] space-y-1">
                    <div className="flex items-center gap-2 text-[#c8a97e]">
                      <Gift className="w-3.5 h-3.5" />
                      <span className="font-semibold uppercase tracking-wider text-[10px]">
                        Included With Your Order
                      </span>
                    </div>
                    <p className="text-[#888680]">
                      • Custom Corridor seven embossed rigid presentation box
                    </p>
                    <p className="text-[#888680]">
                      • Complimentary 2ml matching sample vial for skin-chemistry test
                    </p>
                  </div>

                  {/* Subtotal */}
                  <div className="flex items-baseline justify-between pt-2">
                    <span className="text-xs uppercase tracking-[0.2em] text-[#888680]">
                      Order Value
                    </span>
                    <span className="font-heading text-2xl font-medium text-[#f4efe6]">
                      {formatINR(totalAmount)}
                    </span>
                  </div>

                  {/* WhatsApp Direct Buy Now Button */}
                  <button
                    type="button"
                    id="bag-checkout-whatsapp-btn"
                    onClick={handleCheckoutWhatsApp}
                    className="w-full py-4 px-6 rounded-md bg-gradient-to-r from-[#25D366] to-[#1ebe5b] hover:from-[#28e16d] hover:to-[#22cf64] text-white font-bold text-xs tracking-[0.2em] uppercase transition-all shadow-xl shadow-[#25D366]/20 flex items-center justify-center gap-2.5 group"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Order All Via WhatsApp ({formatINR(totalAmount)})</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <div className="text-center">
                    <span className="text-[10px] text-[#888680] flex items-center justify-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#c8a97e]" />
                      Direct WhatsApp Order with Verified Brand Agent
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
