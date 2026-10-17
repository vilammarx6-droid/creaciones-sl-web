import React from 'react';
import { Truck, MessageCircle } from 'lucide-react';
import { WHATSAPP_DISPLAY, MASTER_ARTISAN } from '../data/products';
import { buildWhatsAppUrl } from '../utils/format';

export const AnnouncementBar: React.FC = () => {
  const whatsappUrl = buildWhatsAppUrl(
    'Hola Don Luis Alfredo, deseo consultar por los trajes típicos de Creaciones SL.'
  );

  return (
    <div className="bg-[#3A2312] text-[#FAFAF7] py-2 px-4 text-xs font-medium border-b border-[#C49A2C]/30">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-[#C49A2C] text-[#261509] uppercase tracking-wider">
            Artesanía de Livitaca
          </span>
          <span>Auténticos trajes de gala y Q'orilazo confeccionados por {MASTER_ARTISAN}</span>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-[#C49A2C]" />
            <span>Envíos por Shalom, Marvisur y Olva a todo el Perú</span>
          </span>
          <div className="hidden sm:block h-3 w-px bg-[#FAFAF7]/20" />
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[#C49A2C] hover:text-[#E8BC4C] transition font-semibold"
          >
            <MessageCircle className="w-3.5 h-3.5" /> {WHATSAPP_DISPLAY}
          </a>
        </div>
      </div>
    </div>
  );
};
