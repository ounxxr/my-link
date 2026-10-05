import * as React from "react";
import { cn } from "@/lib/utils";

function Label({
  className,
  ...props
}: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        "font-sans text-xs font-semibold leading-none text-[#050038] select-none",
        className
      )}
      {...props}
    />
  );
}

export { Label };
