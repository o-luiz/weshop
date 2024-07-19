import { CartItem, Product } from "@/types";
import { precisionFloor } from "./math";

export function createShoppingCartItem(
  product: Product,
  discount: number = 0
): CartItem {
  return {
    ...product,
    quantity: 1,
    discountedPrice: calculatePriceWithDiscount(product.price, discount),
    subtotal: product.price,
  };
}

export function calculateShoppingCartSubtotal(items: CartItem[]) {
  return items.reduce((acc, item) => acc + item.subtotal, 0);
}

export function calculatePriceWithDiscount(
  price: number,
  discount: number
): number {
  return precisionFloor(price * (1 - discount / 100), 2);
}

export function calculateTotalWithDiscountPerItem(items: CartItem[]): number {
  return items.reduce((acc, item) => acc + item.discountedPrice, 0);
}

export function calculateOrderTotals(
  items: CartItem[],
  discountPercentage: number = 0
) {
  const itemsWithDiscount = items.map((item) => {
    const discountedPrice = calculatePriceWithDiscount(
      item.price,
      discountPercentage
    );
    return {
      ...item,
      discountedPrice,
      subtotal: item.quantity * discountedPrice,
    };
  });

  const total = calculateShoppingCartSubtotal(itemsWithDiscount);
  const subtotal = calculateTotalWithDiscountPerItem(itemsWithDiscount);

  return { subtotal, total };
}
