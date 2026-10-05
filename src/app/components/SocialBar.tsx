"use client";

import React from "react";
import { SocialLinkItem } from "@/types/link";
import { DynamicIcon } from "@/components/common/DynamicIcon";
import { Button } from "@/components/ui/button";

interface SocialBarProps {
  items: SocialLinkItem[];
}

export default function SocialBar({ items }: SocialBarProps) {
  const activeItems = items.filter((item) => item.isActive);

  if (!activeItems || activeItems.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5 px-6 py-2 sm:px-9">
      {activeItems.map((item) => (
        <Button
          key={item.id}
          variant="icon-circle"
          size="icon"
          nativeButton={false}
          className="group shadow-[0px_1px_3px_rgba(5,0,56,0.04)] hover:shadow-[0px_4px_10px_rgba(5,0,56,0.08)] hover:-translate-y-0.5 active:translate-y-0"
          render={
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              title={`${item.name} 채널로 이동`}
            />
          }
        >
          <DynamicIcon
            name={item.platform}
            className="h-4 w-4 transition-transform duration-200 group-hover:scale-110"
          />
          <span className="sr-only">{item.name}</span>
        </Button>
      ))}
    </div>
  );
}
