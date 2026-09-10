import { Plus } from "lucide-react";

export function FoodCard({ dish }) {
  return (
    <article className="group rounded-2xl bg-white p-3 shadow-sm transition-all duration-200 ease-out hover:shadow-md">
      <div className="relative overflow-hidden rounded-xl">
        {dish.image ? (
          <img
            src={dish.image}
            alt={dish.name}
            className="aspect-4/3 w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="aspect-4/3 w-full bg-zinc-100" />
        )}
        <button
          type="button"
          className="absolute bottom-2 right-2 flex size-9 items-center justify-center rounded-full bg-white text-[#EF4444] shadow-md transition-all duration-200 ease-out hover:scale-110 hover:bg-[#EF4444] hover:text-white active:scale-95 cursor-pointer"
        >
          <Plus className="size-4" />
        </button>
      </div>

      <div className="mt-3 flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold text-[#EF4444]">{dish.name}</h3>
        <span className="shrink-0 text-sm font-medium">${dish.price}</span>
      </div>
      <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
        {dish.ingredients}
      </p>
    </article>
  );
}
