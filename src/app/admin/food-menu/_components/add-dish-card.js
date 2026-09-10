import { Plus } from "lucide-react";

export function AddDishCard({ category, onAdd }) {
  return (
    <button
      type="button"
      onClick={onAdd}
      className="group flex min-h-[220px] flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-[#EF4444] p-4 text-center cursor-pointer transition-all duration-200 ease-out hover:bg-[#EF4444]/5 hover:border-solid active:scale-[0.98]"
    >
      <span className="flex size-9 items-center justify-center rounded-full bg-[#EF4444] text-white transition-transform duration-200 ease-out group-hover:scale-110 group-hover:rotate-90">
        <Plus className="size-4" />
      </span>
      <p className="text-sm font-medium">Add new Dish to {category}</p>
    </button>
  );
}
