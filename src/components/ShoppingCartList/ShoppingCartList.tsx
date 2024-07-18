import { useState } from "react";
import { Button } from "../ui/button";
import { MinusIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "../ui/separator";
import { CartItem, Product } from "@/types";

function ShoppingCartList() {
  const [cartItems, setCartItems] = useState<Partial<CartItem>[]>([
    {
      id: 1,
      name: "Acme Circles T-Shirt",
      description: "60% combed ringspun cotton",
      price: 100099,
      quantity: 2,
      image: "https://via.placeholder.com/150/d32776",
    },
    {
      id: 2,
      name: "Sunset Beach Shorts",
      description: "Quick-Dry Swim Shorts",
      price: 34.99,
      quantity: 1,
      image: "https://via.placeholder.com/150/d32776",
    },
    {
      id: 3,
      name: "Sunset Beach Towel",
      description: "Absorbent Cotton Towel",
      price: 19.99,
      quantity: 1,
      image: "https://via.placeholder.com/150/d32776",
    },
  ]);

  const [discountPercentage, setDiscountPercentage] = useState(12);
  const discount = 12;
  const subtotal = 100;
  const total = 120;

  return (
    <div className="border rounded-lg overflow-hidden w-full lg:max-w-80% md:max-w-full bg-white">
      <div className="bg-zinc-50/40 px-6 py-4 w-full">
        <h2 className="text-xl font-semibold">Meu carrinho</h2>
      </div>
      <div className="p-6 space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="grid md:grid-cols-[80px_1fr_80px_100px_48px]  items-center gap-3 md:gap-6"
          >
            <img
              src={
                "https://m.media-amazon.com/images/I/61j3SEUjMJL._AC_SY450_.jpg"
              }
              alt="Product Image"
              width={80}
              height={80}
              className="rounded-md object-cover"
            />
            <div className="flex-1">
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm text-muted-foreground">
                {item?.description || 0}
              </p>
              <p className="text-sm text-muted-foreground bg-purple-300/0 flex items-center mt-2">
                <span className="text-sm text-gray-400">Preço:</span>
                <div className="flex justify-end">
                  <div className="flex flex-row items-center gap-2">
                    <span className="flex gap-2 items-center ml-2">
                      $
                      {(item.price * (1 - discountPercentage / 100)).toFixed(2)}
                    </span>
                    {discountPercentage != 0 ? (
                      <>
                        <span className="text-xs text-gray-400 line-through">
                          ${item.price?.toFixed(2)}
                        </span>
                        <span className="rounded-xl bg-green-200 font-white text-[10px] font-medium text-green-800 px-1.5 py-0.25 -ml-1">
                          -{discountPercentage}%
                        </span>
                      </>
                    ) : null}
                  </div>
                </div>
              </p>
            </div>
            <div className="flex items-center justify-between border rounded-md p-1 gap-2 border border-width-2 max-w-[80px]">
              <Button
                variant="solid"
                size="small"
                disabled={item.quantity == 1}
              >
                <MinusIcon className="h-3 w-3" />
                <span className="sr-only">Decrease quantity</span>
              </Button>
              <span className="text-sm">{item.quantity}</span>
              <Button variant="ghost" size="smal">
                <PlusIcon className="h-3 w-3" />
                <span className="sr-only">Increase quantity</span>
              </Button>
            </div>
            <div className="flex sm:flex-rowjustify-end items-end text-right  text-gray-600">
              <span className="md:hidden text-sm mr-2 text-gray-400">
                Subtotal:
              </span>
              <span className="">
                $
                {(
                  item.quantity *
                  item.price *
                  (1 - discountPercentage / 100)
                ).toFixed(2)}
              </span>
            </div>
            <div className="flex items-end justify-start gap-0 p-0  mb-2">
              <Popover className="text-sm">
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="hover:bg-red-300/10 flex gap-1 sm:border-red-300 md:border-0"
                    size="default"
                  >
                    <Trash2Icon className="h-4 w-4 stroke-red-500" />
                    <span className="md:hidden text-gray-400">Remover</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="text-sm max-w-52">
                  <div className="text-gray-500 text-sm mb-4">
                    Tem certeza que deseja remover esse item do seu carrinho?
                  </div>
                  <div className="flex gap-2 justify-between text-sm">
                    <Button variant="outline" className="py-1 px-3 h-fit">
                      Cancelar
                    </Button>
                    <Button variant="destructive" className="py-1 px-3 h-fit">
                      Remover
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <Separator className="w-full md:hidden mb-4" />
            {/* <span className="sr-only">Remove</span> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export { ShoppingCartList };
