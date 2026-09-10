"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { server } from "@/app/api/api";

export function AddCategoryDialog({ open, onClose }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!open) return null;

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await server.post("/food-category/create", { name });
      setName("");
      onClose();
      router.refresh();           
    } catch (err) {
      if (err.response?.status === 409) {
        setError(err.response.data.message); 
      } else {
        setError("Something went wrong. Try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 animate-in fade-in-0 duration-200">
      <form
        onSubmit={submit}
        className="w-90 rounded-xl bg-white p-5 shadow-lg animate-in fade-in-0 zoom-in-95 duration-200 ease-out"
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold">Add new category</h3>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer transition-transform duration-200 ease-out hover:scale-110 active:scale-90"
          >
            ✕
          </button>
        </div>
        <label className="text-sm">Category name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Type category name..."
          className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm"
        />
        {error && <p className="mt-2 text-sm text-[#EF4444]">{error}</p>}
        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            disabled={submitting}
            className="rounded-md bg-[#18181B] px-4 py-2 text-sm text-white cursor-pointer transition-all duration-200 ease-out hover:bg-[#18181B]/85 active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none"
          >
            Add category
          </button>
        </div>
      </form>
    </div>
  );
}