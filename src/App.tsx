import { useState, useEffect } from 'react';
import { CategoryId, GenderFilter, Currency, Product, CartItem, ShippingMethodId } from './types';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CatalogSection } from './components/CatalogSection';
import { ArtisanStory } from './components/ArtisanStory';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CustomTailoringModal } from './components/CustomTailoringModal';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

const STORAGE_KEY = 'creaciones_sl_cart_v1';

export default function App() {
  // Navigation & Filtering State
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortMethod, setSortMethod] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [filterStockOnly, setFilterStockOnly] = useState(false);
  const [filterCustomOnly, setFilterCustomOnly] = useState(false);
  const [selectedGender, setSelectedGender] = useState<GenderFilter | null>(null);

  // Currency & Shipping
  const [currency, setCurrency] = useState<Currency>('PEN');
  const [shippingMethodId, setShippingMethodId] = useState<ShippingMethodId>('shalom-prov');

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activePdpProduct, setActivePdpProduct] = useState<Product | null>(null);
  const [isTailoringModalOpen, setIsTailoringModalOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<{
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
  } | null>(null);

  // Cart State with LocalStorage persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Ignore
    }
  }, [cart]);

  // Cart Handlers
  const handleAddToCart = (newItem: Omit<CartItem, 'id'>) => {
    const itemWithId: CartItem = {
      ...newItem,
      id: `${newItem.productId}-${Date.now()}`,
    };
    setCart((prev) => [...prev, itemWithId]);
    setIsCartOpen(true);
  };

  const handleQuickAddToCart = (product: Product) => {
    handleAddToCart({
      productId: product.id,
      title: product.title,
      pricePEN: product.pricePEN,
      img: product.img,
      quantity: 1,
      sizeMode: 'standard',
      sizeSpecs: 'Talla Estándar M (Estándar)',
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleResetFilters = () => {
    setActiveCategory('all');
    setSearchQuery('');
    setSortMethod('featured');
    setFilterStockOnly(false);
    setFilterCustomOnly(false);
    setSelectedGender(null);
  };

  const handleConfirmOrder = (orderData: {
    orderId: string;
    buyerName: string;
    phone: string;
    city: string;
    address: string;
    is50Percent: boolean;
    paymentMethod: 'yape' | 'card' | 'bank';
    finalAmountString: string;
  }) => {
    const itemsSummary = cart
      .map((i) => `• ${i.quantity}x ${i.title} (${i.sizeSpecs})`)
      .join('\n');

    setConfirmedOrder({
      ...orderData,
      itemsCount: cart.reduce((s, i) => s + i.quantity, 0),
      itemsSummary,
    });

    // Clear cart after order confirmation
    setCart([]);
    setIsCheckoutOpen(false);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="linen-pattern min-h-screen text-[#3A2312] antialiased flex flex-col selection:bg-[#C49A2C] selection:text-[#261509]">
      {/* Top Announcement Bar */}
      <AnnouncementBar />

      {/* Sticky Header with Navigation & Cart Trigger */}
      <Header
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        currency={currency}
        onToggleCurrency={setCurrency}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenTailoringGuide={() => setIsTailoringModalOpen(true)}
      />

      {/* Hero Artisan Banner */}
      <Hero onOpenTailoringGuide={() => setIsTailoringModalOpen(true)} />

      {/* Main Interactive Catalog */}
      <CatalogSection
        activeCategory={activeCategory}
        onSelectCategory={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortMethod={sortMethod}
        onSortChange={setSortMethod}
        filterStockOnly={filterStockOnly}
        onToggleStockOnly={setFilterStockOnly}
        filterCustomOnly={filterCustomOnly}
        onToggleCustomOnly={setFilterCustomOnly}
        selectedGender={selectedGender}
        onSelectGender={setSelectedGender}
        onResetFilters={handleResetFilters}
        currency={currency}
        onOpenProductModal={(p) => setActivePdpProduct(p)}
        onQuickAddToCart={handleQuickAddToCart}
      />

      {/* Artisan Workshop Narrative Section */}
      <ArtisanStory />

      {/* FAQ & Shipping Information */}
      <FaqSection />

      {/* Footer */}
      <Footer
        onSelectCategory={setActiveCategory}
        onOpenTailoringGuide={() => setIsTailoringModalOpen(true)}
      />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        shippingMethodId={shippingMethodId}
        onSelectShippingMethod={setShippingMethodId}
        currency={currency}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Product Detail Modal (PDP) with Standard & Custom Measurements */}
      <ProductDetailModal
        product={activePdpProduct}
        onClose={() => setActivePdpProduct(null)}
        currency={currency}
        onAddToCart={handleAddToCart}
      />

      {/* Custom Tailoring & Sizing Guide Modal */}
      <CustomTailoringModal
        isOpen={isTailoringModalOpen}
        onClose={() => setIsTailoringModalOpen(false)}
      />

      {/* 2-Step Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        shippingMethodId={shippingMethodId}
        currency={currency}
        onConfirmOrder={handleConfirmOrder}
      />

      {/* Order Confirmation Receipt Modal */}
      <OrderConfirmationModal
        order={confirmedOrder}
        onClose={() => setConfirmedOrder(null)}
      />

      {/* Floating WhatsApp CTA (hidden when any modal or drawer is open to prevent overlap) */}
      <FloatingWhatsApp
        isHidden={
          isCartOpen ||
          !!activePdpProduct ||
          isTailoringModalOpen ||
          isCheckoutOpen ||
          !!confirmedOrder
        }
      />
    </div>
  );
}
