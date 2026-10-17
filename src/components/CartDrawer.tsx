import React from 'react';
import { ShoppingBag, X, Trash2, Truck, Lock, MessageCircle } from 'lucide-react';
import { CartItem, Currency, ShippingMethodId } from '../types';
import { SHIPPING_METHODS } from '../data/products';
import { formatPrice, buildWhatsAppUrl } from '../utils/format';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  shippingMethodId: ShippingMethodId;
  onSelectShippingMethod: (methodId: ShippingMethodId) => void;
  currency: Currency;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  shippingMethodId,
  onSelectShippingMethod,
  currency,
  onProceedToCheckout,
}) => {
  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const subtotalPEN = items.reduce(
    (sum, item) => sum + item.pricePEN * item.quantity,
    0
  );

  const activeShippingMethod =
    SHIPPING_METHODS.find((m) => m.id === shippingMethodId) || SHIPPING_METHODS[0];
  const shippingCostPEN = activeShippingMethod.pricePEN;
  const totalPEN = subtotalPEN + shippingCostPEN;

  const handleWhatsAppQuote = () => {
    if (items.length === 0) return;
    const itemsList = items
      .map(
        (i) =>
          `• ${i.quantity}x ${i.title} (${i.sizeSpecs}) = S/ ${(
            i.pricePEN * i.quantity
          ).toFixed(2)}`
      )
      .join('\n');
    const msg = `*PEDIDO / COTIZACIÓN - CREACIONES SL*\nHola Don Luis Alfredo, deseo consultar por mi bolsa de trajes:\n\n${itemsList}\n\n*Envío:* ${activeShippingMethod.label} (S/ ${shippingCostPEN.toFixed(2)})\n*Total estimado:* S/ ${totalPEN.toFixed(2)}\n¿Podría confirmarme los tiempos de entrega y disponibilidad?`;
    window.open(buildWhatsAppUrl(msg), '_blank');
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-xs transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 bottom-0 z-[61] w-full sm:max-w-[460px] bg-white border-l border-[#E8DFD1] shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-[#E8DFD1] flex items-center justify-between bg-[#F2EDE4]/60 shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#9A741B]" />
            <h2 className="font-serif text-base sm:text-lg font-bold text-[#3A2312]">Bolsa de Compras</h2>
            <span className="text-xs bg-[#C49A2C] text-[#261509] font-extrabold px-2 py-0.5 rounded-full">
              {totalItemsCount}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-lg hover:bg-[#E8DFD1] text-[#3A2312] transition cursor-pointer"
            aria-label="Cerrar bolsa"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Items */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-8 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-[#F2EDE4] flex items-center justify-center text-[#3A2312]/40">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <p className="font-serif text-base font-bold text-[#3A2312]">
              Tu bolsa está vacía
            </p>
            <p className="text-xs text-[#3A2312]/70 max-w-xs leading-relaxed">
              Añade chalecos, chaquetillas o polleras de Livitaca para cotizar o iniciar tu confección.
            </p>
            <button
              onClick={onClose}
              className="mt-2 px-4 py-2 bg-[#C49A2C] text-[#261509] rounded-xl text-xs font-bold shadow-xs hover:bg-[#E8BC4C] transition cursor-pointer"
            >
              Explorar Trajes
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-3.5 sm:p-5 space-y-3 sm:space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-2.5 sm:gap-3 bg-[#F2EDE4]/40 p-2.5 sm:p-3 rounded-2xl border border-[#E8DFD1] min-w-0"
                >
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white border border-[#E8DFD1] p-1 shrink-0 flex items-center justify-center overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between text-xs min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-serif font-bold text-[#3A2312] leading-tight line-clamp-1">
                          {item.title}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-[#3A2312]/40 hover:text-red-600 p-1 cursor-pointer transition shrink-0"
                          title="Eliminar prenda"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-[#A85A28] font-medium mt-0.5 line-clamp-1">
                        {item.sizeSpecs}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="font-serif font-bold text-[#3A2312] text-xs">
                        {formatPrice(item.pricePEN * item.quantity, currency)}
                      </span>
                      <div className="flex items-center border border-[#E8DFD1] rounded-lg bg-white px-1 shrink-0">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="w-5 h-5 flex items-center justify-center font-bold text-[#3A2312] text-xs hover:bg-[#F2EDE4] cursor-pointer"
                        >
                          -
                        </button>
                        <span className="w-6 text-center font-bold text-xs">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="w-5 h-5 flex items-center justify-center font-bold text-[#3A2312] text-xs hover:bg-[#F2EDE4] cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Shipping Calculator & Summary */}
            <div className="border-t border-[#E8DFD1] p-3.5 sm:p-5 bg-[#FFFDF9] space-y-3 shrink-0">
              {/* Shipping Destination */}
              <div className="bg-white p-2.5 sm:p-3 rounded-xl border border-[#E8DFD1] space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-[#3A2312] flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-[#A85A28] shrink-0" /> Destino del Envío
                  </label>
                  <span className="text-[10px] text-[#3A2312]/60">Agencias / Domicilio</span>
                </div>
                <select
                  value={shippingMethodId}
                  onChange={(e) =>
                    onSelectShippingMethod(e.target.value as ShippingMethodId)
                  }
                  className="w-full p-2 rounded-lg border border-[#E8DFD1] bg-[#F2EDE4]/50 text-xs text-[#3A2312] font-medium focus:ring-1 focus:ring-[#C49A2C] cursor-pointer"
                >
                  {SHIPPING_METHODS.map((method) => (
                    <option key={method.id} value={method.id}>
                      {method.label} - S/ {method.pricePEN.toFixed(2)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Breakdown */}
              <div className="space-y-1 text-xs text-[#3A2312]/80">
                <div className="flex justify-between">
                  <span>Subtotal prendas:</span>
                  <span className="font-bold text-[#3A2312]">
                    {formatPrice(subtotalPEN, currency)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Costo de envío:</span>
                  <span className="font-semibold text-[#3A2312]">
                    {formatPrice(shippingCostPEN, currency)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#3A2312] border-t border-[#E8DFD1] pt-1.5">
                  <span>Total a Pagar:</span>
                  <span className="font-serif text-[#9A741B] text-base font-extrabold">
                    {formatPrice(totalPEN, currency)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={onProceedToCheckout}
                  className="w-full py-2.5 sm:py-3 px-4 rounded-xl bg-[#3A2312] hover:bg-[#261509] text-[#C49A2C] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition active:scale-95 cursor-pointer truncate"
                >
                  <Lock className="w-4 h-4 shrink-0" />
                  <span className="truncate">Proceder al Pago Seguro</span>
                </button>
                <button
                  onClick={handleWhatsAppQuote}
                  className="w-full py-2 sm:py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition active:scale-95 cursor-pointer truncate"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  <span className="truncate">Cotizar todo el Carrito por WhatsApp</span>
                </button>
              </div>
            </div>
          </>
        )}
      </aside>
    </>
  );
};
