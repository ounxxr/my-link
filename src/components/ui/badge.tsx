import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow-xs hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-white shadow-xs hover:bg-destructive/80",
        outline: "text-foreground border-border",
        "pill-black":
          "rounded-full border-transparent bg-[#050038] text-white font-medium shadow-xs",
        "pill-yellow":
          "rounded-full border-transparent bg-[#FFD02F] text-[#050038] font-semibold shadow-xs",
        "pill-outline":
          "rounded-full border-zinc-200/90 bg-white text-zinc-700 font-medium",
        "pastel-peach":
          "rounded-full border-transparent bg-[#FF7A45] text-white font-bold tracking-wider",
        "pastel-teal":
          "rounded-full border-transparent bg-[#094943] text-white font-bold tracking-wider",
        "pastel-coral":
          "rounded-full border-transparent bg-[#E03131] text-white font-bold tracking-wider",
        "pastel-lavender":
          "rounded-full border-transparent bg-[#6366F1] text-white font-bold tracking-wider",
        "pastel-yellow":
          "rounded-full border-transparent bg-[#E67700] text-white font-bold tracking-wider",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
