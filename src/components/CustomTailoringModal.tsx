import React from 'react';
import { X, Ruler, MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl } from '../utils/format';

interface CustomTailoringModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CustomTailoringModal: React.FC<CustomTailoringModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const whatsappAdviceUrl = buildWhatsAppUrl(
    'Hola Don Luis Alfredo, deseo asesoría personalizada para tomar mis medidas para un traje típico de Creaciones SL.'
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-[#E8DFD1] shadow-2xl p-6 sm:p-8 space-y-6 relative my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#F2EDE4] hover:bg-[#E8DFD1] text-[#3A2312] flex items-center justify-center cursor-pointer transition"
          aria-label="Cerrar modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-full bg-[#C49A2C]/20 flex items-center justify-center text-[#9A741B]">
            <Ruler className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#3A2312]">
            Guía de Medidas Corporales
          </h2>
          <p className="text-xs text-[#3A2312]/75 max-w-md mx-auto leading-relaxed">
            Para que tu chaleco, pollera o chaquetilla de Livitaca quede con la caída y comodidad perfecta durante las fiestas.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="bg-[#F2EDE4]/50 p-4 rounded-xl border border-[#E8DFD1] space-y-1.5">
            <span className="font-bold text-[#3A2312] flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-[#C49A2C] text-[#261509] flex items-center justify-center text-[10px] font-extrabold">
                1
              </span>
              Contorno de Pecho / Busto
            </span>
            <p className="text-[#3A2312]/75 text-[11px] leading-relaxed">
              Pasa la cinta por debajo de las axilas y sobre la parte más ancha del pecho sin apretar en exceso.
            </p>
          </div>

          <div className="bg-[#F2EDE4]/50 p-4 rounded-xl border border-[#E8DFD1] space-y-1.5">
            <span className="font-bold text-[#3A2312] flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-[#C49A2C] text-[#261509] flex items-center justify-center text-[10px] font-extrabold">
                2
              </span>
              Contorno de Cintura
            </span>
            <p className="text-[#3A2312]/75 text-[11px] leading-relaxed">
              Mide alrededor de la cintura natural (a la altura del ombligo) donde irá ceñida la faja o cinturón.
            </p>
          </div>

          <div className="bg-[#F2EDE4]/50 p-4 rounded-xl border border-[#E8DFD1] space-y-1.5">
            <span className="font-bold text-[#3A2312] flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-[#C49A2C] text-[#261509] flex items-center justify-center text-[10px] font-extrabold">
                3
              </span>
              Largo de Talle
            </span>
            <p className="text-[#3A2312]/75 text-[11px] leading-relaxed">
              Desde la base del cuello en la espalda hasta la cintura. Vital para el largo del chaleco de q'orilazo.
            </p>
          </div>

          <div className="bg-[#F2EDE4]/50 p-4 rounded-xl border border-[#E8DFD1] space-y-1.5">
            <span className="font-bold text-[#3A2312] flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-[#C49A2C] text-[#261509] flex items-center justify-center text-[10px] font-extrabold">
                4
              </span>
              Largo de Pollera
            </span>
            <p className="text-[#3A2312]/75 text-[11px] leading-relaxed">
              Para damas: medir desde la cintura hasta media pantorrilla o tobillo según la costumbre de tu danza.
            </p>
          </div>
        </div>

        <div className="bg-[#C49A2C]/15 p-4 rounded-2xl border border-[#C49A2C]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-center sm:text-left">
            <p className="font-bold text-[#3A2312]">¿Prefieres que Don Luis Alfredo te asesore?</p>
            <p className="text-[#3A2312]/80 text-[11px]">
              Mándale un mensaje y coordinamos una llamada o videollamada rápida.
            </p>
          </div>
          <a
            href={whatsappAdviceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-[#25D366] text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs shrink-0 hover:bg-[#20ba59] transition"
          >
            <MessageCircle className="w-4 h-4" /> WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};
