import type { Product, CartItem } from "@/types";

export const products: Product[] = [
  {
    id: 1,
    name: "Fone Bluetooth Noise",
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&q=80",
    retail: "R$ 189,90 - Varejo",
    wholesale: "R$ 149,90 - Atacado",
    hot: true,
  },
  {
    id: 2,
    name: "Vela aromática artesanal 150g",
    image: "https://images.unsplash.com/photo-1602874801007-bd36c0d5e75c?w=400&q=80",
    retail: "R$ 18,00 - Varejo",
    wholesale: "R$ 32,00 - Atacado",
  },
  {
    id: 3,
    name: "Sabonete artesanal 90g",
    image: "https://images.unsplash.com/photo-1600857062241-98c4198f2e5e?w=400&q=80",
    retail: "R$ 7,99 - Varejo",
    wholesale: "R$ 12,90 - Atacado",
  },
  {
    id: 4,
    name: "Difusor de ambiente 100ml",
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&q=80",
    retail: "R$ 15,00 - Varejo",
    wholesale: "R$ 28,00 - Atacado",
    hot: true,
  },
  {
    id: 5,
    name: "Kit 10 artes para Instagram",
    image: null,
    badge: "PACOTE COM 10 ARTES PARA REDES SOCIAIS",
    retail: "R$ 70,00 - Varejo",
    wholesale: "R$ 180,00 - Atacado",
  },
  {
    id: 6,
    name: "Personalização de camisetas",
    image: null,
    badge: "CAMISETA PERSONALIZADA",
    retail: "R$ 25,00 - Varejo",
    wholesale: "R$ 50,00 - Atacado",
  },
];

export const cartItems: CartItem[] = [
  {
    id: 1,
    name: "Kit 10 artes para Instagram",
    price: "R$ 189,90",
    category: "Varejo",
    image: "https://images.unsplash.com/photo-1600857062241-98c4198f2e5e?w=200&q=80",
  },
  {
    id: 2,
    name: "Kit 10 artes para Instagram",
    price: "R$ 189,90",
    category: "Varejo",
    image: null,
    accent: true,
  },
  {
    id: 3,
    name: "Kit 10 artes para Instagram",
    price: "R$ 189,90",
    category: "Varejo",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=200&q=80",
  },
];
