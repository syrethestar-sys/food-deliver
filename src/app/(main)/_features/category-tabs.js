"use client";

export function CategoryTabs({ categories = [], activeId, onChange }) {
  return (
    <nav className="flex gap-2 overflow-x-auto">
      <button
        onClick={() => onChange(null)}
        className={
          activeId === null
            ? "rounded-full bg-[#18181B] px-4 py-2 text-sm text-white whitespace-nowrap"
            : "rounded-full border px-4 py-2 text-sm whitespace-nowrap"
        }
      >
        All Dishes
      </button>
      {categories.map((c) => (
        <button
          key={c._id}
          onClick={() => onChange(c._id)}
          className={
            activeId === c._id
              ? "rounded-full bg-[#18181B] px-4 py-2 text-sm text-white whitespace-nowrap cursor-pointer"
              : "rounded-full border px-4 py-2 text-sm whitespace-nowrap cursor-pointer"
          }
        >
          {c.categoryName}
        </button>
      ))}
    </nav>
  );
}
