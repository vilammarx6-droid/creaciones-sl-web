import React from 'react';
import { MapPin, Phone, Truck } from 'lucide-react';
import { LOGO_IMAGE, MASTER_ARTISAN, WORKSHOP_LOCATION, WHATSAPP_DISPLAY } from '../data/products';
import { CategoryId } from '../types';

interface FooterProps {
  onSelectCategory: (category: CategoryId) => void;
  onOpenTailoringGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onOpenTailoringGuide }) => {
  return (
    <footer className="bg-[#3A2312] text-[#FAFAF7] pt-12 pb-8 border-t-4 border-[#C49A2C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-[#FAFAF7]/15 text-xs">
        {/* Col 1: Brand & Master info */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full overflow-hidden border border-[#C49A2C] bg-white p-0.5">
              <img
                src={LOGO_IMAGE}
                alt="Logo SL"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-serif text-lg font-bold text-[#FFFDF9]">
              Creaciones SL
            </span>
          </div>
          <p className="text-[#FAFAF7]/75 leading-relaxed">
            Taller de confección y bordado andino tradicional de Chumbivilcas y Livitaca. Maestría, identidad y autenticidad en cada pieza.
          </p>
          <p className="text-[11px] text-[#C49A2C] font-semibold">
            Maestro: {MASTER_ARTISAN}
          </p>
        </div>

        {/* Col 2: Quick Links */}
        <div className="space-y-2">
          <h4 className="font-serif text-sm font-bold text-[#FFFDF9] uppercase tracking-wider">
            Enlaces Rápidos
          </h4>
          <ul className="space-y-1.5 text-[#FAFAF7]/80">
            <li>
              <button
                onClick={() => {
                  onSelectCategory('chalecos');
                  const el = document.getElementById('catalogo-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-[#C49A2C] transition cursor-pointer text-left"
              >
                Chalecos de Q'orilazo
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  onSelectCategory('polleras');
                  const el = document.getElementById('catalogo-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-[#C49A2C] transition cursor-pointer text-left"
              >
                Chaquetillas y Polleras
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  onSelectCategory('comparsas');
                  const el = document.getElementById('catalogo-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-[#C49A2C] transition cursor-pointer text-left"
              >
                Trajes para Comparsas
              </button>
            </li>
            <li>
              <button
                onClick={onOpenTailoringGuide}
                className="hover:text-[#C49A2C] transition cursor-pointer text-left"
              >
                Guía de Medidas Corporales
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Workshop Contact & Delivery */}
        <div className="space-y-2">
          <h4 className="font-serif text-sm font-bold text-[#FFFDF9] uppercase tracking-wider">
            Atención y Pedidos
          </h4>
          <ul className="space-y-2 text-[#FAFAF7]/80">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-[#C49A2C] shrink-0 mt-0.5" />
              <span>Taller Principal: {WORKSHOP_LOCATION}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#C49A2C] shrink-0" />
              <span>{WHATSAPP_DISPLAY}</span>
            </li>
            <li className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#C49A2C] shrink-0" />
              <span>Envíos a Cusco, Arequipa, Lima y todo el Perú</span>
            </li>
          </ul>
        </div>

        {/* Col 4: Payment Methods */}
        <div className="space-y-3">
          <h4 className="font-serif text-sm font-bold text-[#FFFDF9] uppercase tracking-wider">
            Métodos de Pago
          </h4>
          <p className="text-[#FAFAF7]/75 text-[11px]">
            Aceptamos pagos directos y adelantos del 50%:
          </p>
          <div className="flex flex-wrap gap-2 text-xs font-bold text-[#3A2312]">
            <span className="bg-white px-2.5 py-1 rounded shadow-xs text-[#742284]">Yape</span>
            <span className="bg-white px-2.5 py-1 rounded shadow-xs text-[#00a8a8]">Plin</span>
            <span className="bg-white px-2.5 py-1 rounded shadow-xs text-[#002a61]">BCP</span>
            <span className="bg-white px-2.5 py-1 rounded shadow-xs text-[#bd1c1c]">B. Nación</span>
            <span className="bg-white px-2.5 py-1 rounded shadow-xs text-[#0079c1]">Visa/Master</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#FAFAF7]/60 gap-2">
        <p>© 2026 Creaciones SL - Todos los derechos reservados. Orgullo de Livitaca, Cusco.</p>
        <p className="flex items-center gap-1">Hecho con respeto por la tradición textil andina.</p>
      </div>
    </footer>
  );
};
