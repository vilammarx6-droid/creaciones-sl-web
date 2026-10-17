import React from 'react';
import { Sparkles, CheckCircle2, Ruler, ShieldCheck, Package, Scissors } from 'lucide-react';
import { LOGO_IMAGE, MASTER_ARTISAN } from '../data/products';

interface HeroProps {
  onOpenTailoringGuide: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTailoringGuide }) => {
  return (
    <section className="relative bg-gradient-to-r from-[#3A2312] via-[#4e2e18] to-[#3A2312] text-[#FAFAF7] py-12 px-4 sm:px-6 lg:px-8 border-b-4 border-[#C49A2C] overflow-hidden">
      {/* Decorative background watermark */}
      <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-end select-none">
        <img
          src={LOGO_IMAGE}
          alt=""
          className="w-[480px] h-[480px] object-contain translate-x-28"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Headlines & Highlights */}
        <div className="lg:col-span-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C49A2C]/20 border border-[#C49A2C]/40 text-[#E8BC4C] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Alta Costura Chumbivilcana & Livitaca</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#FFFDF9] leading-tight">
            El Arte y la Fuerza de la{' '}
            <span className="text-[#C49A2C]">Tradición Chumbivilcana</span>
          </h1>

          <p className="text-[#FAFAF7]/85 text-sm sm:text-base max-w-2xl leading-relaxed">
            Taller artesanal de <strong>{MASTER_ARTISAN}</strong>. Confeccionamos con orgullo chalecos de q'orilazo en alto relieve, chaquetillas de gala, polleras de alta puntada y trajes a medida para fiestas patronales, Takanakuy y aniversarios.
          </p>

          {/* Highlights Bar */}
          <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="flex items-center gap-2 bg-black/20 p-2.5 rounded-lg border border-[#C49A2C]/20 backdrop-blur-xs">
              <CheckCircle2 className="w-4 h-4 text-[#C49A2C] shrink-0" />
              <span>Bordado 100% Auténtico</span>
            </div>
            <div className="flex items-center gap-2 bg-black/20 p-2.5 rounded-lg border border-[#C49A2C]/20 backdrop-blur-xs">
              <Ruler className="w-4 h-4 text-[#C49A2C] shrink-0" />
              <span>Confección a Medida</span>
            </div>
            <div className="flex items-center gap-2 bg-black/20 p-2.5 rounded-lg border border-[#C49A2C]/20 backdrop-blur-xs">
              <ShieldCheck className="w-4 h-4 text-[#C49A2C] shrink-0" />
              <span>Adelanto 50% de inicio</span>
            </div>
            <div className="flex items-center gap-2 bg-black/20 p-2.5 rounded-lg border border-[#C49A2C]/20 backdrop-blur-xs">
              <Package className="w-4 h-4 text-[#C49A2C] shrink-0" />
              <span>Envíos Shalom & Olva</span>
            </div>
          </div>
        </div>

        {/* Right Column: Custom Tailoring Feature Box */}
        <div className="lg:col-span-4 bg-[#FFFDF9]/10 backdrop-blur-md p-6 rounded-2xl border border-[#C49A2C]/30 text-center space-y-4 shadow-xl">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#C49A2C]/20 flex items-center justify-center border-2 border-[#C49A2C] text-[#C49A2C]">
            <Scissors className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-lg font-bold text-[#FFFDF9]">
            ¿Necesitas un traje a tu talla exacta?
          </h2>
          <p className="text-xs text-[#FAFAF7]/80 leading-relaxed">
            Personaliza tela, hilos dorados, matices florales y medidas corporales para tu festividad.
          </p>
          <button
            onClick={onOpenTailoringGuide}
            className="w-full py-3 px-4 rounded-xl bg-[#C49A2C] hover:bg-[#E8BC4C] text-[#261509] font-bold text-sm tracking-wide shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Ruler className="w-4 h-4" />
            <span>Solicitar Pedido a Medida</span>
          </button>
        </div>
      </div>
    </section>
  );
};
