"use client";

import { useEffect, useState } from "react";

export function AddDishDialog({ open, category, onClose }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [image, setImage] = useState("");

  // close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const submit = (e) => {
    e.preventDefault();
    console.log({ name, price, ingredients, image, category });  // Done #4
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <form onSubmit={submit} className="w-105 rounded-xl bg-white p-5 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold">Add new Dish to {category}</h3>
          <button type="button" onClick={onClose}>✕</button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <label className="text-sm">Food name
            <input value={name} onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm" />
          </label>
          <label className="text-sm">Food price
            <input value={price} onChange={(e) => setPrice(e.target.value)}
              className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm" />
          </label>
        </div>

        <label className="mt-3 block text-sm">Ingredients
          <textarea value={ingredients} onChange={(e) => setIngredients(e.target.value)}
            className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm" rows={3} />
        </label>

        <label className="mt-3 block text-sm">Food image
          <input value={image} onChange={(e) => setImage(e.target.value)}
            placeholder="Paste an image URL"
            className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm" />
        </label>

        <div className="mt-4 flex justify-end">
          <button type="submit" className="rounded-md bg-[#18181B] px-4 py-2 text-sm text-white">
            Add Dish
          </button>
        </div>
      </form>
    </div>
  );
}