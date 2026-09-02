import { ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

export function AuthHeader({ title, description, onBack }) {
  return (
    <div className="space-y-4">
      {onBack ? (<Button
        type="button"
        variant="outline"
        size="icon-sm"
        aria-label="Go back"
        className="cursor-pointer"
        onClick={onBack}
      >
        <ChevronLeft />
      </Button>) : ""}
      

      <div className="space-y-1">
        <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
