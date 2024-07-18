import { CartItem, Product } from "@/types";

export function createShoppingCartItem(product: Product): CartItem {
  return {
    ...product,
    quantity: 1,
    discountedPrice: product.price,
    subtotal: product.price,
  };
}
