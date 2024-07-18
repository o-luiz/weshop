import { Container } from "@/components/layout/Container";
import { ShoppingCartProvider } from "@/contexts/ShoppingCartContext";

function CheckoutPage() {
  return (
    <ShoppingCartProvider>
      <Container />;
    </ShoppingCartProvider>
  );
}

export { CheckoutPage };
