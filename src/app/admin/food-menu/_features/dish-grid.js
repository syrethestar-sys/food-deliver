"use client";

import { useState } from "react";
import { AddDishCard } from "../_components/add-dish-card";
import { DishCard } from "../_components/dish-card";
import { AddDishDialog } from "./add-dish-dialog";

export function DishGrid({ sections }) {
  const [addCategory, setAddCategory] = useState(null);

  return (
    <>
      {sections.map((section) => (
        <section key={section.category} className="rounded-2xl bg-white p-6">
          <h3 className="mb-5 text-lg font-semibold">
            {section.category} ({section.dishes.length})
          </h3>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <AddDishCard
              category={section.category}
              onAdd={() => setAddCategory(section.category)}
            />
            {section.dishes.map((dish) => (
              <DishCard key={dish.name} {...dish} />
            ))}
          </div>
        </section>
      ))}

      <AddDishDialog
        open={addCategory !== null}
        category={addCategory}
        onClose={() => setAddCategory(null)}
      />
    </>
  );
}