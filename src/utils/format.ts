import { Currency } from '../types';
import { EXCHANGE_RATE_USD, WHATSAPP_NUMBER } from '../data/products';

export function formatPrice(amountPEN: number, currency: Currency): string {
  if (currency === 'USD') {
    const usd = (amountPEN / EXCHANGE_RATE_USD).toFixed(2);
    return `$ ${usd}`;
  }
  return `S/ ${amountPEN.toFixed(2)}`;
}

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
