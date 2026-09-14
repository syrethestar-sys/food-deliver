import { Plus } from "lucide-react";

export function FoodCard({ dish, onSelect }) {
  return (
    <article
      onClick={() => onSelect(dish)}
      className="group rounded-2xl bg-white p-3 shadow-sm transition-all duration-200 ease-out hover:shadow-md"
    >
      <div className="relative overflow-hidden rounded-xl">
        {dish.image ? (
          <img
            src={dish.image}
            alt={dish.name}
            className="aspect-4/3 w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105 cursor-pointer"
          />
        ) : (
          <div className="aspect-4/3 w-full bg-zinc-100" />
        )}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(dish);
          }}
          className="absolute bottom-2 right-2 bg-white rounded-full transform transition-all duration-300 ease-in-out hover:scale-120 hover:shadow-lg active:scale-95 hover:bg-black hover:text-white transition-all duration-300 hover:rotate-180"
        >
          <Plus className="size-5 cursor-pointer " />
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
