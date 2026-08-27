export interface Product {
  id: number | string;
  name: string;
  image: string | null;
  badge?: string;
  retail: string;
  wholesale?: string;
  type?: "produto" | "servico";
  hot?: boolean;
  description?: string;
  sellerName?: string;
}

export interface BannerItem {
  id: string | number;
  storeName: string;
  description: string;
  longDescription?: string;
  image: string;
  phone?: string;
  city?: string;
  category?: string;
  items?: Product[];
  linkUrl?: string;
}

export interface ItemProvedor {
  id: string | number;
  name: string;
  image: string;
  retail: string;
  wholesale?: string;
  stock: string;
  salesCount: number;
  isService: boolean;
}

export interface CartItem {
  id: number | string;
  name: string;
  price: string;
  category: string;
  image: string | null;
  accent?: boolean;
  quantity?: number;
}

export interface CustomerForm {
  name: string;
  address: string;
}

export type SearchTab = "Produtos" | "Vendedores" | "Serviços";
