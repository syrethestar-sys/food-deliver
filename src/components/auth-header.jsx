import { ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

// Top of every auth form: either the brand mark (first step) or a back button
// (later steps), followed by the title + supporting line.
export function AuthHeader({ title, description, onBack }) {
  return (
    <div className="space-y-4">
      {onBack ? (
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          aria-label="Go back"
          onClick={onBack}
        >
          <ChevronLeft />
        </Button>
      ) : (
        <div className="flex size-8 items-center justify-center rounded-lg bg-[#f0431c]">
          <span className="size-3 rounded-[3px] bg-white" />
        </div>
      )}
      <div className="space-y-1">
        <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
