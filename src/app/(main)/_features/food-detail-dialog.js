import { useCart } from "@/providers/cart-provider";
import { useEffect, useState } from "react";

export const FoodDetailDialog = ({ dish, onClose }) => {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => setQuantity(1), [dish]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!dish) return null;

  const handleAdd = () => {
    addItem(dish, quantity);
    onClose();
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div className="flex w-130 overflow-hidden rounded-2xl bg-white shadow-xl">
        <img
          src={dish.image}
          alt={dish.name}
          className="h-64 w-56 object-cover"
        />

        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-semibold text-[#EF4444]">
              {dish.name}
            </h3>
            <button type="button" onClick={onClose}>
              ✕
            </button>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            {dish.ingredients}
          </p>

          <div className="mt-auto flex items-center justify-between pt-6">
            <div>
              <p className="text-xs text-muted-foreground">Total price</p>
              <p className="text-lg font-semibold">
                ${(dish.price * quantity).toFixed(2)}
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-full border px-2 py-1">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                −
              </button>
              <span className="w-4 text-center">{quantity}</span>
              <button type="button" onClick={() => setQuantity((q) => q + 1)}>
                +
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className="mt-4 rounded-lg bg-[#18181B] py-2.5 text-sm font-medium text-white"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};
