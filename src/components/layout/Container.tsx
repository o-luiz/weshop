import React from "react";
import { OrderSummary } from "../OrderSummary/OrderSummary";
import { ShoppingCartList } from "../ShoppingCartList/ShoppingCartList";

function Container() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-gray-50 min-h-[100vh] py-6 sm:py-12">
      <div className="mx-auto flex flex-col w-full h-full max-w-[1440px] flex-col gap-10 lg:gap-20 mt-20 bg-purple-300/0  lg:flex-row p-4">
        <div className="flex-1 basis-4/6 bg-emerald-300/0 p-0">
          <ShoppingCartList />
        </div>
        <div className="flex-1 basis-2/6 bg-blue-300/0 p-0 md:max-w-[350px] sm:self-end lg:self-auto">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}

export { Container };
