import { CartProvider } from "@/providers/cart-provider";

import { Header } from "./_components/header";
import { CartSheet } from "./_features/cart-sheet";

export default function MainLayout({ children }) {
  return (
    <CartProvider>
      <Header />
      <main className="flex-1">{children}</main>
      <CartSheet />
    </CartProvider>
  );
}
