"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { AddCategoryDialog } from "./add-category-dialog";
import { useCategory } from "@/providers/category-provider";

export function CategoryChips({ chips, categories, totalCount }) {
  const [activeId, setActiveId] = useState(null);
  const [addOpen, setAddOpen] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { remove } = useCategory();

  const submit = async (id) => {
     if (!confirm("Delete this category?")) return;
    setSubmitting(true);
    setError("");
    try {
      await remove(id);
    } catch (err) {
      if (err.response?.status === 404) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const pill = (on) =>
    on
      ? "flex items-center justify-center rounded-full border border-[#EF4444] bg-white px-4 py-2 text-sm font-medium text-[#EF4444] cursor-pointer transition-all duration-200 ease-out active:scale-[0.97]"
      : "flex items-center justify-center rounded-full border border-border bg-white px-4 py-2 text-sm font-medium cursor-pointer transition-all duration-200 ease-out hover:border-[#EF4444]/50 hover:text-[#EF4444] active:scale-[0.97]";

  return (
    <section className="rounded-2xl bg-white p-6">
      <h2 className="mb-4 text-xl font-semibold">Dishes category</h2>
      <div className="flex flex-wrap items-center gap-3">
        <button
          className={pill(activeId === null)}
          onClick={() => setActiveId(null)}
        >
          All Dishes
          <span className="ml-2 rounded-full bg-[#18181B] px-1.5 text-[11px] text-white">
            {categories.length}
          </span>
        </button>

        {chips.map((c) => (
          <div
            key={c.id}
            className={pill(activeId === c.id)}
            onClick={() => setActiveId(c.id)}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                submit(c.id);
              }}
              disabled={submitting}
              className="mr-2 rounded-full bg-black px-1.5 text-white cursor-pointer disabled:opacity-50"
            >
              <X size={12} />
            </button>
            {c.label}
            <span className="ml-2 rounded-full bg-[#18181B] px-1.5 text-[11px] text-white">
              {c.count}
            </span>
          </div>
        ))}

        <button
          onClick={() => setAddOpen(true)}
          className="flex size-9 items-center justify-center rounded-full bg-[#EF4444] text-white cursor-pointer transition-all duration-200 ease-out hover:bg-[#EF4444]/90 hover:scale-105 hover:rotate-90 active:scale-95"
        >
          <Plus className="size-4" />
        </button>
      </div>
      {error && <p className="mt-3 text-sm text-[#EF4444]">{error}</p>}
      <AddCategoryDialog open={addOpen} onClose={() => setAddOpen(false)} />
    </section>
  );
}
