import { Product, ShippingMethod } from '../types';

export const LOGO_IMAGE = '/logo.jpg';
export const EMBROIDERY_IMAGE_ALT = 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1giQcAZY-PuropznmlHe0i6-AdxUFnOKsdBbuTMbfOAnIIAZR-zagPm7n46pnlyqm1PZiHUdJZ75yp3ptsECGRUb3WQ1ko2KwlFhTaz6W4YrbZFyNmu1BiclHZP8IG-lWW_i2tjT7P78t6pBMYq-HbGqGaGj8MFf3UTi-kGf8fT545nwdGS3FErt2HTXPEDNJxr6Fall-_L_M_FqLrAcrTZK-0IOkCWaVg4P5TeXFUpX8FUVN4898mTwdJEexcsY5XQ';

export const PRODUCTS: Product[] = [
  {
    id: 'SL-01',
    title: "Chaleco de Q'orilazo en Alto Relieve",
    category: 'chalecos',
    gender: 'Varón',
    tag: 'Bordado a Mano & Máquina',
    pricePEN: 380,
    stock: true,
    img: LOGO_IMAGE,
    desc: "El clásico chaleco chumbivilcano para jinete y gala. Elaborado en fino paño negro con bordado tupido en espirales, flores andinas y aves en hilos oro y cobre. Reforzado para faenas y fiestas.",
    delivery: "En stock (entrega 48-72h) o confección a medida en 12 días."
  },
  {
    id: 'SL-02',
    title: "Chaquetilla de Gala Femenina de Livitaca",
    category: 'polleras',
    gender: 'Dama',
    tag: 'Alta Costura Andina',
    pricePEN: 420,
    stock: true,
    img: EMBROIDERY_IMAGE_ALT,
    desc: "Chaquetilla tradicional con pechera bordada en alto relieve, cuello militar decorado y bocamangas con motivos florales de Chumbivilcas. Entallado elegante y resistente.",
    delivery: "Tallas estándar disponibles. Confección a medida en 12 días."
  },
  {
    id: 'SL-03',
    title: "Pollera Multicolor de Danza Livitaqueña",
    category: 'polleras',
    gender: 'Dama',
    tag: 'Bordado de Alta Puntada',
    pricePEN: 350,
    stock: true,
    img: LOGO_IMAGE,
    desc: "Pollera con ruedo amplio en bayeta fina, franjas multicolores con bordados de flora nativa y cinta tejida tradicional. Acabado de gran vistosidad para danzas.",
    delivery: "En stock para despacho rápido."
  },
  {
    id: 'SL-04',
    title: "Chaleco de Faena y Takanakuy Livitaca",
    category: 'chalecos',
    gender: 'Varón',
    tag: 'Doble Refuerzo',
    pricePEN: 320,
    stock: true,
    img: EMBROIDERY_IMAGE_ALT,
    desc: "Chaleco de alta resistencia con cuero y paño bordado con motivos del cóndor y el ave fénix andino. Diseñado especialmente para la fiesta del 25 de diciembre y patronales.",
    delivery: "Confección inmediata en stock."
  },
  {
    id: 'SL-05',
    title: "Traje Completo para Comparsas (Conjunto)",
    category: 'comparsas',
    gender: 'Grupal',
    tag: 'Precio por Lote',
    pricePEN: 650,
    stock: false,
    img: LOGO_IMAGE,
    desc: "Juego completo que incluye chaleco bordado, pantalón de montar, faja y montera o pañolón. Ideal para conjuntos de comparsas, danzas y centros representativos.",
    delivery: "Confección por encargo (10 a 20 días según cantidad)."
  },
  {
    id: 'SL-06',
    title: "Chaleco Q'orilazo Infantil para Festividades",
    category: 'chalecos',
    gender: 'Niño/a',
    tag: 'Bordado Liviano',
    pricePEN: 220,
    stock: true,
    img: EMBROIDERY_IMAGE_ALT,
    desc: "Versión especial para niños con la misma majestuosidad del traje adulto pero con peso balanceado y tela fresca para comodidad de los pequeños danzantes.",
    delivery: "En stock tallas 6, 8, 10, 12."
  },
  {
    id: 'SL-07',
    title: "Faja Tradicional y Cinturón Bordado",
    category: 'accesorios',
    gender: 'Varón',
    tag: 'Bordado Telar',
    pricePEN: 110,
    stock: true,
    img: LOGO_IMAGE,
    desc: "Faja de cintura chumbivilcana con remates trenzados y aplicaciones bordadas con hilos dorados y hebilla reforzada.",
    delivery: "En stock para envío inmediato."
  },
  {
    id: 'SL-08',
    title: "Traje de Danza Livitaqueña para Pareja",
    category: 'comparsas',
    gender: 'Grupal',
    tag: 'Dúo de Gala',
    pricePEN: 890,
    stock: false,
    img: EMBROIDERY_IMAGE_ALT,
    desc: "Juego en armonía cromática para danzarines solistas o de comparsa. Chaleco de varón y conjunto de chaqueta y pollera para dama con los mismos matices de bordado.",
    delivery: "Confección a medida en 15 días hábiles."
  }
];

export const SHIPPING_METHODS: ShippingMethod[] = [
  {
    id: 'shalom-prov',
    label: 'Shalom / Marvisur (Recojo en Agencia Cusco/Arequipa/Puno)',
    pricePEN: 15
  },
  {
    id: 'shalom-lima',
    label: 'Shalom / Marvisur (Recojo en Agencia Lima/Norte)',
    pricePEN: 20
  },
  {
    id: 'olva-domicilio',
    label: 'Olva Courier (Directo a Domicilio Nacional)',
    pricePEN: 30
  },
  {
    id: 'taller-livitaca',
    label: 'Recojo personal en Taller Livitaca (Gratis)',
    pricePEN: 0
  }
];

export const EXCHANGE_RATE_USD = 3.75;

export const WHATSAPP_NUMBER = '51953515047';
export const WHATSAPP_DISPLAY = '+51 953 515 047';
export const MASTER_ARTISAN = 'Don Luis Alfredo Shuyen Villalobos';
export const WORKSHOP_LOCATION = 'Jr. Comercio s/n, Livitaca, Chumbivilcas, Cusco - Perú';
