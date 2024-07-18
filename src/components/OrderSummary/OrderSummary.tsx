import { useShoppingCartContext } from "@/contexts/ShoppingCartContext";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

function handleDiscountChange(event: React.ChangeEvent<HTMLInputElement>) {
  console.log(event.target.value);
}

function handleApplyDiscount() {
  console.log("apply discount");
}

function OrderSummary() {
  const { discountPercentage, subtotal, total } = useShoppingCartContext();

  return (
    // <div className="grid gap-6 bg-green-300/0">
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
              placeholder="Enter discount percentage"
              value={discountPercentage}
              onChange={handleDiscountChange}
            />
            <Button
              onClick={handleApplyDiscount}
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
            <span className="">R$ {subtotal?.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between mb-4 text-gray-400">
            <span className="text-sm">
              Desconto ({discountPercentage}
              %)
            </span>
            <span className="font text-green-600">
              -R$ {discountPercentage?.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center justify-between font-semibold">
            <span>Total</span>
            <span>R$ {total.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
    // </div>
  );
}

export { OrderSummary };
