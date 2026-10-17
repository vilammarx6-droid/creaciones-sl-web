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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* BRAND LOGO */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              onSelectCategory('all');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 text-left group"
          >
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#C49A2C] shadow-xs bg-white p-0.5 group-hover:scale-105 transition-transform duration-200">
              <img
                src={LOGO_IMAGE}
                alt="Creaciones SL Ave Bordada"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#3A2312] leading-none">
                Creaciones <span className="text-[#C49A2C]">SL</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-[#A85A28] mt-1">
                Trajes Típicos • Livitaca, Chumbivilcas
              </span>
            </div>
          </button>
        </div>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
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
                className={`transition pb-1 border-b-2 font-medium ${
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
            className="text-[#A85A28] hover:text-[#8C3D15] font-semibold flex items-center gap-1.5 transition pb-1"
          >
            <Scissors className="w-4 h-4" /> Confección a Medida
          </button>
        </nav>

        {/* ACTIONS & CURRENCY & CART */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* CURRENCY SELECTOR */}
          <div className="relative inline-block text-xs">
            <select
              value={currency}
              onChange={(e) => onToggleCurrency(e.target.value as Currency)}
              className="bg-[#F2EDE4]/80 border border-[#E8DFD1] rounded-lg px-2.5 py-1.5 font-semibold text-[#3A2312] focus:outline-none focus:ring-1 focus:ring-[#C49A2C] cursor-pointer"
            >
              <option value="PEN">PEN (S/)</option>
              <option value="USD">USD ($)</option>
            </select>
          </div>

          {/* WHATSAPP CTA QUICK BUTTON */}
          <a
            href={quickWhatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-xs transition-transform active:scale-95"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Pedir: 953 515 047</span>
          </a>

          {/* CART BUTTON */}
          <button
            onClick={onOpenCart}
            aria-label="Abrir bolsa de compras"
            className="relative p-2.5 rounded-xl bg-[#F2EDE4] hover:bg-[#E8DFD1] transition-colors flex items-center justify-center text-[#3A2312] border border-[#E8DFD1]/80 group cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5 group-hover:text-[#C49A2C] transition-colors" />
            <span className="absolute -top-1.5 -right-1.5 bg-[#C49A2C] text-[#261509] text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#FFFDF9] shadow-xs">
              {cartCount}
            </span>
          </button>

          {/* MOBILE MENU TOGGLE */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#3A2312] hover:bg-[#F2EDE4]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E8DFD1] bg-[#FFFDF9] px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.category}
              onClick={() => {
                onSelectCategory(item.category);
                setMobileMenuOpen(false);
                const el = document.getElementById('catalogo-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-semibold ${
                activeCategory === item.category
                  ? 'bg-[#F2EDE4] text-[#C49A2C]'
                  : 'text-[#3A2312]'
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
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-[#A85A28] flex items-center gap-2"
          >
            <Scissors className="w-4 h-4" /> Confección a Medida
          </button>
          <div className="pt-2">
            <a
              href={quickWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-[#25D366] text-white py-2.5 rounded-xl text-xs font-bold shadow-xs"
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
