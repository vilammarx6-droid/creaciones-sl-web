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
    <div className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl max-w-4xl w-full border border-[#E8DFD1] shadow-2xl flex flex-col max-h-[92vh] sm:max-h-[90vh] overflow-hidden relative">
        
        {/* Sticky Header with Title and Close Button */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-4 sm:px-6 py-3.5 border-b border-[#E8DFD1] flex items-center justify-between gap-3 shrink-0">
          <div className="min-w-0">
            <span className="text-[10px] font-bold text-[#A85A28] uppercase tracking-wider block truncate">
              {product.category.toUpperCase()} • {product.gender}
            </span>
            <h2 className="font-serif text-base sm:text-xl font-bold text-[#3A2312] truncate">
              {product.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F2EDE4] hover:bg-[#E8DFD1] text-[#3A2312] flex items-center justify-center transition cursor-pointer shrink-0"
            aria-label="Cerrar modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            
            {/* Left Column: Image & Delivery specs */}
            <div className="md:col-span-5 space-y-4">
              <div className="rounded-2xl overflow-hidden bg-[#F2EDE4]/50 border border-[#E8DFD1] aspect-square flex items-center justify-center p-4 relative">
                <img
                  src={product.img}
                  alt={product.title}
                  className="max-h-full max-w-full object-contain"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-[#3A2312] text-[#C49A2C] border border-[#C49A2C] shadow-xs">
                  {product.tag}
                </span>
              </div>

              <div className="bg-[#F2EDE4]/50 p-3.5 rounded-xl border border-[#E8DFD1] text-xs space-y-1.5">
                <p className="font-bold text-[#3A2312] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#C49A2C] shrink-0" /> Tiempos de Entrega
                </p>
                <p className="text-[11px] text-[#3A2312]/80 leading-relaxed">
                  {product.delivery}
                </p>
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#3A2312]/70 px-1">
                <span>Taller: Livitaca, Cusco</span>
                <span className="font-bold text-[#A85A28]">Garantía Don Luis Alfredo</span>
              </div>
            </div>

            {/* Right Column: Customizer & Details */}
            <div className="md:col-span-7 space-y-5">
              <div>
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#9A741B] font-serif">
                    {formatPrice(product.pricePEN, currency)}
                  </span>
                  <span className="text-xs text-[#3A2312]/60">
                    (Acabados en hilo de oro/cobre)
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#3A2312]/80 leading-relaxed mt-2">
                  {product.desc}
                </p>
              </div>

              {/* SIZING & MEASUREMENTS CONFIGURATOR */}
              <div className="space-y-3 border-t border-[#E8DFD1] pt-4">
                <div className="flex items-center justify-between flex-wrap gap-1">
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
                    className={`py-2 px-3 rounded-xl border-2 font-bold transition cursor-pointer text-center ${
                      sizeMode === 'standard'
                        ? 'border-[#C49A2C] bg-[#C49A2C]/15 text-[#3A2312]'
                        : 'border-[#E8DFD1] bg-white hover:bg-[#F2EDE4] text-[#3A2312]'
                    }`}
                  >
                    Talla Estándar (S - XL)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSizeMode('custom')}
                    className={`py-2 px-3 rounded-xl border-2 font-bold transition flex items-center justify-center gap-1.5 cursor-pointer text-center ${
                      sizeMode === 'custom'
                        ? 'border-[#A85A28] bg-[#A85A28]/15 text-[#3A2312]'
                        : 'border-[#E8DFD1] bg-white hover:bg-[#F2EDE4] text-[#3A2312]'
                    }`}
                  >
                    <Scissors className="w-3.5 h-3.5 text-[#A85A28] shrink-0" />
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
                  <div className="bg-[#F2EDE4]/60 p-3.5 sm:p-4 rounded-2xl border border-[#C49A2C]/40 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#3A2312] flex items-center gap-1.5">
                        <Ruler className="w-4 h-4 text-[#A85A28] shrink-0" /> Ficha de Medidas (en cm):
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                      <div>
                        <label className="block text-[10px] font-semibold text-[#3A2312]/80 mb-0.5">
                          Pecho (cm)
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
                        <label className="block text-[10px] font-semibold text-[#3A2312]/80 mb-0.5">
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
                        <label className="block text-[10px] font-semibold text-[#3A2312]/80 mb-0.5">
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
                        <label className="block text-[10px] font-semibold text-[#3A2312]/80 mb-0.5">
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
                        <label className="block text-[10px] font-semibold text-[#3A2312]/80 mb-0.5">
                          Estatura (cm)
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
                        <label className="block text-[10px] font-semibold text-[#3A2312]/80 mb-0.5">
                          Color de Paño
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

                    <p className="text-[10px] text-[#3A2312]/70 italic leading-tight">
                      * Confeccionaremos la prenda con estos parámetros. Tiempo de confección: 10 a 15 días.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sticky Bottom Action Bar */}
        <div className="sticky bottom-0 z-20 bg-white/95 backdrop-blur-md border-t border-[#E8DFD1] p-3 sm:p-4 shadow-lg space-y-2 shrink-0">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quantity Stepper */}
            <div className="flex items-center border border-[#E8DFD1] rounded-xl bg-white p-1 shrink-0">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[#F2EDE4] font-bold text-[#3A2312] cursor-pointer"
                aria-label="Disminuir cantidad"
              >
                -
              </button>
              <span className="w-8 text-center font-bold text-xs">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[#F2EDE4] font-bold text-[#3A2312] cursor-pointer"
                aria-label="Aumentar cantidad"
              >
                +
              </button>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="flex-1 py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl bg-[#3A2312] hover:bg-[#261509] text-[#C49A2C] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer truncate"
            >
              <ShoppingBag className="w-4 h-4 shrink-0" />
              <span className="truncate">Añadir a la Bolsa</span>
            </button>
          </div>

          {/* Direct WhatsApp Quick Buy */}
          <button
            onClick={handleDirectWhatsAppBuy}
            className="w-full py-2 sm:py-2.5 px-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition active:scale-95 cursor-pointer truncate"
          >
            <MessageCircle className="w-4 h-4 shrink-0" />
            <span className="truncate">Comprar directo por WhatsApp con 1 Clic</span>
          </button>
        </div>
      </div>
    </div>
  );
};
