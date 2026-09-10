"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { AddCategoryDialog } from "./add-category-dialog";

export function CategoryChips({ chips, totalCount }) {
  const [activeId, setActiveId] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const pill = (on) =>
    on
      ? "rounded-full border border-[#EF4444] bg-white px-4 py-2 text-sm font-medium text-[#EF4444] cursor-pointer transition-all duration-200 ease-out active:scale-[0.97]"
      : "rounded-full border border-border bg-white px-4 py-2 text-sm font-medium cursor-pointer transition-all duration-200 ease-out hover:border-[#EF4444]/50 hover:text-[#EF4444] active:scale-[0.97]";

  return (
    <section className="rounded-2xl bg-white p-6">
      <h2 className="mb-4 text-xl font-semibold">Dishes category</h2>
      <div className="flex flex-wrap items-center gap-3">
        <button className={pill(activeId === null)} onClick={() => setActiveId(null)}>
          All Dishes
          <span className="ml-2 rounded-full bg-[#18181B] px-1.5 text-[11px] text-white">
            {totalCount}
          </span>
        </button>

        {chips.map((c) => (
          <button key={c.id} className={pill(activeId === c.id)} onClick={() => setActiveId(c.id)}>
            {c.label}
            <span className="ml-2 rounded-full bg-[#18181B] px-1.5 text-[11px] text-white">
              {c.count}
            </span>
          </button>
        ))}

        <button
          onClick={() => setDialogOpen(true)}
          className="flex size-9 items-center justify-center rounded-full bg-[#EF4444] text-white cursor-pointer transition-all duration-200 ease-out hover:bg-[#EF4444]/90 hover:scale-105 hover:rotate-90 active:scale-95"
        >
          <Plus className="size-4" />
        </button>
      </div>

      <AddCategoryDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </section>
  );
}