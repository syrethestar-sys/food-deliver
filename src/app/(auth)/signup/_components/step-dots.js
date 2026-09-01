export function StepDots({ total, current }) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: total }, (_, index) => (
        <span
          key={index}
          data-active={index + 1 === current}
          className="h-1.5 w-1.5 rounded-full bg-muted data-[active=true]:bg-foreground"
        />
      ))}
    </div>
  );
}
