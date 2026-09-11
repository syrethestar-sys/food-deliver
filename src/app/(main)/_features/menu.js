"use client";

import { useState } from "react";
import { CategoryTabs } from "./category-tabs";
import { FoodGrid } from "./food-grid";
import { FoodDetailDialog } from "./food-detail-dialog";

export function Menu({ categories, dishes }) {
  const [activeId, setActiveId] = useState(null);
  const [selectedDish, setSelectedDish] = useState(null);

  const shownCategories = activeId
    ? categories.filter((c) => c._id === activeId)
    : categories;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <CategoryTabs
        categories={categories}
        activeId={activeId}
        onChange={setActiveId}
      />

      <div className="mt-8 flex flex-col gap-10">
        {shownCategories.map((c) => {
          const items = dishes.filter((d) => d.categoryId === c._id);
          if (items.length === 0) return null;
          return (
            <section key={c._id}>
              <h2 className="mb-4 text-[30px] font-semibold">
                {c.categoryName}
              </h2>
              <FoodGrid dishes={items} onSelect={setSelectedDish} />
            </section>
          );
        })}
      </div>
      <FoodDetailDialog
        dish={selectedDish}
        onClose={() => setSelectedDish(null)}
      />
    </div>
  );
}
