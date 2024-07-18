import { CartItem } from "@/types";
import { useContext, useState, createContext } from "react";

type ShoppingCart = {
  discount: number;
  items: CartItem[];
};

type ShoppingCartContextData = {
  discountPercentage: number;
  setDiscountPercentage: (discountPercentage: number) => void;

  setCart: (cart: any) => void;
};

type ShoppingCartActionTypes =
  | {
      type: "discountChanged";
      discountPercentage: number;
    }
  | {
      type: "removeFromCart";
      productId: number;
    };

function shoppingCartReducer(state: any, action: ShoppingCartActionTypes) {
  switch (action.type) {
    case "":
      return [...state, action.payload];
    case "removeFromCart":
      return state.filter((item) => item.id !== action.payload);
    default:
      return state;
  }
}

const ShoppingCartContext = createContext<any>(null);

const ShoppingCartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<any>([]);

  return (
    <ShoppingCartContext.Provider value={{ cart, setCart }}>
      {children}
    </ShoppingCartContext.Provider>
  );
};

const useShoppingCartContext = () => {
  const context = useContext(ShoppingCartContext);
  if (context === undefined) {
    throw new Error(
      "useShoppingCartContext must be used within a ShoppingCartProvider"
    );
  }
  return context;
};

export { ShoppingCartProvider, useShoppingCartContext };
