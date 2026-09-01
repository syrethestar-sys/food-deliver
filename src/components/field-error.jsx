// Inline validation message shown under a field in its "Destructive" state.
export function FieldError({ children }) {
  if (!children) return null;
  return <p className="text-sm text-destructive">{children}</p>;
}
