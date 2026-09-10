"use client";

import { useState } from "react";
import { AddDishCard } from "../_components/add-dish-card";
import { DishCard } from "../_components/dish-card";
import { AddDishDialog } from "./add-dish-dialog";
import { DishInfoDialog } from "./dish-info-dialog";

export function DishGrid({ sections, categories = [] }) {
  const [addCategory, setAddCategory] = useState(null);
  const [editDish, setEditDish] = useState(null);

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
              onAdd={() =>
                setAddCategory({
                  id: section.categoryId,
                  name: section.category,
                })
              }
            />

            {section.dishes.map((dish) => (
              <DishCard
                key={dish.name}
                {...dish}
                onEdit={() =>
                  setEditDish({ ...dish, categoryId: section.categoryId })
                }
              />
            ))}
          </div>
        </section>
      ))}
      {editDish && (
        <DishInfoDialog
          open
          dish={editDish}
          categories={categories}
          onClose={() => setEditDish(null)}
        />
      )}
      <AddDishDialog
        open={addCategory !== null}
        category={addCategory}
        onClose={() => setAddCategory(null)}
      />
    </>
  );
}
