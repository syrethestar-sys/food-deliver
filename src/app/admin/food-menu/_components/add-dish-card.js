import { Plus } from "lucide-react";

export function AddDishCard({ category }) {
  return (
    <div className="flex min-h-[220px] flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-[#EF4444] p-4 text-center">
      <span className="flex size-9 items-center justify-center rounded-full bg-[#EF4444] text-white">
        <Plus className="size-4" />
      </span>
      <p className="text-sm font-medium">Add new Dish to {category}</p>
    </div>
  );
}
