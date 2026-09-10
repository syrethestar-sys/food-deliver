import { Pencil } from "lucide-react";
import { useState } from "react";

export function DishCard({ name, price, ingredients, image, id, onEdit }) {
  return (
    <article className="group rounded-xl border border-border bg-white p-3 transition-all duration-200 ease-out hover:shadow-md hover:border-[#EF4444]/30">
      <div className="relative">
        <div className="overflow-hidden rounded-lg">
          {image ? (
            <img
              src={image}
              alt={name}
              className="aspect-4/3 w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="aspect-4/3 w-full bg-zinc-100" />
          )}
        </div>
        <button
          onClick={onEdit}
          type="button"
          className="absolute -bottom-3 right-3 flex size-9 items-center justify-center rounded-full border border-border bg-white text-[#EF4444] shadow-sm cursor-pointer transition-[transform,background-color,color] duration-200 ease-out hover:scale-110 hover:bg-[#EF4444] hover:text-white active:scale-95"
        >
          <Pencil className="size-4" />
        </button>
      </div>

      <div className="mt-5 flex items-start justify-between gap-2">
        <h4 className="text-sm font-semibold text-[#EF4444]">{name}</h4>
        <span className="text-sm font-medium">${price}</span>
      </div>
      <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
        {ingredients}
      </p>
    </article>
  );
}
