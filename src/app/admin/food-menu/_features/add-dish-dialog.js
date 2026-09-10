"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { server } from "@/app/api/api";
import { uploadImage } from "@/lib/upload-image";
import { Image } from "lucide-react";

export function AddDishDialog({ open, category, onClose }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState("");
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);

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
      await server.post("/food/create", {
        name,
        price: Number(price),
        ingredients: ingredients
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        image: imageUrl,
        category: category.id,
      });
      setName("");
      setPrice("");
      setIngredients("");
      setImageUrl("");
      setImageUrl("");
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

  const clearImage = () => {
    setPreview("");
    setImageUrl("");
    setError("");
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 animate-in fade-in-0 duration-200">
      <form
        onSubmit={submit}
        className="w-105 rounded-xl bg-white p-5 shadow-lg animate-in fade-in-0 zoom-in-95 duration-200 ease-out"
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold">Add new Dish to {category?.name}</h3>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer transition-transform duration-200 ease-out hover:scale-110 hover:rotate-90 active:scale-90"
          >
            ✕
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <label className="text-sm">
            Food name
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm"
            />
          </label>
          <label className="text-sm">
            Food price
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm"
            />
          </label>
        </div>

        <label className="mt-3 block text-sm">
          Ingredients
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm"
            rows={3}
          />
        </label>

        <label className="mt-3 block text-sm">
          <p className="text-sm">Food image</p>

          {preview ? (
            <div className="relative mt-1 w-full">
              <img
                src={preview}
                alt=""
                className="w-full h-80 rounded-md object-cover"
              />
              <button
                type="button"
                onClick={clearImage}
                className="absolute -right-2 -top-2 flex size-6 items-center justify-center rounded-full bg-white text-xs shadow cursor-pointer transition-all duration-200 ease-out hover:scale-110 hover:bg-[#EF4444] hover:text-white active:scale-90"
              >
                ✕
              </button>
            </div>
          ) : (
            <label
              htmlFor="food-image"
              className="group w-full h-40 flex flex-col items-center justify-center gap-2 rounded-md border border-dashed border-[#2563EB33] bg-[#2563EB0D] mt-1 text-sm cursor-pointer transition-colors duration-200 ease-out hover:border-[#2563EB66] hover:bg-[#2563EB1A]"
            >
              <div className="w-9 h-9 bg-white rounded-full flex justify-center items-center transition-transform duration-200 ease-out group-hover:scale-110">
                <Image className="w-5 h-5" />
              </div>

              <span>Choose a file or drag & drop it here</span>

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
        </label>
        {error && <p className="mt-2 text-sm text-[#EF4444]">{error}</p>}
        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            disabled={submitting || uploading}
            className="rounded-md bg-[#18181B] px-4 py-2 text-sm text-white cursor-pointer transition-all duration-200 ease-out hover:bg-[#18181B]/85 active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none"
          >
            {uploading ? "Uploading" : "Add dish"}
          </button>
        </div>
      </form>
    </div>
  );
}
