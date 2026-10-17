import React from 'react';
import { Check, MessageCircle, X } from 'lucide-react';
import { buildWhatsAppUrl } from '../utils/format';

interface OrderConfirmationModalProps {
  order: {
    orderId: string;
    buyerName: string;
    phone: string;
    city: string;
    address: string;
    is50Percent: boolean;
    paymentMethod: 'yape' | 'card' | 'bank';
    finalAmountString: string;
    itemsCount: number;
    itemsSummary: string;
  } | null;
  onClose: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  order,
  onClose,
}) => {
  if (!order) return null;

  const whatsappText = `*CONFIRMACIÓN DE PEDIDO ${order.orderId} - CREACIONES SL*\n*Cliente:* ${order.buyerName}\n*Celular:* ${order.phone}\n*Destino:* ${order.city}\n*Detalle de prendas:*\n${order.itemsSummary}\n*Total / Monto Pagado:* ${order.finalAmountString}\n*Método:* ${order.paymentMethod.toUpperCase()}\n\nHola Don Luis Alfredo, acabo de registrar este pedido en la web. Le envío este mensaje para coordinar la verificación del comprobante de pago e iniciar la confección.`;

  const whatsappUrl = buildWhatsAppUrl(whatsappText);

  return (
    <div className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full border-2 border-[#C49A2C] shadow-2xl p-5 sm:p-8 space-y-4 sm:space-y-5 text-center my-4 sm:my-8 max-h-[92vh] sm:max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-[#F2EDE4] hover:bg-[#E8DFD1] text-[#3A2312] flex items-center justify-center cursor-pointer transition"
          aria-label="Cerrar modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-green-100 text-green-700 mx-auto flex items-center justify-center border-2 border-green-500 shadow-xs">
          <Check className="w-8 h-8 sm:w-9 sm:h-9" />
        </div>

        <div className="space-y-1">
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-[#9A741B]">
            ¡Orden Registrada con Éxito!
          </span>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#3A2312]">
            Gracias por tu compra
          </h2>
          <p className="text-xs text-[#3A2312]/75">
            Número de Pedido Oficial:{' '}
            <span className="font-mono font-bold text-[#A85A28] text-sm">
              {order.orderId}
            </span>
          </p>
        </div>

        <div className="bg-[#F2EDE4]/60 p-3.5 sm:p-4 rounded-2xl border border-[#E8DFD1] text-left text-xs space-y-1.5">
          <div className="flex justify-between border-b border-[#E8DFD1] pb-1.5 font-bold text-[#3A2312]">
            <span>Resumen de Orden</span>
            <span className="truncate max-w-[150px]">{order.buyerName}</span>
          </div>
          <div className="flex justify-between text-[#3A2312]/80">
            <span>Total de prendas:</span>
            <span>{order.itemsCount} prenda(s)</span>
          </div>
          <div className="flex justify-between text-[#3A2312]/80">
            <span>Importe del pedido:</span>
            <span className="font-bold text-[#3A2312]">{order.finalAmountString}</span>
          </div>
          <div className="flex justify-between text-[#3A2312]/80">
            <span>Destino:</span>
            <span className="truncate max-w-[150px]">{order.city}</span>
          </div>
        </div>

        <div className="space-y-2 pt-1">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 sm:py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition active:scale-95"
          >
            <MessageCircle className="w-4 h-4 shrink-0" />
            <span className="truncate">Enviar Comprobante por WhatsApp</span>
          </a>

          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-xl bg-[#F2EDE4] hover:bg-[#E8DFD1] text-[#3A2312] font-bold text-xs transition cursor-pointer"
          >
            Volver a la Tienda
          </button>
        </div>

        <p className="text-[10px] text-[#3A2312]/60 leading-relaxed">
          Hemos registrado tu pedido para el taller de Livitaca. Te contactaremos inmediatamente para coordinar los detalles.
        </p>
      </div>
    </div>
  );
};
