import React, { useState, useEffect } from 'react';
import { FRAGRANCES } from './data/fragrances';
import { Fragrance, CartItem } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCollection } from './components/ProductCollection';
import { BrandStory } from './components/BrandStory';
import { ProductModal } from './components/ProductModal';
import { OlfactoryBagDrawer } from './components/OlfactoryBagDrawer';
import { SearchModal } from './components/SearchModal';
import { FragranceQuizModal } from './components/FragranceQuizModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Footer } from './components/Footer';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('corridor_seven_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [selectedFragrance, setSelectedFragrance] = useState<Fragrance | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [addedFragranceId, setAddedFragranceId] = useState<string | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('corridor_seven_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save bag to local storage', e);
    }
  }, [cart]);

  const handleAddToCart = (fragrance: Fragrance, size: string, quantity: number) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.fragrance.id === fragrance.id && item.size === size
      );
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += quantity;
        return next;
      }
      return [...prev, { fragrance, size, quantity }];
    });

    setAddedFragranceId(fragrance.id);
    setTimeout(() => setAddedFragranceId(null), 2000);
  };

  const handleUpdateQuantity = (fragranceId: string, size: string, quantity: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.fragrance.id === fragranceId && item.size === size) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (fragranceId: string, size: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.fragrance.id === fragranceId && item.size === size)
      )
    );
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navOffset = 80;
      const elPos = el.getBoundingClientRect().top;
      const offsetPos = elPos + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPos,
        behavior: 'smooth',
      });
    }
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div id="app-root" className="min-h-screen bg-[#0b0c0e] text-[#e5e1d8] flex flex-col font-sans selection:bg-[#c8a97e] selection:text-[#0b0c0e]">
      
      {/* Top Floating Glassmorphic Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
      />

      {/* Main Experience */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          featuredFragrance={FRAGRANCES[0]}
          onExploreCollection={() => scrollToSection('collection')}
          onDiscoverBrand={() => scrollToSection('story')}
          onSelectProduct={(fragrance) => setSelectedFragrance(fragrance)}
        />

        {/* Product Catalogue Collection */}
        <ProductCollection
          fragrances={FRAGRANCES}
          onSelectProduct={(fragrance) => setSelectedFragrance(fragrance)}
          onAddToCart={handleAddToCart}
          addedFragranceId={addedFragranceId}
        />

        {/* Brand Story Editorial Section */}
        <BrandStory />
      </main>

      {/* Footer */}
      <Footer />

      {/* Product Detail Modal */}
      <ProductModal
        fragrance={selectedFragrance}
        onClose={() => setSelectedFragrance(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Olfactory Bag Slide-over Drawer */}
      <OlfactoryBagDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onExploreProducts={() => scrollToSection('collection')}
      />

      {/* Instant Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        fragrances={FRAGRANCES}
        onSelectProduct={(fragrance) => setSelectedFragrance(fragrance)}
      />

      {/* Signature Scent Finder Quiz */}
      <FragranceQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        fragrances={FRAGRANCES}
        onSelectProduct={(fragrance) => setSelectedFragrance(fragrance)}
      />

      {/* Floating WhatsApp Quick Order Button */}
      <FloatingWhatsApp />

    </div>
  );
}
