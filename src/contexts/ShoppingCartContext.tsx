import { clamp } from "@/lib/math";
import { CartItem } from "@/types";
import { useContext, useState, createContext, useReducer } from "react";

type ShoppingCart = {
  items: CartItem[];
  discountPercentage: number;
  subtotal: number;
  total: number;
};

const SHOPPING_CART_INITIAL_STATE: ShoppingCart = {
  items: [],
  discountPercentage: 5,
  subtotal: 1220,
  total: 87,
};

type ShoppingCartContextData = ShoppingCart & {
  handleDiscountPercentageChange: (discountPercentage: number) => void;
  handleRemoveItem: (productId: number) => void;
  handleItemQuantityIncrease: (productId: number) => void;
  handleItemQuantityDecrease: (productId: number) => void;
};

const ShoppingCartContext = createContext<ShoppingCartContextData | null>(null);

const ShoppingCartActionTypes = {
  DISCOUNT_CHANGED: "DISCOUNT_CHANGED",
  ITEM_REMOVED: "ITEM_REMOVED",
  ITEM_QTY_INCREASED: "ITEM_QTY_INCREASED",
  ITEM_QTY_DECREASED: "ITEM_QTY_DECREASED",
} as const;

type ShoppingCartActions =
  | {
      type: typeof ShoppingCartActionTypes.DISCOUNT_CHANGED;
      discountPercentage: number;
    }
  | {
      type: typeof ShoppingCartActionTypes.ITEM_REMOVED;
      productId: number;
    }
  | {
      type: typeof ShoppingCartActionTypes.ITEM_QTY_INCREASED;
      productId: number;
    }
  | {
      type: typeof ShoppingCartActionTypes.ITEM_QTY_DECREASED;
      productId: number;
    };

function shoppingCartReducer(state: ShoppingCart, action: ShoppingCartActions) {
  switch (action.type) {
    case ShoppingCartActionTypes.DISCOUNT_CHANGED:
      const discountPercentage = clamp(action.discountPercentage, 0, 100);

      // TODO: validate discountPercentage and calculate subtotal and total
      return {
        ...state,
        discountPercentage,
      };
    case ShoppingCartActionTypes.ITEM_REMOVED:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.productId),
      };
    case ShoppingCartActionTypes.ITEM_QTY_INCREASED:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };
    case ShoppingCartActionTypes.ITEM_QTY_DECREASED:
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id != action.productId) return item;

          return {
            ...item,
            quantity: Math.min(1, item.quantity - 1),
          };
        }),
      };

    default:
      return state;
  }
}

const ShoppingCartProvider = ({ children }: { children: React.ReactNode }) => {
  // const [cart, setCart] = useState<any>([]);

  const [cart, dispatch] = useReducer(
    shoppingCartReducer,
    SHOPPING_CART_INITIAL_STATE
  );

  function handleDiscountPercentageChange(discountPercentage: number) {
    dispatch({
      type: ShoppingCartActionTypes.DISCOUNT_CHANGED,
      discountPercentage,
    });
  }

  function handleRemoveItem(productId: number) {
    dispatch({
      type: ShoppingCartActionTypes.ITEM_REMOVED,
      productId,
    });
  }

  function handleItemQuantityIncrease(productId: number) {
    dispatch({
      type: ShoppingCartActionTypes.ITEM_QTY_INCREASED,
      productId,
    });
  }

  function handleItemQuantityDecrease(productId: number) {
    dispatch({
      type: ShoppingCartActionTypes.ITEM_QTY_DECREASED,
      productId,
    });
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        ...cart,
        handleDiscountPercentageChange,
        handleItemQuantityIncrease,
        handleItemQuantityDecrease,
        handleRemoveItem,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

const useShoppingCartContext = () => {
  const context = useContext(ShoppingCartContext);
  if (context === null) {
    throw new Error(
      "useShoppingCartContext must be used within a ShoppingCartProvider"
    );
  }
  return context;
};

export { ShoppingCartProvider, useShoppingCartContext };
