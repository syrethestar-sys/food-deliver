"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { server } from "@/app/api/api";
import { uploadImage } from "@/lib/upload-image";
import { Image as ImageIcon, Trash2, X, ChevronsUpDown } from "lucide-react";

export function DishInfoDialog({ open, onClose, dish, categories = [] }) {
  const router = useRouter();
  const [name, setName] = useState(dish.name);
  const [categoryId, setCategoryId] = useState(dish.categoryId);
  const [ingredients, setIngredients] = useState(dish.ingredients);
  const [price, setPrice] = useState(dish.price);
  const [imageUrl, setImageUrl] = useState(dish.image);
  const [preview, setPreview] = useState(dish.image);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await server.put("/food/update", {
        id: dish.id,
        name,
        price: Number(price),
        ingredients: ingredients
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        image: imageUrl,
        category: categoryId,
      });
      onClose();
      router.refresh();
    } catch (err) {
      setError(
        err.response?.data?.message ?? "Something went wrong. Try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setUploading(true);
    setError("");

    try {
      const url = await uploadImage(file);
      setImageUrl(url);
    } catch (err) {
      setError("Image upload failed. Try again.");
      setImageUrl("");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this dish?")) return;
    try {
      await server.delete("/food/delete", { data: { id: dish.id } });
      onClose();
      router.refresh();
    } catch (err) {
      setError(err.response?.data?.message ?? "Could not delete.");
    }
  };

  const clearImage = () => {
    setPreview("");
    setImageUrl("");
    setError("");
  };

  const fieldClass =
    "w-full rounded-lg border border-border px-3 py-2 text-sm outline-none transition-colors duration-200 focus:border-foreground";
  const labelClass = "pt-2 text-sm text-muted-foreground";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 animate-in fade-in-0 duration-200">
      <form
        onSubmit={submit}
        className="max-h-[90vh] w-[460px] overflow-y-auto rounded-2xl bg-white p-6 shadow-xl animate-in fade-in-0 zoom-in-95 duration-200 ease-out"
      >
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Dishes info</h3>
          <button
            type="button"
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded-full bg-muted text-muted-foreground cursor-pointer transition-all duration-200 ease-out hover:bg-muted/70 hover:rotate-90 active:scale-90"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="grid grid-cols-[110px_1fr] items-start gap-x-4 gap-y-5">
          <label htmlFor="dish-name" className={labelClass}>
            Dish name
          </label>
          <input
            id="dish-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={fieldClass}
          />

          <label htmlFor="dish-category" className={labelClass}>
            Dish category
          </label>
          <div className="relative">
            <select
              id="dish-category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full cursor-pointer appearance-none rounded-full border border-border bg-muted/50 px-4 py-2 pr-9 text-sm font-medium outline-none transition-colors duration-200 focus:border-foreground"
            >
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.categoryName}
                </option>
              ))}
            </select>
            <ChevronsUpDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          </div>

          <label htmlFor="dish-ingredients" className={labelClass}>
            Ingredients
          </label>
          <textarea
            id="dish-ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            rows={3}
            className={`${fieldClass} resize-none`}
          />

          <label htmlFor="dish-price" className={labelClass}>
            Price
          </label>
          <input
            id="dish-price"
            value={price ?? ""}
            onChange={(e) => setPrice(e.target.value)}
            className={fieldClass}
          />

          <span className={labelClass}>Image</span>
          <div>
            {preview ? (
              <div className="relative w-full">
                <img
                  src={preview}
                  alt=""
                  className="h-44 w-full rounded-lg object-cover"
                />
                <button
                  type="button"
                  onClick={clearImage}
                  className="absolute right-2 top-2 flex size-7 items-center justify-center rounded-full bg-white shadow cursor-pointer transition-all duration-200 ease-out hover:scale-110 hover:bg-[#EF4444] hover:text-white active:scale-90"
                >
                  <X className="size-4" />
                </button>
              </div>
            ) : (
              <label
                htmlFor="food-image"
                className="group flex h-32 w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-[#2563EB33] bg-[#2563EB0D] text-sm cursor-pointer transition-colors duration-200 ease-out hover:border-[#2563EB66] hover:bg-[#2563EB1A]"
              >
                <div className="flex size-9 items-center justify-center rounded-full bg-white transition-transform duration-200 ease-out group-hover:scale-110">
                  <ImageIcon className="size-5" />
                </div>
                <span>Choose a file or drag &amp; drop it here</span>
                <input
                  id="food-image"
                  type="file"
                  accept="image/*"
                  onChange={handleFile}
                  className="hidden"
                />
              </label>
            )}
            {uploading && (
              <p className="mt-1 text-xs text-muted-foreground">Uploading…</p>
            )}
          </div>
        </div>

        {error && <p className="mt-3 text-sm text-[#EF4444]">{error}</p>}

        <div className="mt-6 flex items-center justify-between">
          <button
            type="button"
            onClick={handleDelete}
            className="group rounded-lg border border-red-300 p-2.5 cursor-pointer transition-all duration-200 ease-out hover:border-red-500 hover:bg-red-500 active:scale-95"
          >
            <Trash2 className="size-4 text-red-500 transition-colors duration-200 group-hover:text-white" />
          </button>

          <button
            type="submit"
            disabled={submitting || uploading}
            className="rounded-lg bg-[#18181B] px-5 py-2.5 text-sm font-medium text-white cursor-pointer transition-all duration-200 ease-out hover:bg-[#18181B]/85 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50"
          >
            {uploading ? "Uploading…" : submitting ? "Saving…" : "Save changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
