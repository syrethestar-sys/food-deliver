export function UserSettings({ user, onSignOut }) {
  return (
    <div className="absolute right-0 top-12 z-50 flex w-60 flex-col items-center gap-4 rounded-xl bg-white p-5 shadow-xl">
      <p className="text-sm font-semibold">{user.email}</p>
      <button
        type="button"
        onClick={onSignOut}
        className="cursor-pointer rounded-full bg-[#F4F4F5] px-4 py-2 text-sm font-medium hover:bg-zinc-200"
      >
        Sign out
      </button>
    </div>
  );
}
