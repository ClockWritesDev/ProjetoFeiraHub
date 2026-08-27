export interface Product {
  id: number;
  name: string;
  image: string | null;
  badge?: string;
  retail: string;
  wholesale: string;
  hot?: boolean;
}

export interface CartItem {
  id: number | string;
  name: string;
  price: string;
  category: string;
  image: string | null;
  accent?: boolean;
}

export interface CustomerForm {
  name: string;
  address: string;
}

export type SearchTab = "Produtos" | "Vendedores" | "Serviços";
