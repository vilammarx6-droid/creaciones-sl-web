import React, { useState } from 'react';
import { ShieldCheck, X, ArrowRight, QrCode, CreditCard, Landmark, CheckCircle } from 'lucide-react';
import { CartItem, Currency, ShippingMethodId } from '../types';
import { SHIPPING_METHODS, MASTER_ARTISAN } from '../data/products';
import { formatPrice } from '../utils/format';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  shippingMethodId: ShippingMethodId;
  currency: Currency;
  onConfirmOrder: (orderDetails: {
    orderId: string;
    buyerName: string;
    phone: string;
    city: string;
    address: string;
    is50Percent: boolean;
    paymentMethod: 'yape' | 'card' | 'bank';
    finalAmountString: string;
  }) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  shippingMethodId,
  currency,
  onConfirmOrder,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<1 | 2>(1);

  // Step 1 fields
  const [name, setName] = useState('');
  const [dni, setDni] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Step 2 fields
  const [is50Percent, setIs50Percent] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'yape' | 'card' | 'bank'>('yape');

  // Calculations
  const subtotalPEN = items.reduce((sum, item) => sum + item.pricePEN * item.quantity, 0);
  const activeShippingMethod =
    SHIPPING_METHODS.find((m) => m.id === shippingMethodId) || SHIPPING_METHODS[0];
  const shippingCostPEN = activeShippingMethod.pricePEN;
  const totalPEN = subtotalPEN + shippingCostPEN;

  const currentPayablePEN = is50Percent ? totalPEN / 2 : totalPEN;
  const adelantoHalfPEN = totalPEN / 2;

  const handleGoToStep2 = () => {
    if (!name.trim() || !phone.trim() || !city.trim()) {
      setErrorMsg('Por favor completa tu Nombre, Celular/WhatsApp y Ciudad para coordinar tu entrega.');
      return;
    }
    setErrorMsg('');
    setStep(2);
  };

  const handleConfirm = () => {
    const randomCode = '#SL-' + Math.floor(1000 + Math.random() * 9000);
    const finalAmountString = is50Percent
      ? `${formatPrice(currentPayablePEN, currency)} (50% Adelanto)`
      : formatPrice(currentPayablePEN, currency);

    onConfirmOrder({
      orderId: randomCode,
      buyerName: name,
      phone,
      city,
      address,
      is50Percent,
      paymentMethod,
      finalAmountString,
    });
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl max-w-2xl w-full border border-[#E8DFD1] shadow-2xl flex flex-col max-h-[92vh] sm:max-h-[90vh] overflow-hidden relative">
        
        {/* Checkout Header */}
        <div className="bg-[#3A2312] text-[#FAFAF7] p-4 sm:p-5 flex items-center justify-between border-b border-[#C49A2C]/30 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#C49A2C]/20 flex items-center justify-center text-[#C49A2C] border border-[#C49A2C]/40 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h2 className="font-serif text-base sm:text-lg font-bold text-[#FFFDF9] truncate">
                Finalizar Pedido Seguro
              </h2>
              <p className="text-[10px] sm:text-[11px] text-[#FAFAF7]/80 truncate">
                Creaciones SL • Taller de {MASTER_ARTISAN}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#FAFAF7]/70 hover:text-white p-1 rounded-lg cursor-pointer shrink-0"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Checkout Step Tracker */}
        <div className="bg-[#F2EDE4] px-4 sm:px-6 py-2.5 sm:py-3 border-b border-[#E8DFD1] flex items-center justify-between text-xs font-bold shrink-0">
          <div
            className={`flex items-center gap-2 ${
              step === 1 ? 'text-[#3A2312]' : 'text-[#3A2312]/60'
            }`}
          >
            <span
              className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[11px] sm:text-xs ${
                step === 1 ? 'bg-[#C49A2C] text-[#261509]' : 'bg-[#E8DFD1] text-[#3A2312]'
              }`}
            >
              1
            </span>
            <span>Datos & Entrega</span>
          </div>

          <div className="h-px flex-1 max-w-[80px] bg-[#E8DFD1] mx-3" />

          <div
            className={`flex items-center gap-2 ${
              step === 2 ? 'text-[#3A2312]' : 'text-[#3A2312]/50'
            }`}
          >
            <span
              className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[11px] sm:text-xs ${
                step === 2 ? 'bg-[#C49A2C] text-[#261509]' : 'bg-[#E8DFD1] text-[#3A2312]'
              }`}
            >
              2
            </span>
            <span>Método de Pago</span>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 sm:p-8 space-y-4">
          {/* Step 1: Customer Details */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-serif text-xs sm:text-sm font-bold uppercase tracking-wider text-[#3A2312]">
                Información del Comprador
              </h3>

              {errorMsg && (
                <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-semibold mb-1 text-[#3A2312]">
                    Nombres y Apellidos *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej: Juan Carlos Huamán"
                    className="w-full px-3 py-2 rounded-xl border border-[#E8DFD1] focus:ring-2 focus:ring-[#C49A2C] focus:outline-none text-[#3A2312]"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-[#3A2312]">
                    DNI o RUC
                  </label>
                  <input
                    type="text"
                    value={dni}
                    onChange={(e) => setDni(e.target.value)}
                    placeholder="Ej: 45892147"
                    className="w-full px-3 py-2 rounded-xl border border-[#E8DFD1] focus:ring-2 focus:ring-[#C49A2C] focus:outline-none text-[#3A2312]"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-[#3A2312]">
                    Celular / WhatsApp (Para coordinación) *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Ej: 984 123 456"
                    className="w-full px-3 py-2 rounded-xl border border-[#E8DFD1] focus:ring-2 focus:ring-[#C49A2C] focus:outline-none text-[#3A2312]"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-[#3A2312]">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tucorreo@ejemplo.com"
                    className="w-full px-3 py-2 rounded-xl border border-[#E8DFD1] focus:ring-2 focus:ring-[#C49A2C] focus:outline-none text-[#3A2312]"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-[#3A2312]">
                    Departamento / Provincia *
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Ej: Cusco / Arequipa / Lima"
                    className="w-full px-3 py-2 rounded-xl border border-[#E8DFD1] focus:ring-2 focus:ring-[#C49A2C] focus:outline-none text-[#3A2312]"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-[#3A2312]">
                    Dirección o Agencia Shalom de preferencia *
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Ej: Agencia Shalom Av. El Sol / Domicilio"
                    className="w-full px-3 py-2 rounded-xl border border-[#E8DFD1] focus:ring-2 focus:ring-[#C49A2C] focus:outline-none text-[#3A2312]"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end">
                <button
                  onClick={handleGoToStep2}
                  className="w-full sm:w-auto py-3 px-6 rounded-xl bg-[#C49A2C] hover:bg-[#E8BC4C] text-[#261509] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs transition active:scale-95 cursor-pointer"
                >
                  <span>Continuar al Pago</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Payment Selection */}
          {step === 2 && (
            <div className="space-y-4">
              {/* Toggle 50% Adelanto option */}
              <div className="bg-amber-50 border border-amber-300 p-3 sm:p-3.5 rounded-2xl flex items-start gap-3">
                <input
                  type="checkbox"
                  id="chk-50-percent"
                  checked={is50Percent}
                  onChange={(e) => setIs50Percent(e.target.checked)}
                  className="mt-0.5 rounded text-[#C49A2C] focus:ring-[#C49A2C] cursor-pointer"
                />
                <label htmlFor="chk-50-percent" className="text-xs cursor-pointer">
                  <span className="font-bold text-[#3A2312] block">
                    Pagar sólo el 50% de adelanto inicial ({formatPrice(adelantoHalfPEN, currency)})
                  </span>
                  <span className="text-[#3A2312]/75 text-[11px] leading-relaxed">
                    Válido para iniciar la confección de trajes a medida. El 50% restante se cancela antes del envío tras verificar fotos del traje terminado.
                  </span>
                </label>
              </div>

              <div className="space-y-2.5">
                <label className="font-serif text-xs font-bold uppercase tracking-wider text-[#3A2312] block">
                  Selecciona Método de Pago
                </label>

                {/* Option 1: YAPE / PLIN */}
                <div
                  onClick={() => setPaymentMethod('yape')}
                  className={`border rounded-2xl p-3.5 sm:p-4 cursor-pointer transition ${
                    paymentMethod === 'yape'
                      ? 'border-[#C49A2C] bg-[#F2EDE4]/60'
                      : 'border-[#E8DFD1] bg-white hover:border-[#C49A2C]'
                  }`}
                >
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <label className="flex items-center gap-2 font-bold text-xs cursor-pointer">
                      <input
                        type="radio"
                        name="paymethod"
                        checked={paymentMethod === 'yape'}
                        onChange={() => setPaymentMethod('yape')}
                        className="text-[#C49A2C] focus:ring-[#C49A2C]"
                      />
                      <span className="flex items-center gap-1.5 flex-wrap">
                        <span className="bg-[#742284] text-white px-1.5 py-0.5 rounded text-[10px] font-extrabold">
                          YAPE
                        </span>
                        <span className="bg-[#00a8a8] text-white px-1.5 py-0.5 rounded text-[10px] font-extrabold">
                          PLIN
                        </span>
                        <span>Billetera Digital</span>
                      </span>
                    </label>
                    <span className="text-[10px] font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded">
                      Inmediato
                    </span>
                  </div>

                  {paymentMethod === 'yape' && (
                    <div className="mt-3 pt-3 border-t border-[#E8DFD1] text-xs space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white border border-[#E8DFD1] rounded-xl p-1 flex items-center justify-center shrink-0">
                          <div className="w-full h-full bg-[#3A2312]/90 rounded flex flex-col items-center justify-center text-white text-[9px] text-center p-1 font-mono">
                            <QrCode className="w-6 h-6 sm:w-8 sm:h-8 text-[#C49A2C] mb-0.5" />
                            <span>QR YAPE</span>
                          </div>
                        </div>
                        <div className="space-y-0.5 min-w-0">
                          <p className="font-bold text-[#3A2312] text-xs sm:text-sm">
                            Número Yape / Plin:{' '}
                            <span className="text-[#A85A28] font-mono font-extrabold">953 515 047</span>
                          </p>
                          <p className="text-[#3A2312]/75 text-[11px] truncate">
                            Titular: {MASTER_ARTISAN}
                          </p>
                          <p className="text-[10px] text-[#3A2312]/60">
                            Envía la constancia por WhatsApp para confirmar tu confección.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Option 2: Tarjetas de Crédito / Débito */}
                <div
                  onClick={() => setPaymentMethod('card')}
                  className={`border rounded-2xl p-3.5 sm:p-4 cursor-pointer transition ${
                    paymentMethod === 'card'
                      ? 'border-[#C49A2C] bg-[#F2EDE4]/60'
                      : 'border-[#E8DFD1] bg-white hover:border-[#C49A2C]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 font-bold text-xs cursor-pointer">
                      <input
                        type="radio"
                        name="paymethod"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                        className="text-[#C49A2C] focus:ring-[#C49A2C]"
                      />
                      <span>Tarjeta de Crédito / Débito</span>
                    </label>
                    <CreditCard className="w-4 h-4 text-[#3A2312]/60 shrink-0" />
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="mt-3 pt-3 border-t border-[#E8DFD1] text-xs space-y-2">
                      <input
                        type="text"
                        placeholder="Número de Tarjeta (4557 ...)"
                        className="w-full p-2 border border-[#E8DFD1] rounded-lg text-xs text-[#3A2312]"
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          placeholder="MM/AA"
                          className="w-full p-2 border border-[#E8DFD1] rounded-lg text-xs text-[#3A2312]"
                        />
                        <input
                          type="text"
                          placeholder="CVV"
                          className="w-full p-2 border border-[#E8DFD1] rounded-lg text-xs text-[#3A2312]"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Option 3: Depósito Bancario BCP / Banco de la Nación */}
                <div
                  onClick={() => setPaymentMethod('bank')}
                  className={`border rounded-2xl p-3.5 sm:p-4 cursor-pointer transition ${
                    paymentMethod === 'bank'
                      ? 'border-[#C49A2C] bg-[#F2EDE4]/60'
                      : 'border-[#E8DFD1] bg-white hover:border-[#C49A2C]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 font-bold text-xs cursor-pointer">
                      <input
                        type="radio"
                        name="paymethod"
                        checked={paymentMethod === 'bank'}
                        onChange={() => setPaymentMethod('bank')}
                        className="text-[#C49A2C] focus:ring-[#C49A2C]"
                      />
                      <span>Transferencia Bancaria BCP / Nación</span>
                    </label>
                    <Landmark className="w-4 h-4 text-[#3A2312]/60 shrink-0" />
                  </div>

                  {paymentMethod === 'bank' && (
                    <div className="mt-3 pt-3 border-t border-[#E8DFD1] text-[11px] space-y-1 text-[#3A2312]/80">
                      <p>
                        <strong>BCP Soles:</strong> 215-9843210-0-45
                      </p>
                      <p>
                        <strong>Banco de la Nación:</strong> 04-231-987654
                      </p>
                      <p>Titular: {MASTER_ARTISAN}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Total summary in Checkout */}
              <div className="bg-[#F2EDE4] p-3 rounded-xl border border-[#E8DFD1] flex items-center justify-between text-xs">
                <div>
                  <span className="text-[#3A2312]/70 text-[11px] block">Monto a pagar hoy:</span>
                  <p className="text-base sm:text-lg font-serif font-extrabold text-[#3A2312]">
                    {formatPrice(currentPayablePEN, currency)}
                    {is50Percent && (
                      <span className="text-xs text-[#A85A28] ml-1 font-sans font-bold">
                        (50% Adelanto)
                      </span>
                    )}
                  </p>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="text-xs text-[#A85A28] hover:underline font-semibold cursor-pointer"
                >
                  Modificar Datos
                </button>
              </div>

              <div className="pt-1">
                <button
                  onClick={handleConfirm}
                  className="w-full py-3 sm:py-3.5 px-4 rounded-xl bg-[#3A2312] hover:bg-[#261509] text-[#C49A2C] font-serif font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl transition active:scale-95 cursor-pointer truncate"
                >
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span className="truncate">Confirmar Pedido & Generar Orden</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
