import { Plus } from "lucide-react";

import { CategoryPill } from "../_components/category-pill";

const categories = [
  { label: "All Dishes", count: 112, active: true },
  { label: "Appetizers", count: 6 },
  { label: "Salads", count: 3 },
  { label: "Pizzas", count: 5 },
  { label: "Lunch favorites", count: 5 },
  { label: "Main dishes", count: 5 },
  { label: "Fish & Sea foods", count: 5 },
  { label: "Brunch", count: 5 },
  { label: "Side dish", count: 5 },
  { label: "Desserts", count: 5 },
  { label: "Beverages", count: 5 },
];

export function CategoryPanel() {
  return (
    <section className="rounded-2xl bg-white p-6">
      <h2 className="mb-4 text-xl font-semibold">Dishes category</h2>
      <div className="flex flex-wrap items-center gap-3">
        {categories.map((category) => (
          <CategoryPill
            key={category.label}
            label={category.label}
            count={category.count}
            active={category.active}
          />
        ))}
        <button
          type="button"
          className="flex size-9 items-center justify-center rounded-full bg-[#EF4444] text-white"
        >
          <Plus className="size-4" />
        </button>
      </div>
    </section>
  );
}
