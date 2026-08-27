import type { ItemProvedor } from "@/types";

export const initialProvedorItems: ItemProvedor[] = [
  {
    id: "item-1",
    name: "Fone Bluetooth Noise",
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&q=80",
    retail: "R$ 189,90",
    wholesale: "R$ 149,90",
    stock: "42 un",
    salesCount: 156,
    isService: false,
  },
  {
    id: "item-2",
    name: "Smartwatch Sport GPS",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
    retail: "R$ 299,00",
    wholesale: "R$ 239,00",
    stock: "18 un",
    salesCount: 98,
    isService: false,
  },
  {
    id: "item-3",
    name: "Carregador Fast Charge",
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&q=80",
    retail: "R$ 79,90",
    wholesale: "R$ 59,90",
    stock: "65 un",
    salesCount: 210,
    isService: false,
  },
];
