export type Product = {
  id: number;
  name: string;
  description?: string;
  price: number;
  image: string;
};

export type CartItem = Product & {
  quantity: number;
  discountedPrice: number;
  subtotal: number;
};
