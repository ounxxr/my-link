"use client";

import React from "react";
import { CategoryItem } from "@/types/link";
import { DynamicIcon } from "@/components/common/DynamicIcon";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CategoryTabsProps {
  categories: CategoryItem[];
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
  counts?: Record<string, number>;
}

export default function CategoryTabs({
  categories,
  selectedCategory,
  onSelectCategory,
  counts,
}: CategoryTabsProps) {
  if (!categories || categories.length === 0) return null;

  return (
    <div className="px-6 py-3 sm:px-9">
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          const count = counts ? counts[cat.id] : undefined;

          return (
            <Button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              variant={isSelected ? "black-pill" : "outline-pill"}
              size="sm"
              type="button"
              className={`gap-1.5 px-3.5 py-1.5 text-xs font-medium cursor-pointer transition-all duration-200 ${
                isSelected
                  ? "shadow-[0px_2px_6px_rgba(5,0,56,0.12)] scale-[1.02]"
                  : ""
              }`}
            >
              <DynamicIcon
                name={cat.icon}
                className={`h-3.5 w-3.5 ${
                  isSelected ? "text-[#FFD02F]" : "text-zinc-500"
                }`}
              />
              <span>{cat.label}</span>
              {typeof count === "number" && count > 0 && (
                <Badge
                  variant="outline"
                  className={`ml-0.5 border-none px-1.5 py-0 font-mono text-[10px] font-semibold ${
                    isSelected
                      ? "bg-white/20 text-white"
                      : "bg-zinc-100 text-zinc-500"
                  }`}
                >
                  {count}
                </Badge>
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
