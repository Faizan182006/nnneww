import { Fragrance, CartItem } from '../types';

export const DEFAULT_WHATSAPP_NUMBER = '918080695405';
export const DISPLAY_WHATSAPP_NUMBER = '+91 80806 95405';

/**
 * Format price in Indian Rupee format (e.g. ₹2,499)
 */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Generates the WhatsApp URL for a single product purchase
 */
export function generateBuyNowWhatsAppUrl(
  product: Fragrance,
  selectedSize: string = product.size,
  quantity: number = 1,
  phoneNumber: string = DEFAULT_WHATSAPP_NUMBER
): string {
  // Calculate price if size has variant pricing
  let finalPrice = product.price;
  if (selectedSize === '50ml' && product.size === '100ml') {
    finalPrice = Math.round(product.price * 0.7);
  } else if (selectedSize === '100ml' && product.size === '50ml') {
    finalPrice = Math.round(product.price * 1.4);
  }

  const formattedPrice = formatINR(finalPrice * quantity);
  const singleUnitPrice = formatINR(finalPrice);

  const message = [
    `Hello! I’m interested in purchasing:`,
    ``,
    `*Product:* ${product.name}`,
    `*Size:* ${selectedSize}`,
    `*Price:* ${quantity > 1 ? `${formattedPrice} (${singleUnitPrice} x ${quantity})` : singleUnitPrice}`,
    `*Fragrance:* ${product.category}`,
    `*Quantity:* ${quantity}`,
    ``,
    `Please share the availability and order details.`
  ].join('\n');

  const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Generates the WhatsApp URL for floating quick inquiry
 */
export function generateQuickInquiryWhatsAppUrl(
  phoneNumber: string = DEFAULT_WHATSAPP_NUMBER
): string {
  const message = `Hello! I’d like to know more about your perfume collection.`;
  const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Generates WhatsApp URL for bespoke perfume consultation
 */
export function generateConsultationWhatsAppUrl(
  preferredFamily?: string,
  phoneNumber: string = DEFAULT_WHATSAPP_NUMBER
): string {
  const message = preferredFamily
    ? `Hello Corridor seven! I would like a bespoke fragrance consultation. I am drawn towards ${preferredFamily} scents and would appreciate your perfumer's recommendation.`
    : `Hello Corridor seven! I would like a bespoke fragrance consultation to find my signature scent.`;
  const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Generates WhatsApp URL for entire shopping bag / multiple items
 */
export function generateCartWhatsAppUrl(
  items: CartItem[],
  phoneNumber: string = DEFAULT_WHATSAPP_NUMBER
): string {
  if (items.length === 0) {
    return generateQuickInquiryWhatsAppUrl(phoneNumber);
  }

  const itemsList = items
    .map((item, idx) => {
      return `${idx + 1}. *${item.fragrance.name}* (${item.size})\n   Qty: ${item.quantity} | Total: ${formatINR(item.fragrance.price * item.quantity)}`;
    })
    .join('\n\n');

  const totalAmount = items.reduce(
    (sum, item) => sum + item.fragrance.price * item.quantity,
    0
  );

  const message = [
    `Hello Corridor seven! I’d like to place an order for the following fragrances:`,
    ``,
    itemsList,
    ``,
    `*Total Order Value:* ${formatINR(totalAmount)}`,
    ``,
    `Please confirm stock availability, delivery timeline, and payment link.`
  ].join('\n');

  const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}
