import React from "react";
import { Separator } from "@/components/ui/separator";

interface SectionHeaderProps {
  title: string;
}

export default function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <div className="pt-5 pb-2">
      <div className="flex items-center gap-3">
        <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.06em] text-zinc-500 whitespace-nowrap">
          {title}
        </span>
        <Separator className="flex-1" />
      </div>
    </div>
  );
}
