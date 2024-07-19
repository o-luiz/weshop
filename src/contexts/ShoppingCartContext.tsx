import { clamp } from "@/lib/math";
import {
  calculateOrderTotals,
  calculatePriceWithDiscount,
  calculateShoppingCartSubtotal,
  calculateTotalWithDiscountPerItem,
  createShoppingCartItem,
} from "@/lib/shoppingCartUtils";
import { getProducts } from "@/services/getProducts";
import { CartItem, Product } from "@/types";
import { stat } from "fs";
import { get } from "http";
import { useContext, useState, createContext, useReducer } from "react";

type ShoppingCart = {
  items: CartItem[];
  discountPercentage: number;
  subtotal: number;
  total: number;
};

const SHOPPING_CART_INITIAL_STATE: ShoppingCart = {
  items: [],
  discountPercentage: 15,
  subtotal: 0,
  total: 0,
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

function shoppingCartReducer(
  state: ShoppingCart = SHOPPING_CART_INITIAL_STATE,
  action: ShoppingCartActions
) {
  switch (action.type) {
    case ShoppingCartActionTypes.DISCOUNT_CHANGED: {
      let discountPercentage = isNaN(action.discountPercentage)
        ? 0
        : clamp(action.discountPercentage, 0, 100);

      const subtotal = calculateShoppingCartSubtotal(state.items);

      const { total } = calculateOrderTotals(state.items, discountPercentage);

      // TODO: validate discountPercentage and calculate subtotal and total
      return {
        ...state,
        subtotal,
        total,
        discountPercentage,
      };
    }
    case ShoppingCartActionTypes.ITEM_REMOVED: {
      const items = state.items.filter((item) => item.id !== action.productId);
      const { total } = calculateOrderTotals(items, state.discountPercentage);

      const subtotal = calculateShoppingCartSubtotal(items);

      return {
        ...state,
        items,
        subtotal,
        total,
      };
    }
    case ShoppingCartActionTypes.ITEM_QTY_INCREASED: {
      const items = state.items.map((item) =>
        item.id === action.productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      const { total, subtotal } = calculateOrderTotals(
        items,
        state.discountPercentage
      );

      //const subtotal = calculateShoppingCartSubtotal(items);

      return {
        ...state,
        items,
        subtotal,
        total,
      };
    }
    case ShoppingCartActionTypes.ITEM_QTY_DECREASED: {
      const items = state.items.map((item) => {
        if (item.id != action.productId) return item;
        return {
          ...item,
          quantity: Math.max(1, item.quantity - 1),
        };
      });

      const { total, subtotal } = calculateOrderTotals(
        items,
        state.discountPercentage
      );

      // const subtotal = calculateShoppingCartSubtotal(items);

      return {
        ...state,
        total,
        subtotal,
        items,
      };
    }

    default:
      return state;
  }
}

function shoppingCartReducerInitFn(state: ShoppingCart) {
  const products = getProducts().map((product) =>
    createShoppingCartItem(product, state.discountPercentage)
  );

  const subtotal = calculateShoppingCartSubtotal(products);
  const subtotalWithFlatDiscount = calculatePriceWithDiscount(
    subtotal,
    state.discountPercentage
  );

  const subtotalWithDiscountPerItem =
    calculateTotalWithDiscountPerItem(products);

  const difference = subtotalWithFlatDiscount - subtotalWithDiscountPerItem;

  /*console.log("subtotalWithFlatDiscount", subtotalWithFlatDiscount);
  console.log("subtotalWithDiscountPerItem", subtotalWithDiscountPerItem);
  console.log("difference", difference);

  console.log("products", products, subtotal, subtotalWithFlatDiscount);*/

  return {
    ...state,
    items: products,
    subtotal,
    total: subtotalWithFlatDiscount,
  };
}

const ShoppingCartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, dispatch] = useReducer(
    shoppingCartReducer,
    SHOPPING_CART_INITIAL_STATE,
    shoppingCartReducerInitFn
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
