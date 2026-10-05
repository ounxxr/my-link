import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  "relative flex flex-col justify-between transition-all duration-200",
  {
    variants: {
      variant: {
        default:
          "rounded-2xl border border-zinc-200/90 bg-white text-[#050038] hover:border-zinc-300 hover:shadow-[0px_4px_16px_rgba(5,0,56,0.06)] hover:-translate-y-0.5",
        featured:
          "rounded-2xl border border-[#4262FF]/30 bg-[#F1F0FE] text-[#282582] shadow-[0px_2px_8px_rgba(66,98,255,0.08)] hover:shadow-[0px_6px_20px_rgba(66,98,255,0.12)] hover:-translate-y-0.5",
        "pastel-peach":
          "rounded-2xl border border-[#7A3619]/15 bg-[#FFF2EB] text-[#7A3619] hover:shadow-[0px_4px_16px_rgba(122,54,25,0.08)] hover:-translate-y-0.5",
        "pastel-teal":
          "rounded-2xl border border-[#094943]/15 bg-[#E1F5F2] text-[#094943] hover:shadow-[0px_4px_16px_rgba(9,73,67,0.08)] hover:-translate-y-0.5",
        "pastel-coral":
          "rounded-2xl border border-[#632314]/15 bg-[#FFEAE4] text-[#632314] hover:shadow-[0px_4px_16px_rgba(99,35,20,0.08)] hover:-translate-y-0.5",
        "pastel-lavender":
          "rounded-2xl border border-[#4338CA]/15 bg-[#F3F0FF] text-[#3730A3] hover:shadow-[0px_4px_16px_rgba(55,48,163,0.08)] hover:-translate-y-0.5",
        "pastel-yellow":
          "rounded-2xl border border-[#705E00]/15 bg-[#FFF9DB] text-[#5C4D00] hover:shadow-[0px_4px_16px_rgba(92,77,0,0.08)] hover:-translate-y-0.5",
        "canvas-frame":
          "overflow-hidden rounded-[32px] border border-zinc-200/90 bg-white text-[#050038] shadow-[0px_12px_36px_-4px_rgba(5,0,56,0.08)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Card({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof cardVariants>) {
  return (
    <div
      data-slot="card"
      className={cn(cardVariants({ variant }), className)}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn("flex items-center justify-between pb-2.5", className)}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="card-title"
      className={cn(
        "font-sans text-base font-semibold tracking-tight transition-colors",
        className
      )}
      {...props}
    />
  );
}

function CardDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="card-description"
      className={cn(
        "mt-1 font-sans text-xs leading-relaxed line-clamp-2",
        className
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-0 py-0", className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "mt-3.5 pt-2.5 border-t flex items-center justify-between font-sans text-[11px] font-medium",
        className
      )}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  cardVariants,
};
