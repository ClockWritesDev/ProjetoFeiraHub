# PENDENTE
---
## Telas
* [ ] login
* [ ] home_administrador
    * [ ] cadastrar_provedor
* [ ] home_provedor
    * [ ] overlay produto
* [ ] home_cliente
    * [ ] pesquisar
    * [ ] Carrossel de provedores (e seu nome)
    * [ ] Adicionar heading "Provedores (serviços e items)" acima do carrocel
    * [ ] Card produto
* [ ] profile_provedor [ativado via card_produto]

# LOGO
---
```tsx
<Header
  logoSrc="/favicon.svg"
  cityName="Iguatu"
  searchFocused={searchFocused}
  onFocusSearch={() => setSearchFocused(true)}
  activeTab={activeTab}
  onChangeTab={setActiveTab}
  cartCount={items.length}
  onToggleCart={() => setCartOpen(true)}
  onLogin={() => onNavigate("login")}
  onLogoClick={() => onNavigate("inicial")}
/>
```

# MACROS
---
Include:
    tsconfig.json
    README.md
    tsconfig.node.json
    index.html
    src/index.css
    src/App.tsx
    src/types.ts
    src/components/Banner.tsx
    src/components/Header.tsx
    src/components/ui/button.tsx
    src/components/ui/input.tsx
    src/components/ui/card.tsx
    src/components/Footer.tsx
    src/components/ProductSection.tsx
    src/components/CartDrawer.tsx
    src/components/ProductCard.tsx
    src/main.tsx
    src/pages/HomeCliente.tsx
    src/pages/PerfilProvedor.tsx
    src/pages/HomeProvedor.tsx
    src/pages/HomeApresentacao.tsx
    src/pages/HomeAdministrativo.tsx
    src/pages/Login.tsx
    src/data/products.ts
    src/lib/utils.ts
    tsconfig.app.json
    package.json
    vite.config.ts
