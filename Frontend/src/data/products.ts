import type { Product, CartItem } from "@/types";

export const mockProducts: Product[] = [
  // --- PRODUTOS & ARTESANATO ---
  {
    id: "prod-1",
    name: "Cesta de Verduras Orgânicas (5kg)",
    image: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=500&auto=format&fit=crop&q=80",
    retail: "R$ 38,00",
    wholesale: "R$ 28,00",
    type: "produto",
  },
  {
    id: "prod-2",
    name: "Mel Puro de Abelha Silvestre 500g",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=500&auto=format&fit=crop&q=80",
    retail: "R$ 25,00",
    wholesale: "R$ 19,50",
    type: "produto",
  },
  {
    id: "prod-3",
    name: "Vela Aromática de Lavanda e Baunilha",
    // Link direto e ativo de vela artesanal aromática:
    image: "https://images.unsplash.com/photo-1508759073847-9ca702cec7d2?w=500&auto=format&fit=crop&q=80",
    retail: "R$ 22,00",
    wholesale: "R$ 16,00",
    type: "produto",
  },
  {
    id: "prod-4",
    name: "Queijo Coalho Tradicional Peça 1kg",
    image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=500&auto=format&fit=crop&q=80",
    retail: "R$ 34,90",
    wholesale: "R$ 29,00",
    type: "produto",
  },
  {
    id: "prod-5",
    name: "Bolsa de Macramê Trançada à Mão",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500&auto=format&fit=crop&q=80",
    retail: "R$ 65,00",
    wholesale: "R$ 48,00",
    type: "produto",
  },
  {
    id: "prod-6",
    name: "Vaso de Cerâmica Artesanal em Argila",
    image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=500&auto=format&fit=crop&q=80",
    retail: "R$ 45,00",
    wholesale: "R$ 32,00",
    type: "produto",
  },
  {
    id: "prod-7",
    name: "Boneca e Peças Decorativas de Pano",
    image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500&auto=format&fit=crop&q=80",
    retail: "R$ 28,00",
    wholesale: "R$ 20,00",
    type: "produto",
  },
  {
    id: "prod-8",
    name: "Kit Descanso de Copo em Madeira Entalhada",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=500&auto=format&fit=crop&q=80",
    retail: "R$ 35,00",
    wholesale: "R$ 24,00",
    type: "produto",
  },

  // --- SERVIÇOS ---
  {
    id: "serv-1",
    name: "Lavagem Detalhada e Enceramento Automotivo",
    image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=500&auto=format&fit=crop&q=80",
    retail: "R$ 70,00",
    wholesale: "R$ 60,00",
    type: "servico",
  },
  {
    id: "serv-2",
    name: "Pacote 10 Artes Digitais para Redes Sociais",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=500&auto=format&fit=crop&q=80",
    retail: "R$ 120,00",
    wholesale: "R$ 90,00",
    type: "servico",
  },
  {
    id: "serv-3",
    name: "Design de Sobrancelhas com Henna",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=500&auto=format&fit=crop&q=80",
    retail: "R$ 45,00",
    type: "servico",
  },
  {
    id: "serv-4",
    name: "Formatação e Manutenção de Computadores",
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&auto=format&fit=crop&q=80",
    retail: "R$ 80,00",
    type: "servico",
  },
];

export const cartItems: CartItem[] = [];
