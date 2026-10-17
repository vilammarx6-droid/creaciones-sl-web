import React, { useMemo } from 'react';
import { Search, SlidersHorizontal, Award, ShoppingBag, MessageCircle, PackageSearch } from 'lucide-react';
import { Product, CategoryId, GenderFilter, Currency } from '../types';
import { PRODUCTS } from '../data/products';
import { formatPrice, buildWhatsAppUrl } from '../utils/format';

interface CatalogSectionProps {
  activeCategory: CategoryId;
  onSelectCategory: (category: CategoryId) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortMethod: 'featured' | 'price-asc' | 'price-desc';
  onSortChange: (sort: 'featured' | 'price-asc' | 'price-desc') => void;
  filterStockOnly: boolean;
  onToggleStockOnly: (checked: boolean) => void;
  filterCustomOnly: boolean;
  onToggleCustomOnly: (checked: boolean) => void;
  selectedGender: GenderFilter | null;
  onSelectGender: (gender: GenderFilter | null) => void;
  onResetFilters: () => void;
  currency: Currency;
  onOpenProductModal: (product: Product) => void;
  onQuickAddToCart: (product: Product) => void;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  sortMethod,
  onSortChange,
  filterStockOnly,
  onToggleStockOnly,
  filterCustomOnly,
  onToggleCustomOnly,
  selectedGender,
  onSelectGender,
  onResetFilters,
  currency,
  onOpenProductModal,
  onQuickAddToCart,
}) => {
  // Category counts
  const categoryCounts = useMemo(() => {
    return {
      all: PRODUCTS.length,
      chalecos: PRODUCTS.filter((p) => p.category === 'chalecos').length,
      polleras: PRODUCTS.filter((p) => p.category === 'polleras').length,
      comparsas: PRODUCTS.filter((p) => p.category === 'comparsas').length,
      accesorios: PRODUCTS.filter((p) => p.category === 'accesorios').length,
    };
  }, []);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let list = PRODUCTS.filter((p) => {
      if (activeCategory !== 'all' && p.category !== activeCategory) return false;
      if (filterStockOnly && !p.stock) return false;
      if (filterCustomOnly && p.stock) return false;
      if (selectedGender && p.gender !== selectedGender) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = p.title.toLowerCase().includes(q);
        const matchDesc = p.desc.toLowerCase().includes(q);
        if (!matchTitle && !matchDesc) return false;
      }
      return true;
    });

    if (sortMethod === 'price-asc') {
      list = [...list].sort((a, b) => a.pricePEN - b.pricePEN);
    } else if (sortMethod === 'price-desc') {
      list = [...list].sort((a, b) => b.pricePEN - a.pricePEN);
    }

    return list;
  }, [activeCategory, filterStockOnly, filterCustomOnly, selectedGender, searchQuery, sortMethod]);

  const genderOptions: GenderFilter[] = ['Varón', 'Dama', 'Niño/a', 'Grupal'];

  return (
    <main id="catalogo-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
      {/* CATALOG CONTROLS & BREADCRUMB */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E8DFD1]">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#3A2312] flex items-center gap-2">
            <span>Catálogo de Confecciones</span>
            <span className="text-xs font-sans font-semibold px-2 py-0.5 rounded-full bg-[#C49A2C]/20 text-[#9A741B] border border-[#C49A2C]/30">
              {filteredProducts.length} Modelos
            </span>
          </h2>
          <p className="text-xs text-[#3A2312]/70 mt-1">
            Prendas en stock para entrega inmediata y opciones de confección a medida artesanal.
          </p>
        </div>

        {/* Quick Search and Sort */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-[#3A2312]/40 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar chaleco, pollera, faja..."
              className="pl-9 pr-3 py-2 text-xs rounded-xl border border-[#E8DFD1] bg-white focus:outline-none focus:ring-2 focus:ring-[#C49A2C] w-56 text-[#3A2312]"
            />
          </div>

          <select
            value={sortMethod}
            onChange={(e) => onSortChange(e.target.value as 'featured' | 'price-asc' | 'price-desc')}
            className="text-xs rounded-xl border border-[#E8DFD1] bg-white py-2 px-3 text-[#3A2312] focus:outline-none focus:ring-2 focus:ring-[#C49A2C] font-medium cursor-pointer"
          >
            <option value="featured">Destacados / Gala</option>
            <option value="price-asc">Precio: Menor a Mayor</option>
            <option value="price-desc">Precio: Mayor a Menor</option>
          </select>
        </div>
      </div>

      {/* LAYOUT: FILTERS SIDEBAR + PRODUCTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-6">
        {/* SIDEBAR FILTERS */}
        <aside className="space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-[#E8DFD1] shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-[#E8DFD1] pb-3">
              <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-[#3A2312] flex items-center gap-1.5">
                <SlidersHorizontal className="w-4 h-4 text-[#C49A2C]" /> Filtros
              </h3>
              <button
                onClick={onResetFilters}
                className="text-[11px] text-[#A85A28] hover:underline font-semibold cursor-pointer"
              >
                Limpiar todo
              </button>
            </div>

            {/* Filter: Categoría */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#3A2312] uppercase tracking-wider block">
                Categoría
              </label>
              <div className="space-y-1 text-xs">
                <button
                  onClick={() => onSelectCategory('all')}
                  className={`w-full text-left px-3 py-2 rounded-lg font-medium transition flex items-center justify-between cursor-pointer ${
                    activeCategory === 'all'
                      ? 'bg-[#F2EDE4] text-[#3A2312] font-bold'
                      : 'hover:bg-[#F2EDE4] text-[#3A2312]/80'
                  }`}
                >
                  <span>Todos los trajes</span>
                  <span className="text-[10px] bg-white px-1.5 py-0.5 rounded border border-[#E8DFD1]">
                    {categoryCounts.all}
                  </span>
                </button>

                <button
                  onClick={() => onSelectCategory('chalecos')}
                  className={`w-full text-left px-3 py-2 rounded-lg font-medium transition flex items-center justify-between cursor-pointer ${
                    activeCategory === 'chalecos'
                      ? 'bg-[#F2EDE4] text-[#3A2312] font-bold'
                      : 'hover:bg-[#F2EDE4] text-[#3A2312]/80'
                  }`}
                >
                  <span>Chalecos de Q'orilazo</span>
                  <span className="text-[10px] bg-white px-1.5 py-0.5 rounded border border-[#E8DFD1]">
                    {categoryCounts.chalecos}
                  </span>
                </button>

                <button
                  onClick={() => onSelectCategory('polleras')}
                  className={`w-full text-left px-3 py-2 rounded-lg font-medium transition flex items-center justify-between cursor-pointer ${
                    activeCategory === 'polleras'
                      ? 'bg-[#F2EDE4] text-[#3A2312] font-bold'
                      : 'hover:bg-[#F2EDE4] text-[#3A2312]/80'
                  }`}
                >
                  <span>Chaquetillas y Polleras</span>
                  <span className="text-[10px] bg-white px-1.5 py-0.5 rounded border border-[#E8DFD1]">
                    {categoryCounts.polleras}
                  </span>
                </button>

                <button
                  onClick={() => onSelectCategory('comparsas')}
                  className={`w-full text-left px-3 py-2 rounded-lg font-medium transition flex items-center justify-between cursor-pointer ${
                    activeCategory === 'comparsas'
                      ? 'bg-[#F2EDE4] text-[#3A2312] font-bold'
                      : 'hover:bg-[#F2EDE4] text-[#3A2312]/80'
                  }`}
                >
                  <span>Trajes para Comparsas</span>
                  <span className="text-[10px] bg-white px-1.5 py-0.5 rounded border border-[#E8DFD1]">
                    {categoryCounts.comparsas}
                  </span>
                </button>

                <button
                  onClick={() => onSelectCategory('accesorios')}
                  className={`w-full text-left px-3 py-2 rounded-lg font-medium transition flex items-center justify-between cursor-pointer ${
                    activeCategory === 'accesorios'
                      ? 'bg-[#F2EDE4] text-[#3A2312] font-bold'
                      : 'hover:bg-[#F2EDE4] text-[#3A2312]/80'
                  }`}
                >
                  <span>Accesorios & Fajas</span>
                  <span className="text-[10px] bg-white px-1.5 py-0.5 rounded border border-[#E8DFD1]">
                    {categoryCounts.accesorios}
                  </span>
                </button>
              </div>
            </div>

            {/* Filter: Modalidad de Compra */}
            <div className="space-y-2 border-t border-[#E8DFD1] pt-4">
              <label className="text-xs font-bold text-[#3A2312] uppercase tracking-wider block">
                Modalidad de Compra
              </label>
              <div className="space-y-2 text-xs">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filterStockOnly}
                    onChange={(e) => onToggleStockOnly(e.target.checked)}
                    className="rounded border-[#E8DFD1] text-[#C49A2C] focus:ring-[#C49A2C]"
                  />
                  <span>En Stock (Despacho 48-72h)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filterCustomOnly}
                    onChange={(e) => onToggleCustomOnly(e.target.checked)}
                    className="rounded border-[#E8DFD1] text-[#C49A2C] focus:ring-[#C49A2C]"
                  />
                  <span>A Medida (10 a 15 días)</span>
                </label>
              </div>
            </div>

            {/* Filter: Género / Destinatario */}
            <div className="space-y-2 border-t border-[#E8DFD1] pt-4">
              <label className="text-xs font-bold text-[#3A2312] uppercase tracking-wider block">
                Para Quién
              </label>
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                {genderOptions.map((g) => {
                  const isSelected = selectedGender === g;
                  return (
                    <button
                      key={g}
                      onClick={() => onSelectGender(isSelected ? null : g)}
                      className={`py-1.5 px-2 rounded-lg border text-center font-medium transition cursor-pointer ${
                        isSelected
                          ? 'bg-[#C49A2C] text-[#261509] font-bold border-[#C49A2C]'
                          : 'border-[#E8DFD1] hover:bg-[#F2EDE4] text-[#3A2312]'
                      }`}
                    >
                      {g}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Callout Don Luis Alfredo */}
            <div className="bg-[#F2EDE4]/60 p-4 rounded-xl border border-[#E8DFD1]/80 text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold text-[#3A2312]">
                <Award className="w-4 h-4 text-[#C49A2C]" />
                <span>Garantía de Don Luis Alfredo</span>
              </div>
              <p className="text-[#3A2312]/80 text-[11px] leading-relaxed">
                Cada prenda pasa por inspección de costura reforzada para faenas y concursos folclóricos.
              </p>
            </div>
          </div>
        </aside>

        {/* PRODUCTS GRID */}
        <section className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-[#E8DFD1] p-8">
              <PackageSearch className="w-12 h-12 text-[#A85A28] mx-auto mb-3" />
              <h3 className="font-serif text-lg font-bold text-[#3A2312]">
                No encontramos trajes con estos filtros
              </h3>
              <p className="text-xs text-[#3A2312]/70 mt-1 max-w-sm mx-auto">
                Prueba quitando algunos filtros o solicita un diseño personalizado directamente a Don Luis Alfredo.
              </p>
              <button
                onClick={onResetFilters}
                className="mt-4 px-4 py-2 bg-[#C49A2C] text-[#261509] rounded-xl font-bold text-xs cursor-pointer shadow-xs hover:bg-[#E8BC4C] transition"
              >
                Restablecer Filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => {
                const whatsappQuickUrl = buildWhatsAppUrl(
                  `Hola Don Luis Alfredo, deseo consultar por el traje *${product.title}* (${formatPrice(product.pricePEN, 'PEN')}).`
                );

                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-2xl border border-[#E8DFD1] overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
                  >
                    {/* Image Box with Quick View */}
                    <div className="relative bg-[#F2EDE4]/50 p-6 aspect-square flex items-center justify-center overflow-hidden border-b border-[#E8DFD1]">
                      <img
                        src={product.img}
                        alt={product.title}
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#3A2312] text-[#C49A2C] border border-[#C49A2C]/50 shadow-xs">
                          {product.tag}
                        </span>
                        {product.stock ? (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-600 text-white shadow-xs">
                            En Stock
                          </span>
                        ) : (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-700 text-white shadow-xs">
                            A Medida
                          </span>
                        )}
                      </div>

                      {/* Quick Look Overlay */}
                      <div className="absolute inset-0 bg-[#3A2312]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-4">
                        <button
                          onClick={() => onOpenProductModal(product)}
                          className="px-3.5 py-2 rounded-xl bg-white text-[#3A2312] font-bold text-xs shadow-lg hover:bg-[#C49A2C] hover:text-[#261509] transition transform translate-y-2 group-hover:translate-y-0 cursor-pointer"
                        >
                          Ver Detalles y Medidas
                        </button>
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex items-center justify-between text-[11px] text-[#A85A28] font-semibold uppercase tracking-wider mb-1">
                          <span>{product.gender}</span>
                          <span>Livitaca</span>
                        </div>
                        <h3 className="font-serif font-bold text-base text-[#3A2312] line-clamp-1 group-hover:text-[#9A741B] transition-colors">
                          {product.title}
                        </h3>
                        <p className="text-xs text-[#3A2312]/70 line-clamp-2 mt-1 leading-relaxed">
                          {product.desc}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-[#E8DFD1]/80">
                        <div className="flex items-baseline justify-between mb-3">
                          <span className="text-xs text-[#3A2312]/60">Precio:</span>
                          <span className="font-serif font-bold text-lg text-[#3A2312]">
                            {formatPrice(product.pricePEN, currency)}
                          </span>
                        </div>

                        {/* Action buttons in card */}
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => onQuickAddToCart(product)}
                            className="py-2 px-2 rounded-xl bg-[#F2EDE4] hover:bg-[#E8DFD1] text-[#3A2312] font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" /> Añadir
                          </button>
                          <button
                            onClick={() => onOpenProductModal(product)}
                            className="py-2 px-2 rounded-xl bg-[#3A2312] hover:bg-[#261509] text-[#C49A2C] font-bold text-xs flex items-center justify-center gap-1 transition cursor-pointer"
                          >
                            Configurar
                          </button>
                        </div>

                        {/* Quick 1-click WhatsApp */}
                        <a
                          href={whatsappQuickUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full mt-2 py-1.5 text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 flex items-center justify-center gap-1 transition"
                        >
                          <MessageCircle className="w-3 h-3 text-emerald-600" />
                          <span>Pedir por WhatsApp en 1 Clic</span>
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};
