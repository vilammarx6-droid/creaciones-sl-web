export type CategoryId = 'all' | 'chalecos' | 'polleras' | 'comparsas' | 'accesorios';
export type GenderFilter = 'Varón' | 'Dama' | 'Niño/a' | 'Grupal';
export type Currency = 'PEN' | 'USD';

export interface Product {
  id: string;
  title: string;
  category: 'chalecos' | 'polleras' | 'comparsas' | 'accesorios';
  gender: 'Varón' | 'Dama' | 'Niño/a' | 'Grupal';
  tag: string;
  pricePEN: number;
  stock: boolean;
  img: string;
  desc: string;
  delivery: string;
}

export interface CartItem {
  id: string;
  productId: string;
  title: string;
  pricePEN: number;
  img: string;
  quantity: number;
  sizeMode: 'standard' | 'custom';
  sizeSpecs: string;
  measurements?: {
    chest?: string;
    waist?: string;
    hip?: string;
    length?: string;
    height?: string;
    color?: string;
  };
}

export type ShippingMethodId = 'shalom-prov' | 'shalom-lima' | 'olva-domicilio' | 'taller-livitaca';

export interface ShippingMethod {
  id: ShippingMethodId;
  label: string;
  pricePEN: number;
}
