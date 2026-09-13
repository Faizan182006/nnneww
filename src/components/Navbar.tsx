import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, X, Sparkles, MessageCircle } from 'lucide-react';
import { generateQuickInquiryWhatsAppUrl } from '../utils/whatsapp';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenQuiz: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenSearch,
  onOpenQuiz,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#0b0c0e]/90 backdrop-blur-md py-3.5 border-b border-[#c8a97e]/15 shadow-2xl shadow-black/50'
          : 'bg-gradient-to-b from-[#0b0c0e]/95 via-[#0b0c0e]/60 to-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              id="mobile-menu-toggle-btn"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#e5e1d8] hover:text-[#c8a97e] transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <button
              id="mobile-search-btn"
              type="button"
              onClick={onOpenSearch}
              className="p-2 text-[#e5e1d8] hover:text-[#c8a97e] transition-colors ml-1"
              aria-label="Search perfumes"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Brand Logo / Identity */}
          <div className="flex-1 lg:flex-initial text-center lg:text-left">
            <a
              id="brand-home-link"
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('home');
              }}
              className="inline-block group text-left"
            >
              <div className="flex items-center gap-2">
                <span className="font-heading text-xl sm:text-2xl tracking-[0.25em] font-semibold text-[#f4efe6] group-hover:text-[#c8a97e] transition-colors">
                  CORRIDOR SEVEN
                </span>
              </div>
              <p className="text-[9px] tracking-[0.35em] uppercase text-[#c8a97e] font-light">
                Haute Parfumerie
              </p>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            <button
              id="nav-link-home"
              onClick={() => scrollToSection('home')}
              className="text-xs tracking-[0.2em] uppercase text-[#e5e1d8]/80 hover:text-[#c8a97e] transition-colors font-medium py-1 relative group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#c8a97e] transition-all duration-300 group-hover:w-full" />
            </button>
            <button
              id="nav-link-shop"
              onClick={() => scrollToSection('collection')}
              className="text-xs tracking-[0.2em] uppercase text-[#e5e1d8]/80 hover:text-[#c8a97e] transition-colors font-medium py-1 relative group"
            >
              Shop Collection
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#c8a97e] transition-all duration-300 group-hover:w-full" />
            </button>
            <button
              id="nav-link-notes"
              onClick={() => scrollToSection('notes-guide')}
              className="text-xs tracking-[0.2em] uppercase text-[#e5e1d8]/80 hover:text-[#c8a97e] transition-colors font-medium py-1 relative group"
            >
              Olfactory Notes
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#c8a97e] transition-all duration-300 group-hover:w-full" />
            </button>
            <button
              id="nav-link-story"
              onClick={() => scrollToSection('story')}
              className="text-xs tracking-[0.2em] uppercase text-[#e5e1d8]/80 hover:text-[#c8a97e] transition-colors font-medium py-1 relative group"
            >
              Brand Story
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#c8a97e] transition-all duration-300 group-hover:w-full" />
            </button>
            <button
              id="nav-link-finder"
              onClick={onOpenQuiz}
              className="inline-flex items-center gap-1.5 text-xs tracking-[0.2em] uppercase text-[#c8a97e] hover:text-[#e6d3b4] transition-colors font-medium py-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Scent Finder
            </button>
            <button
              id="nav-link-contact"
              onClick={() => scrollToSection('contact')}
              className="text-xs tracking-[0.2em] uppercase text-[#e5e1d8]/80 hover:text-[#c8a97e] transition-colors font-medium py-1 relative group"
            >
              Concierge
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#c8a97e] transition-all duration-300 group-hover:w-full" />
            </button>
          </nav>

          {/* Right Action Icons & CTAs */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Desktop Search */}
            <button
              id="nav-search-desktop-btn"
              type="button"
              onClick={onOpenSearch}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs text-[#9e9b94] hover:text-[#e5e1d8] bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 transition-all"
              aria-label="Search perfume collection"
            >
              <Search className="w-3.5 h-3.5 text-[#c8a97e]" />
              <span className="text-[11px] tracking-wider">Search scents...</span>
            </button>

            {/* Shopping Bag Button */}
            <button
              id="nav-cart-btn"
              type="button"
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full text-[#e5e1d8] hover:text-[#c8a97e] hover:bg-white/[0.05] transition-all"
              aria-label="View shopping bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#c8a97e] text-[#0b0c0e] text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Shop Now Primary Button */}
            <button
              id="nav-shop-now-cta-btn"
              type="button"
              onClick={() => scrollToSection('collection')}
              className="hidden sm:inline-flex items-center justify-center px-5 py-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#0b0c0e] bg-gradient-to-r from-[#c8a97e] via-[#dfc8a5] to-[#c8a97e] hover:from-[#dfc8a5] hover:to-[#c8a97e] transition-all duration-300 rounded-sm shadow-md hover:shadow-[#c8a97e]/20"
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="lg:hidden bg-[#0e1012] border-b border-[#c8a97e]/20 px-6 py-8 shadow-2xl transition-all animate-in fade-in slide-in-from-top-4 duration-300"
        >
          <nav className="flex flex-col space-y-5">
            <button
              onClick={() => scrollToSection('home')}
              className="text-left text-sm tracking-[0.25em] uppercase text-[#f4efe6] hover:text-[#c8a97e] transition-colors py-1"
            >
              01. Home
            </button>
            <button
              onClick={() => scrollToSection('collection')}
              className="text-left text-sm tracking-[0.25em] uppercase text-[#f4efe6] hover:text-[#c8a97e] transition-colors py-1"
            >
              02. The Fragrance Collection
            </button>
            <button
              onClick={() => scrollToSection('notes-guide')}
              className="text-left text-sm tracking-[0.25em] uppercase text-[#f4efe6] hover:text-[#c8a97e] transition-colors py-1"
            >
              03. Olfactory Notes Guide
            </button>
            <button
              onClick={() => scrollToSection('story')}
              className="text-left text-sm tracking-[0.25em] uppercase text-[#f4efe6] hover:text-[#c8a97e] transition-colors py-1"
            >
              04. Brand Story: More Than A Fragrance
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuiz();
              }}
              className="text-left text-sm tracking-[0.25em] uppercase text-[#c8a97e] hover:text-[#e6d3b4] transition-colors py-1 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              05. Find Your Signature Scent
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-left text-sm tracking-[0.25em] uppercase text-[#f4efe6] hover:text-[#c8a97e] transition-colors py-1"
            >
              06. Bespoke Concierge
            </button>
            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <a
                href={generateQuickInquiryWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] text-xs font-semibold tracking-wider uppercase rounded-sm hover:bg-[#25D366]/30 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Consultation
              </a>
              <button
                onClick={() => scrollToSection('collection')}
                className="w-full py-3 px-4 bg-[#c8a97e] text-[#0b0c0e] text-xs font-bold tracking-[0.2em] uppercase rounded-sm hover:bg-[#dfc8a5] transition-all"
              >
                Explore Catalogue
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
