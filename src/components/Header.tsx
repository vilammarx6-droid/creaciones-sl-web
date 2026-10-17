import React, { useState } from 'react';
import { ShoppingBag, Scissors, MessageCircle, Menu, X } from 'lucide-react';
import { CategoryId, Currency } from '../types';
import { LOGO_IMAGE, WHATSAPP_DISPLAY } from '../data/products';
import { buildWhatsAppUrl } from '../utils/format';

interface HeaderProps {
  activeCategory: CategoryId;
  onSelectCategory: (category: CategoryId) => void;
  currency: Currency;
  onToggleCurrency: (currency: Currency) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenTailoringGuide: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeCategory,
  onSelectCategory,
  currency,
  onToggleCurrency,
  cartCount,
  onOpenCart,
  onOpenTailoringGuide,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const quickWhatsappUrl = buildWhatsAppUrl(
    'Hola Don Luis Alfredo, deseo consultar por un traje de Creaciones SL.'
  );

  const navItems: { label: string; category: CategoryId }[] = [
    { label: 'Todo el Catálogo', category: 'all' },
    { label: "Chalecos Q'orilazo", category: 'chalecos' },
    { label: 'Polleras y Chaquetillas', category: 'polleras' },
    { label: 'Comparsas & Danzas', category: 'comparsas' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF9]/95 backdrop-blur-md border-b border-[#E8DFD1] shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* BRAND LOGO */}
        <div className="flex items-center min-w-0">
          <button
            onClick={() => {
              onSelectCategory('all');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 sm:gap-3 text-left group min-w-0"
          >
            <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-[#C49A2C] shadow-xs bg-white p-0.5 group-hover:scale-105 transition-transform duration-200 shrink-0">
              <img
                src={LOGO_IMAGE}
                alt="Creaciones SL Ave Bordada"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-serif text-base sm:text-2xl font-bold tracking-tight text-[#3A2312] leading-tight truncate">
                Creaciones <span className="text-[#C49A2C]">SL</span>
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-wider uppercase font-semibold text-[#A85A28] truncate block max-w-[140px] xs:max-w-[200px] sm:max-w-none">
                Trajes Típicos • Livitaca
              </span>
            </div>
          </button>
        </div>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-sm font-medium">
          {navItems.map((item) => {
            const isActive = activeCategory === item.category;
            return (
              <button
                key={item.category}
                onClick={() => {
                  onSelectCategory(item.category);
                  const el = document.getElementById('catalogo-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`transition pb-1 border-b-2 font-medium cursor-pointer ${
                  isActive
                    ? 'text-[#C49A2C] border-[#C49A2C] font-bold'
                    : 'text-[#3A2312] hover:text-[#C49A2C] border-transparent'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          
          <button
            onClick={onOpenTailoringGuide}
            className="text-[#A85A28] hover:text-[#8C3D15] font-semibold flex items-center gap-1.5 transition pb-1 cursor-pointer"
          >
            <Scissors className="w-4 h-4" /> Confección a Medida
          </button>
        </nav>

        {/* ACTIONS & CURRENCY & CART */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* CURRENCY SELECTOR */}
          <div className="relative inline-block text-xs">
            <select
              value={currency}
              onChange={(e) => onToggleCurrency(e.target.value as Currency)}
              aria-label="Seleccionar moneda"
              className="bg-[#F2EDE4]/90 border border-[#E8DFD1] rounded-lg px-1.5 sm:px-2.5 py-1 sm:py-1.5 font-semibold text-[#3A2312] text-[11px] sm:text-xs focus:outline-none focus:ring-1 focus:ring-[#C49A2C] cursor-pointer"
            >
              <option value="PEN">S/ (PEN)</option>
              <option value="USD">$ (USD)</option>
            </select>
          </div>

          {/* WHATSAPP CTA QUICK BUTTON (visible on tablet/desktop) */}
          <a
            href={quickWhatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20ba59] text-white px-3 py-1.5 sm:py-2 rounded-xl text-xs font-bold shadow-xs transition-transform active:scale-95 shrink-0"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span className="hidden xl:inline">Pedir: 953 515 047</span>
            <span className="xl:hidden">953 515 047</span>
          </a>

          {/* CART BUTTON */}
          <button
            onClick={onOpenCart}
            aria-label="Abrir bolsa de compras"
            className="relative p-2 sm:p-2.5 rounded-xl bg-[#F2EDE4] hover:bg-[#E8DFD1] transition-colors flex items-center justify-center text-[#3A2312] border border-[#E8DFD1]/80 group cursor-pointer shrink-0"
          >
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 group-hover:text-[#C49A2C] transition-colors" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#C49A2C] text-[#261509] text-[10px] sm:text-[11px] font-extrabold min-w-4 sm:min-w-5 h-4 sm:h-5 px-1 rounded-full flex items-center justify-center border-2 border-[#FFFDF9] shadow-xs">
                {cartCount}
              </span>
            )}
          </button>

          {/* MOBILE MENU TOGGLE */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 sm:p-2 rounded-lg text-[#3A2312] hover:bg-[#F2EDE4] cursor-pointer shrink-0"
            aria-label="Abrir menú de navegación"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E8DFD1] bg-[#FFFDF9] px-4 py-3 space-y-2 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
          {navItems.map((item) => (
            <button
              key={item.category}
              onClick={() => {
                onSelectCategory(item.category);
                setMobileMenuOpen(false);
                const el = document.getElementById('catalogo-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-semibold cursor-pointer ${
                activeCategory === item.category
                  ? 'bg-[#F2EDE4] text-[#C49A2C]'
                  : 'text-[#3A2312] hover:bg-[#F2EDE4]/60'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => {
              onOpenTailoringGuide();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-[#A85A28] hover:bg-[#F2EDE4]/60 flex items-center gap-2 cursor-pointer"
          >
            <Scissors className="w-4 h-4" /> Confección a Medida
          </button>
          <div className="pt-2 border-t border-[#E8DFD1]/60">
            <a
              href={quickWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] text-white py-2.5 rounded-xl text-xs font-bold shadow-xs active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Pedir por WhatsApp: {WHATSAPP_DISPLAY}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
