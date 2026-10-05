"use client";

import React from "react";
import { ArrowUpRight, Pin } from "lucide-react";
import { LinkBlock, CardVariant } from "@/types/link";
import { DynamicIcon } from "@/components/common/DynamicIcon";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface LinkCardProps {
  link: LinkBlock;
  onLinkClick: (id: string) => void;
}

const badgeVariantMap: Record<
  string,
  | "pastel-peach"
  | "pastel-teal"
  | "pastel-coral"
  | "pastel-lavender"
  | "pastel-yellow"
  | "pill-black"
  | "default"
> = {
  "pastel-peach": "pastel-peach",
  "pastel-teal": "pastel-teal",
  "pastel-coral": "pastel-coral",
  "pastel-lavender": "pastel-lavender",
  "pastel-yellow": "pastel-yellow",
  featured: "pill-black",
  default: "default",
};

const iconBoxStyles: Record<CardVariant, string> = {
  default: "bg-zinc-100 text-[#050038]",
  featured: "bg-[#4262FF]/15 text-[#282582]",
  "pastel-peach": "bg-white/80 text-[#7A3619]",
  "pastel-teal": "bg-white/80 text-[#094943]",
  "pastel-coral": "bg-white/80 text-[#632314]",
  "pastel-lavender": "bg-white/80 text-[#3730A3]",
  "pastel-yellow": "bg-white/80 text-[#5C4D00]",
};

const arrowBoxStyles: Record<CardVariant, string> = {
  default:
    "bg-zinc-100 text-zinc-600 group-hover:bg-[#050038] group-hover:text-white",
  featured: "bg-[#4262FF] text-white group-hover:bg-[#1c1a63]",
  "pastel-peach":
    "bg-white/80 text-[#7A3619] group-hover:bg-[#7A3619] group-hover:text-white",
  "pastel-teal":
    "bg-white/80 text-[#094943] group-hover:bg-[#094943] group-hover:text-white",
  "pastel-coral":
    "bg-white/80 text-[#632314] group-hover:bg-[#632314] group-hover:text-white",
  "pastel-lavender":
    "bg-white/80 text-[#3730A3] group-hover:bg-[#3730A3] group-hover:text-white",
  "pastel-yellow":
    "bg-white/80 text-[#5C4D00] group-hover:bg-[#5C4D00] group-hover:text-white",
};

const footerBorderStyles: Record<CardVariant, string> = {
  default: "border-zinc-100 text-zinc-400",
  featured: "border-[#282582]/15 text-[#282582]/70",
  "pastel-peach": "border-[#7A3619]/15 text-[#7A3619]/70",
  "pastel-teal": "border-[#094943]/15 text-[#094943]/70",
  "pastel-coral": "border-[#632314]/15 text-[#632314]/70",
  "pastel-lavender": "border-[#3730A3]/15 text-[#3730A3]/70",
  "pastel-yellow": "border-[#5C4D00]/15 text-[#5C4D00]/70",
};

function formatClicks(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return `${count}`;
}

export default function LinkCard({ link, onLinkClick }: LinkCardProps) {
  const variant: CardVariant = link.variant || "default";

  const handleClick = () => {
    onLinkClick(link.id);
  };

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="group block cursor-pointer no-underline focus:outline-none"
    >
      <Card
        variant={variant}
        className="p-4 sm:p-5"
      >
        <CardContent>
          {/* 상단 뱃지 및 상태 영역 */}
          <CardHeader className="p-0">
            <div className="flex items-center gap-2">
              {/* 아이콘 박스 */}
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105 ${iconBoxStyles[variant]}`}
              >
                <DynamicIcon name={link.icon} className="h-4 w-4" />
              </div>

              {/* shadcn/ui Badge */}
              {link.badge && (
                <Badge
                  variant={badgeVariantMap[variant] || "default"}
                  className="px-2 py-0.5 text-[10px]"
                >
                  {link.badge}
                </Badge>
              )}

              {/* 고정 핀 */}
              {link.isPinned && (
                <span
                  className="inline-flex items-center gap-0.5 text-[11px] font-medium opacity-80"
                  title="고정된 추천 링크"
                >
                  <Pin className="h-3 w-3 fill-current rotate-45" />
                </span>
              )}
            </div>

            {/* 새창 이동 화살표 아이콘 */}
            <div
              className={`flex h-7 w-7 items-center justify-center rounded-full transition-all duration-200 ${arrowBoxStyles[variant]}`}
            >
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </CardHeader>

          {/* 타이틀 & 서브타이틀 */}
          <CardTitle className="mt-1">
            {link.title}
          </CardTitle>

          {link.subtitle && (
            <CardDescription className="mt-1">
              {link.subtitle}
            </CardDescription>
          )}
        </CardContent>

        {/* 하단 메타데이터: 도메인 & 클릭수 */}
        <CardFooter className={`p-0 ${footerBorderStyles[variant]}`}>
          <span className="truncate max-w-[200px] opacity-85">
            {link.url.replace(/^https?:\/\/(www\.)?/, "")}
          </span>
          <span className="shrink-0 font-mono">
            {formatClicks(link.clickCount)} clicks
          </span>
        </CardFooter>
      </Card>
    </a>
  );
}
