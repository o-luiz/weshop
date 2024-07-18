import { useShoppingCartContext } from "@/contexts/ShoppingCartContext";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { useState } from "react";
import { clamp } from "../../lib/math";
import { calculateShoppingCartSubtotal } from "../../lib/shoppingCartUtils";
import {
  calculatePriceWithDiscount,
  calculateTotalWithDiscountPerItem,
} from "@/lib/shoppingCartUtils";

function OrderSummary() {
  const {
    discountPercentage,
    subtotal,
    total,
    items,
    handleDiscountPercentageChange,
  } = useShoppingCartContext();

  const [discountValue, setDiscountValue] = useState(() => discountPercentage);

  const handleChangeDiscountValue = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = parseFloat(event.target.value);
    setDiscountValue(clamp(value, 0, 100));
  };

  return (
    <Card className="min-w-[200px] shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">Cupom de desconto</CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="grid gap-4">
          <Label htmlFor="discount" className="text-gray-400 font-medium">
            Porcentagem de desconto
          </Label>
          <div className="flex gap-2">
            <Input
              id="discount"
              type="number"
              min="0"
              max="100"
              placeholder="13"
              value={discountValue}
              onChange={handleChangeDiscountValue}
            />
            <Button
              onClick={() => handleDiscountPercentageChange(discountValue)}
              className="bg-green-600 hover:bg-green-700"
            >
              Aplicar desconto
            </Button>
          </div>
        </div>
      </CardContent>
      <Separator />
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">Resumo da compra</CardTitle>
      </CardHeader>
      <CardContent className="text-md pt-0">
        <div className="grid gap-1">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">Subtotal</span>
            <span className="">
              R$ {calculatePriceWithDiscount(subtotal, 0).toFixed(2)}
            </span>
          </div>
          <div className="flex items-center justify-between mb-4 text-gray-400">
            <span className="text-sm">
              Desconto ({discountPercentage}
              %)
            </span>
            <span className="font text-green-600">
              -R$ {((subtotal * discountPercentage) / 100).toFixed(2)}
            </span>
          </div>
          <div className="flex items-center justify-between font-semibold">
            <span>Total</span>
            <span>
              R${" "}
              {calculatePriceWithDiscount(
                calculateShoppingCartSubtotal(items),
                discountPercentage
              )?.toFixed(2)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export { OrderSummary };
