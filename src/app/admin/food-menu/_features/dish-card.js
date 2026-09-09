import { Pencil } from "lucide-react";

export function DishCard({ name, price, ingredients, image }) {
  return (
    <article className="rounded-xl border border-border bg-white p-3">
      <div className="relative">
        {image ? (
          <img src={image} alt={name} className="aspect-4/3 w-full rounded-lg object-cover" />
        ) : (
          <div className="aspect-4/3 w-full rounded-lg bg-zinc-100" />
        )}
        <button type="button" className="absolute -bottom-3 right-3 flex size-9 items-center justify-center rounded-full border border-border bg-white text-[#EF4444] shadow-sm">
          <Pencil className="size-4" />
        </button>
      </div>

      <div className="mt-5 flex items-start justify-between gap-2">
        <h4 className="text-sm font-semibold text-[#EF4444]">{name}</h4>
        <span className="text-sm font-medium">{price}</span>
      </div>
      <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{ingredients}</p>
    </article>
  );
}