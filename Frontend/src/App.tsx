import { useState } from "react";
import Header from "@/components/Header";
import Banner from "@/components/Banner";
import ProductSection from "@/components/ProductSection";
import CartDrawer from "@/components/CartDrawer";
import { products, cartItems as initialCartItems } from "@/data/products";
import type { CartItem, CustomerForm, Product, SearchTab } from "@/types";

export default function App() {
  const [searchFocused, setSearchFocused] = useState(false);
  const [activeTab, setActiveTab] = useState<SearchTab>("Vendedores");
  const [cartOpen, setCartOpen] = useState(false);
  const [items, setItems] = useState<CartItem[]>(initialCartItems);
  const [form, setForm] = useState<CustomerForm>({ name: "", address: "" });

  const handleAddToCart = (product: Product) => {
    const newItem: CartItem = {
      id: `${product.id}-${Date.now()}`,
      name: product.name,
      price: product.retail.split(" - ")[0],
      category: "Varejo",
      image: product.image,
    };
    setItems((prev) => [...prev, newItem]);
    setCartOpen(true);
  };

  const handleRemove = (id: CartItem["id"]) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleConfirm = () => {
    alert(`Compra confirmada para ${form.name || "cliente"}!`);
    setCartOpen(false);
  };

  return (
    <div
      className="min-h-screen bg-background"
      onClick={() => searchFocused && setSearchFocused(false)}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <Header
          searchFocused={searchFocused}
          onFocusSearch={() => setSearchFocused(true)}
          activeTab={activeTab}
          onChangeTab={setActiveTab}
          cartCount={items.length}
          onToggleCart={() => setCartOpen((v) => !v)}
        />
      </div>

      <main>
        <Banner />
        <ProductSection title="Destaques" items={products} onAdd={handleAddToCart} />
        <ProductSection
          title="Achadinhos do Centro Sul"
          items={[...products, ...products]}
          wrap
          onAdd={handleAddToCart}
        />
      </main>

      <CartDrawer
        open={cartOpen}
        items={items}
        onRemove={handleRemove}
        onClose={() => setCartOpen(false)}
        onConfirm={handleConfirm}
        form={form}
        setForm={setForm}
      />
    </div>
  );
}
