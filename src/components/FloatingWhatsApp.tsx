import React from 'react';
import { MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl } from '../utils/format';

export const FloatingWhatsApp: React.FC = () => {
  const whatsappUrl = buildWhatsAppUrl(
    'Hola Don Luis Alfredo, deseo consultar por la confección de un traje típico en Creaciones SL.'
  );

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Tooltip on larger screens */}
      <div className="hidden md:flex bg-white text-[#3A2312] px-3.5 py-2 rounded-2xl shadow-xl border border-[#E8DFD1] text-xs font-semibold items-center gap-2 animate-bounce">
        <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
        <span>¿Dudas con tus medidas o pedidos? Chatea con Don Luis Alfredo</span>
      </div>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-110 active:scale-95 group relative"
        title="Escribir al WhatsApp"
        aria-label="Contactar a Don Luis Alfredo por WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white" />
      </a>
    </div>
  );
};
