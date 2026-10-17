import React, { useState } from 'react';
import { X, Clock, Scissors, Ruler, ShoppingBag, MessageCircle } from 'lucide-react';
import { Product, Currency, CartItem } from '../types';
import { formatPrice, buildWhatsAppUrl } from '../utils/format';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  currency: Currency;
  onAddToCart: (item: Omit<CartItem, 'id'>) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  currency,
  onAddToCart,
}) => {
  if (!product) return null;

  const [sizeMode, setSizeMode] = useState<'standard' | 'custom'>('standard');
  const [selectedStandardSize, setSelectedStandardSize] = useState<string>('M');
  const [quantity, setQuantity] = useState<number>(1);

  // Custom measurement fields
  const [chest, setChest] = useState('');
  const [waist, setWaist] = useState('');
  const [hip, setHip] = useState('');
  const [length, setLength] = useState('');
  const [height, setHeight] = useState('');
  const [clothColor, setClothColor] = useState('Negro Tradicional');

  const standardSizes = ['S', 'M', 'L', 'XL'];

  const getSpecsString = () => {
    if (sizeMode === 'standard') {
      return `Talla Estándar ${selectedStandardSize}`;
    }
    const parts = [];
    if (chest) parts.push(`Pecho ${chest}cm`);
    if (waist) parts.push(`Cintura ${waist}cm`);
    if (hip) parts.push(`Cadera ${hip}cm`);
    if (length) parts.push(`Largo ${length}cm`);
    if (height) parts.push(`Estatura ${height}cm`);
    parts.push(`Color: ${clothColor}`);
    return `A Medida: ${parts.join(', ')}`;
  };

  const handleAddToCart = () => {
    onAddToCart({
      productId: product.id,
      title: product.title,
      pricePEN: product.pricePEN,
      img: product.img,
      quantity,
      sizeMode,
      sizeSpecs: getSpecsString(),
      measurements:
        sizeMode === 'custom'
          ? { chest, waist, hip, length, height, color: clothColor }
          : undefined,
    });
    onClose();
  };

  const handleDirectWhatsAppBuy = () => {
    const specs = getSpecsString();
    const msg = `Hola Don Luis Alfredo, deseo comprar el *${product.title}* (${specs}) por ${formatPrice(
      product.pricePEN * quantity,
      'PEN'
    )}. ¿Cómo coordinamos el envío?`;
    window.open(buildWhatsAppUrl(msg), '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full border border-[#E8DFD1] shadow-2xl overflow-hidden my-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#F2EDE4] hover:bg-[#E8DFD1] text-[#3A2312] flex items-center justify-center transition cursor-pointer"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          {/* Left Column: Image & Delivery specs */}
          <div className="md:col-span-5 bg-[#F2EDE4]/60 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E8DFD1]">
            <div className="space-y-3">
              <div className="rounded-2xl overflow-hidden bg-white border border-[#E8DFD1] shadow-inner aspect-square flex items-center justify-center p-6 relative">
                <img
                  src={product.img}
                  alt={product.title}
                  className="max-h-full max-w-full object-contain transition-transform hover:scale-105 duration-300"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#3A2312] text-[#C49A2C] border border-[#C49A2C]">
                  {product.tag}
                </span>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-[#E8DFD1] text-xs space-y-1.5">
                <p className="font-bold text-[#3A2312] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#C49A2C]" /> Tiempos de Entrega
                </p>
                <p className="text-[11px] text-[#3A2312]/80 leading-relaxed">
                  {product.delivery}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-[#E8DFD1]/80 flex items-center justify-between text-[11px] text-[#3A2312]/70">
              <span>Taller: Livitaca, Cusco</span>
              <span className="font-bold text-[#A85A28]">Garantía Don Luis Alfredo</span>
            </div>
          </div>

          {/* Right Column: Customizer & Order Actions */}
          <div className="md:col-span-7 p-6 sm:p-8 space-y-5">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#A85A28] uppercase tracking-wider">
                <span>{product.category.toUpperCase()}</span> • <span>{product.gender}</span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-[#3A2312] mt-1">
                {product.title}
              </h2>
              <div className="mt-2 flex items-baseline gap-3">
                <span className="text-2xl font-extrabold text-[#9A741B] font-serif">
                  {formatPrice(product.pricePEN, currency)}
                </span>
                <span className="text-xs text-[#3A2312]/60">
                  (Incluye acabados en hilo de oro/cobre)
                </span>
              </div>
            </div>

            <p className="text-xs text-[#3A2312]/80 leading-relaxed">
              {product.desc}
            </p>

            {/* SIZING & MEASUREMENTS CONFIGURATOR */}
            <div className="space-y-3 border-t border-[#E8DFD1] pt-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#3A2312] uppercase tracking-wider">
                  Modalidad de Talla
                </label>
                <span className="text-[11px] text-[#9A741B] font-semibold">
                  ¿No sabes tu talla? Usa "A mi medida"
                </span>
              </div>

              {/* Radio Tabs */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setSizeMode('standard')}
                  className={`py-2 px-3 rounded-xl border-2 font-bold transition cursor-pointer ${
                    sizeMode === 'standard'
                      ? 'border-[#C49A2C] bg-[#C49A2C]/15 text-[#3A2312]'
                      : 'border-[#E8DFD1] bg-white hover:bg-[#F2EDE4] text-[#3A2312]'
                  }`}
                >
                  Talla Estándar (S, M, L, XL)
                </button>
                <button
                  type="button"
                  onClick={() => setSizeMode('custom')}
                  className={`py-2 px-3 rounded-xl border-2 font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                    sizeMode === 'custom'
                      ? 'border-[#A85A28] bg-[#A85A28]/15 text-[#3A2312]'
                      : 'border-[#E8DFD1] bg-white hover:bg-[#F2EDE4] text-[#3A2312]'
                  }`}
                >
                  <Scissors className="w-3.5 h-3.5 text-[#A85A28]" />
                  <span>A mi medida exacta</span>
                </button>
              </div>

              {/* Standard Sizes */}
              {sizeMode === 'standard' && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {standardSizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedStandardSize(sz)}
                      className={`py-2 px-4 rounded-xl border text-xs font-bold transition cursor-pointer ${
                        selectedStandardSize === sz
                          ? 'border-2 border-[#C49A2C] bg-[#C49A2C]/20 text-[#3A2312]'
                          : 'border-[#E8DFD1] hover:bg-[#F2EDE4] text-[#3A2312]'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              )}

              {/* Custom Measurements Panel */}
              {sizeMode === 'custom' && (
                <div className="bg-[#F2EDE4]/50 p-4 rounded-2xl border border-[#C49A2C]/40 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#3A2312] flex items-center gap-1.5">
                      <Ruler className="w-4 h-4 text-[#A85A28]" /> Ficha de Medidas (en centímetros):
                    </span>
                    <span className="text-[10px] text-[#A85A28] font-medium">
                      Asesoría gratuita por Don Luis Alfredo
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                    <div>
                      <label className="block text-[10px] text-[#3A2312]/80 mb-0.5">
                        Contorno Pecho (cm)
                      </label>
                      <input
                        type="number"
                        value={chest}
                        onChange={(e) => setChest(e.target.value)}
                        placeholder="Ej: 98"
                        className="w-full px-2.5 py-1.5 rounded-lg border border-[#E8DFD1] bg-white text-xs text-[#3A2312]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-[#3A2312]/80 mb-0.5">
                        Cintura (cm)
                      </label>
                      <input
                        type="number"
                        value={waist}
                        onChange={(e) => setWaist(e.target.value)}
                        placeholder="Ej: 84"
                        className="w-full px-2.5 py-1.5 rounded-lg border border-[#E8DFD1] bg-white text-xs text-[#3A2312]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-[#3A2312]/80 mb-0.5">
                        Cadera (cm)
                      </label>
                      <input
                        type="number"
                        value={hip}
                        onChange={(e) => setHip(e.target.value)}
                        placeholder="Ej: 100"
                        className="w-full px-2.5 py-1.5 rounded-lg border border-[#E8DFD1] bg-white text-xs text-[#3A2312]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-[#3A2312]/80 mb-0.5">
                        Largo Talle (cm)
                      </label>
                      <input
                        type="number"
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                        placeholder="Ej: 56"
                        className="w-full px-2.5 py-1.5 rounded-lg border border-[#E8DFD1] bg-white text-xs text-[#3A2312]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-[#3A2312]/80 mb-0.5">
                        Estatura Total (cm)
                      </label>
                      <input
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        placeholder="Ej: 170"
                        className="w-full px-2.5 py-1.5 rounded-lg border border-[#E8DFD1] bg-white text-xs text-[#3A2312]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-[#3A2312]/80 mb-0.5">
                        Color de Paño Base
                      </label>
                      <select
                        value={clothColor}
                        onChange={(e) => setClothColor(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-[#E8DFD1] bg-white text-xs text-[#3A2312]"
                      >
                        <option value="Negro Tradicional">Negro Tradicional</option>
                        <option value="Marrón Chocolate">Marrón Chocolate</option>
                        <option value="Azul Noche">Azul Noche</option>
                        <option value="Rojo Guinda">Rojo Guinda</option>
                      </select>
                    </div>
                  </div>

                  <p className="text-[10px] text-[#3A2312]/70 italic">
                    * Confeccionaremos la prenda siguiendo estrictamente estos parámetros. Tiempo de confección: 10 a 15 días.
                  </p>
                </div>
              )}
            </div>

            {/* Quantity and Action Buttons */}
            <div className="space-y-3 pt-3 border-t border-[#E8DFD1]">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-[#E8DFD1] rounded-xl bg-white p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[#F2EDE4] font-bold text-[#3A2312] cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-9 text-center font-bold text-xs">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[#F2EDE4] font-bold text-[#3A2312] cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#3A2312] hover:bg-[#261509] text-[#C49A2C] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" /> Añadir al Carrito
                </button>
              </div>

              {/* Direct WhatsApp Quick Buy */}
              <button
                onClick={handleDirectWhatsAppBuy}
                className="w-full py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" /> Comprar directo por WhatsApp con 1 Clic
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
