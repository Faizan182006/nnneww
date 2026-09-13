export interface Fragrance {
  id: string;
  name: string;
  tagline: string;
  concentration: string;
  size: string;
  sizesAvailable: string[];
  price: number;
  originalPrice?: number;
  category: string;
  family: 'Woody' | 'Floral' | 'Oud' | 'Amber' | 'Fresh';
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  longevity: string;
  sillage: string;
  occasion: string;
  gender: 'Unisex' | 'Masculine' | 'Feminine' | 'Genderless Signature';
  description: string;
  olfactoryStory: string;
  ingredients: string;
  image: string;
  gallery: string[];
  isBestseller?: boolean;
  isNew?: boolean;
  rating: number;
  reviewsCount: number;
  character: string;
}

export interface CartItem {
  fragrance: Fragrance;
  size: string;
  quantity: number;
}

export interface WhatsAppConfig {
  phoneNumber: string; // e.g., '918080695405'
  displayNumber: string;
}
