export function CategoryPill({ label, count, active = false }) {
  return (
    <button
      type="button"
      className={
        active
          ? "flex items-center gap-2 rounded-full border border-[#EF4444] bg-white px-4 py-2 text-sm font-medium text-[#EF4444] cursor-pointer transition-all duration-200 ease-out active:scale-[0.97]"
          : "flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-foreground cursor-pointer transition-all duration-200 ease-out hover:border-[#EF4444]/50 hover:text-[#EF4444] active:scale-[0.97]"
      }
    >
      {label}
      <span className="flex min-w-6 items-center justify-center rounded-full bg-[#18181B] px-1.5 py-0.5 text-[11px] font-semibold text-white">
        {count}
      </span>
    </button>
  );
}
