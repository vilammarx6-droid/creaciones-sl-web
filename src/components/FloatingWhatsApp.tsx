import React from 'react';
import { MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl } from '../utils/format';

interface FloatingWhatsAppProps {
  isHidden?: boolean;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ isHidden = false }) => {
  if (isHidden) return null;

  const whatsappUrl = buildWhatsAppUrl(
    'Hola Don Luis Alfredo, deseo consultar por la confección de un traje típico en Creaciones SL.'
  );

  return (
    <aside aria-label="Contacto flotante" className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center gap-3 pointer-events-none">
      {/* Tooltip on larger screens */}
      <div className="hidden lg:flex bg-white text-[#3A2312] px-3.5 py-2 rounded-2xl shadow-xl border border-[#E8DFD1] text-xs font-semibold items-center gap-2 pointer-events-auto">
        <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
        <span>¿Dudas con tus medidas? Chatea con Don Luis Alfredo</span>
      </div>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 sm:w-14 sm:h-14 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-110 active:scale-95 group relative pointer-events-auto shrink-0"
        title="Escribir al WhatsApp (953 515 047)"
        aria-label="Contactar a Don Luis Alfredo por WhatsApp"
      >
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white" />
      </a>
    </aside>
  );
};
