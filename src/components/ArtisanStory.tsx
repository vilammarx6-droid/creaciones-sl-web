import React from 'react';
import { EMBROIDERY_IMAGE_ALT, MASTER_ARTISAN } from '../data/products';

export const ArtisanStory: React.FC = () => {
  return (
    <section className="bg-[#F2EDE4]/70 border-t border-b border-[#E8DFD1] py-14 px-4 sm:px-6 lg:px-8 mt-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left: Workshop Image Showcase */}
        <div className="lg:col-span-5 relative">
          <div className="rounded-2xl overflow-hidden border-4 border-white shadow-xl aspect-4/3 relative bg-[#3A2312]">
            <img
              src={EMBROIDERY_IMAGE_ALT}
              alt="Bordado Creaciones SL"
              className="w-full h-full object-contain p-6 bg-[#f7f2eb]"
            />
            <div className="absolute bottom-3 left-3 right-3 bg-[#3A2312]/90 backdrop-blur-md p-3 rounded-xl border border-[#C49A2C]/30 text-white text-xs">
              <p className="font-serif font-bold text-[#C49A2C]">
                Maestro {MASTER_ARTISAN}
              </p>
              <p className="text-[11px] text-[#FAFAF7]/80">
                Livitaca, Chumbivilcas — Custodio del bordado de alto relieve
              </p>
            </div>
          </div>
        </div>

        {/* Right: Narrative & Guarantees */}
        <div className="lg:col-span-7 space-y-4">
          <span className="text-xs font-bold text-[#A85A28] uppercase tracking-widest">
            Identidad y Tradición Viva
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#3A2312]">
            Cada puntada lleva el latido y coraje de la tierra de Livitaca
          </h2>
          <p className="text-xs sm:text-sm text-[#3A2312]/85 leading-relaxed">
            En el taller de <strong>Creaciones SL</strong> en Livitaca, la confección no es una producción en serie; es un ritual de paciencia y devoción. Los chalecos de Q'orilazo reflejan la fuerza del jinete andino mediante hilos dorados, cobrizos y figuras estilizadas de aves y flora andina.
          </p>
          <p className="text-xs sm:text-sm text-[#3A2312]/85 leading-relaxed">
            Atendemos pedidos personales para comparsas, conjuntos de danzas cusqueñas, asociaciones de residentes chumbivilcanos en Lima, Arequipa y el extranjero.
          </p>

          <div className="pt-3 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#C49A2C]/20 flex items-center justify-center text-[#9A741B] font-bold text-sm">
                +15
              </div>
              <div className="text-xs">
                <p className="font-bold text-[#3A2312]">Años de Maestría</p>
                <p className="text-[11px] text-[#3A2312]/70">En Livitaca y Chumbivilcas</p>
              </div>
            </div>

            <div className="h-8 w-px bg-[#E8DFD1]" />

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#C49A2C]/20 flex items-center justify-center text-[#9A741B] font-bold text-sm">
                100%
              </div>
              <div className="text-xs">
                <p className="font-bold text-[#3A2312]">Garantía Artesanal</p>
                <p className="text-[11px] text-[#3A2312]/70">Telas de lana y paño de primera</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
