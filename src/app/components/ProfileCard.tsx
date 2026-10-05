"use client";

import React, { useMemo } from "react";
import {
  MousePointer2,
  StickyNote,
  PenTool,
  Square,
  Type,
  Code2,
  Terminal,
  Palette,
  Layers,
  GitBranch,
  RefreshCw,
} from "lucide-react";
import { useLinkStore } from "@/store/useLinkStore";
import ProfileHeader from "./ProfileHeader";
import SocialBar from "./SocialBar";
import CategoryTabs from "./CategoryTabs";
import SectionHeader from "./SectionHeader";
import LinkCard from "./LinkCard";
import { LinkBlock, HeaderBlock } from "@/types/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function ProfileCard() {
  const {
    user,
    socialLinks,
    categories,
    blocks,
    selectedCategory,
    setSelectedCategory,
    incrementClick,
    resetToMockData,
  } = useLinkStore();

  // 카테고리별 링크 개수 집계
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: 0 };
    blocks.forEach((block) => {
      if (block.type === "link" && block.isActive) {
        counts.all = (counts.all || 0) + 1;
        const cat = (block as LinkBlock).category;
        if (cat) {
          counts[cat] = (counts[cat] || 0) + 1;
        }
      }
    });
    return counts;
  }, [blocks]);

  // 선택된 카테고리에 따른 필터링된 블록 목록
  const filteredBlocks = useMemo(() => {
    if (selectedCategory === "all") {
      return blocks
        .filter((b) => b.isActive)
        .sort((a, b) => a.order - b.order);
    }

    // 특정 카테고리 선택 시 해당 카테고리의 링크만 필터링
    return blocks
      .filter((block) => {
        if (!block.isActive) return false;
        if (block.type === "header") return false;
        return (block as LinkBlock).category === selectedCategory;
      })
      .sort((a, b) => a.order - b.order);
  }, [blocks, selectedCategory]);

  const techStack = [
    { name: "React 19", icon: <Layers className="h-3.5 w-3.5 text-sky-600" /> },
    { name: "Next.js 16", icon: <Code2 className="h-3.5 w-3.5 text-zinc-900" /> },
    { name: "TypeScript", icon: <Terminal className="h-3.5 w-3.5 text-blue-600" /> },
    { name: "Tailwind v4", icon: <Palette className="h-3.5 w-3.5 text-teal-600" /> },
    { name: "Zustand", icon: <Layers className="h-3.5 w-3.5 text-amber-600" /> },
    { name: "Miro System", icon: <GitBranch className="h-3.5 w-3.5 text-orange-600" /> },
  ];

  return (
    <div className="relative w-full max-w-xl">
      {/* 실시간 협업 커서 데코레이션 1: 이지윤 (소프트 바이올렛) */}
      <div className="pointer-events-none absolute -top-8 -left-2 z-20 hidden items-center gap-1 sm:flex animate-bounce [animation-duration:3s]">
        <MousePointer2 className="h-5 w-5 fill-[#8B5CF6] text-[#8B5CF6] stroke-[1.5]" />
        <span className="rounded-full bg-[#8B5CF6] px-2.5 py-0.5 font-sans text-[11px] font-semibold text-white shadow-xs">
          이지윤 ✦
        </span>
      </div>

      {/* 실시간 협업 커서 데코레이션 2: 게스트 (소프트 블루) */}
      <div className="pointer-events-none absolute -bottom-6 -right-2 z-20 hidden items-center gap-1 sm:flex animate-pulse">
        <MousePointer2 className="h-4 w-4 fill-[#4262FF] text-[#4262FF] stroke-[1.5]" />
        <span className="rounded-full bg-[#4262FF] px-2.5 py-0.5 font-sans text-[11px] font-semibold text-white shadow-xs">
          Guest Viewing
        </span>
      </div>

      {/* 메인 화이트보드 프레임 카드 (shadcn/ui Card variant="canvas-frame") */}
      <Card variant="canvas-frame">
        {/* 1. 상단 헤더 & 프로필 히어로 */}
        <ProfileHeader user={user} />

        {/* 2. 상단 SNS 아이콘 바 */}
        <SocialBar items={socialLinks.items} />

        {/* 3. 카테고리 필터 탭 */}
        {categories && (
          <CategoryTabs
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            counts={categoryCounts}
          />
        )}

        {/* 4. 링크 블록 목록 컨텐츠 영역 */}
        <div className="px-6 pb-6 sm:px-9">
          {filteredBlocks.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-zinc-200 p-8 text-center">
              <p className="font-sans text-xs text-zinc-500">
                선택한 카테고리에 표시할 링크가 없습니다.
              </p>
              <Button
                onClick={() => setSelectedCategory("all")}
                variant="black-pill"
                size="sm"
                className="mt-2.5"
                type="button"
              >
                전체 링크 보기
              </Button>
            </div>
          ) : (
            <div className="space-y-3.5">
              {filteredBlocks.map((block) => {
                if (block.type === "header") {
                  return (
                    <SectionHeader
                      key={block.id}
                      title={(block as HeaderBlock).title}
                    />
                  );
                }

                return (
                  <LinkCard
                    key={block.id}
                    link={block as LinkBlock}
                    onLinkClick={incrementClick}
                  />
                );
              })}
            </div>
          )}

          {/* 5. 기술 스택 섹션 */}
          <section className="mt-8 rounded-2xl border border-zinc-100 bg-[#FAFAFC] p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="font-sans text-xs font-semibold uppercase tracking-wider text-zinc-700">
                Tech Stack & System
              </span>
              <span className="font-sans text-[11px] text-zinc-400">
                Tailwind CSS v4 × shadcn/ui
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <Badge
                  key={tech.name}
                  variant="outline"
                  className="rounded-full border-zinc-200/80 bg-white px-3 py-1 font-sans text-xs font-medium text-[#050038] shadow-[0px_1px_2px_rgba(5,0,56,0.04)] hover:border-zinc-300 hover:bg-zinc-50 inline-flex items-center gap-1.5"
                >
                  {tech.icon}
                  <span>{tech.name}</span>
                </Badge>
              ))}
            </div>
          </section>

          {/* 6. 미니 화이트보드 툴바 데코레이션 & 시연용 리셋 버튼 (shadcn Button 재사용) */}
          <div className="mt-7 flex items-center justify-center gap-3">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white p-1 shadow-[0px_4px_12px_rgba(5,0,56,0.06)]">
              <Button
                variant="ghost"
                size="icon-xs"
                className="size-7 rounded-full bg-zinc-100 text-[#050038]"
                title="Select"
                type="button"
              >
                <MousePointer2 className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon-xs"
                className="size-7 rounded-full text-zinc-500 hover:bg-zinc-100"
                title="Sticky Note"
                type="button"
              >
                <StickyNote className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon-xs"
                className="size-7 rounded-full text-zinc-500 hover:bg-zinc-100"
                title="Shapes"
                type="button"
              >
                <Square className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon-xs"
                className="size-7 rounded-full text-zinc-500 hover:bg-zinc-100"
                title="Text"
                type="button"
              >
                <Type className="h-3.5 w-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon-xs"
                className="size-7 rounded-full text-zinc-500 hover:bg-zinc-100"
                title="Pen"
                type="button"
              >
                <PenTool className="h-3.5 w-3.5" />
              </Button>
            </div>

            {/* 시연자용 Seed 데이터 리셋 버튼 (shadcn Button variant="icon-circle") */}
            <Button
              onClick={resetToMockData}
              variant="icon-circle"
              size="icon-sm"
              title="초기 Mock 데이터셋으로 리셋 (시연용)"
              type="button"
              className="size-8 text-zinc-500 hover:text-[#050038]"
            >
              <RefreshCw className="h-3.5 w-3.5" />
            </Button>
          </div>

          <Separator className="mt-8" />

          {/* 7. 푸터 영역 */}
          <footer className="pt-4 text-center">
            <p className="font-sans text-[11px] text-zinc-400">
              © {new Date().getFullYear()} {user.displayName}. Powered by MyLink
              × Miro Design System × shadcn/ui.
            </p>
          </footer>
        </div>
      </Card>
    </div>
  );
}
