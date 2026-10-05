import * as React from "react";
import { cn } from "@/lib/utils";

function Input({
  className,
  type = "text",
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-10 w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2 font-sans text-xs text-[#050038] shadow-2xs transition-colors file:border-0 file:bg-transparent file:text-xs file:font-medium placeholder:text-zinc-400 focus:border-[#050038] focus:outline-none focus:ring-2 focus:ring-[#050038]/10 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-rose-500 aria-invalid:focus:border-rose-500 aria-invalid:focus:ring-rose-500/20 sm:text-sm",
        className
      )}
      {...props}
    />
  );
}

export { Input };
