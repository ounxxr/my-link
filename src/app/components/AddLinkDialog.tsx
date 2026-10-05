"use client";

import React, { useState } from "react";
import {
  Plus,
  Sparkles,
  Pin,
  Check,
  Globe,
  Layers,
  Code2,
  BookOpen,
  Terminal,
  Coffee,
  Mail,
  Star,
  Flame,
} from "lucide-react";
import { useLinkStore } from "@/store/useLinkStore";
import { CardVariant, LinkBlock } from "@/types/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { DynamicIcon, GithubIcon, VelogIcon } from "@/components/common/DynamicIcon";
import LinkCard from "./LinkCard";

const ICON_PRESETS = [
  { name: "Globe", label: "웹/도메인", icon: <Globe className="h-3.5 w-3.5" /> },
  { name: "Github", label: "깃허브", icon: <GithubIcon className="h-3.5 w-3.5" /> },
  { name: "Velog", label: "벨로그", icon: <VelogIcon className="h-3.5 w-3.5" /> },
  { name: "Code2", label: "코드", icon: <Code2 className="h-3.5 w-3.5" /> },
  { name: "Layers", label: "프로젝트", icon: <Layers className="h-3.5 w-3.5" /> },
  { name: "BookOpen", label: "아티클", icon: <BookOpen className="h-3.5 w-3.5" /> },
  { name: "Terminal", label: "터미널", icon: <Terminal className="h-3.5 w-3.5" /> },
  { name: "Sparkles", label: "추천", icon: <Sparkles className="h-3.5 w-3.5" /> },
  { name: "Flame", label: "트렌딩", icon: <Flame className="h-3.5 w-3.5" /> },
  { name: "Coffee", label: "커피챗", icon: <Coffee className="h-3.5 w-3.5" /> },
  { name: "Mail", label: "연락처", icon: <Mail className="h-3.5 w-3.5" /> },
  { name: "Star", label: "스타", icon: <Star className="h-3.5 w-3.5" /> },
];

const VARIANT_OPTIONS: { id: CardVariant; label: string; bgClass: string; borderClass: string }[] = [
  { id: "default", label: "기본 화이트", bgClass: "bg-white", borderClass: "border-zinc-300" },
  { id: "featured", label: "피처드 블루", bgClass: "bg-[#F1F0FE]", borderClass: "border-[#4262FF]" },
  { id: "pastel-peach", label: "피치", bgClass: "bg-[#FFF2EB]", borderClass: "border-[#FFD7CC]" },
  { id: "pastel-teal", label: "틸 민트", bgClass: "bg-[#E1F5F2]", borderClass: "border-[#CCF3EE]" },
  { id: "pastel-coral", label: "코랄", bgClass: "bg-[#FFEAE4]", borderClass: "border-[#FFB7A5]" },
  { id: "pastel-lavender", label: "라벤더", bgClass: "bg-[#F3F0FF]", borderClass: "border-[#DDD6FE]" },
  { id: "pastel-yellow", label: "옐로우", bgClass: "bg-[#FFF9DB]", borderClass: "border-[#FFE58F]" },
];

const BADGE_PRESETS = ["NEW", "HOT", "BEST", "LIVE", "UPDATE"];

interface AddLinkDialogProps {
  trigger?: React.ReactNode;
  defaultCategory?: string;
  onSuccess?: () => void;
}

export default function AddLinkDialog({
  trigger,
  defaultCategory = "projects",
  onSuccess,
}: AddLinkDialogProps) {
  const [open, setOpen] = useState(false);
  const { categories, addLinkBlock, setSelectedCategory } = useLinkStore();

  // 폼 입력 상태
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [category, setCategory] = useState(defaultCategory);
  const [variant, setVariant] = useState<CardVariant>("default");
  const [icon, setIcon] = useState("Globe");
  const [badge, setBadge] = useState("");
  const [isPinned, setIsPinned] = useState(false);

  // 유효성 에러 상태
  const [titleError, setTitleError] = useState("");
  const [urlError, setUrlError] = useState("");

  const resetForm = () => {
    setTitle("");
    setUrl("");
    setSubtitle("");
    setCategory(defaultCategory);
    setVariant("default");
    setIcon("Globe");
    setBadge("");
    setIsPinned(false);
    setTitleError("");
    setUrlError("");
  };

  const validate = () => {
    let isValid = true;
    if (!title.trim()) {
      setTitleError("링크 제목을 입력해주세요.");
      isValid = false;
    } else {
      setTitleError("");
    }

    if (!url.trim()) {
      setUrlError("링크 URL을 입력해주세요.");
      isValid = false;
    } else {
      const trimmed = url.trim();
      if (!trimmed.includes(".") && !trimmed.startsWith("mailto:")) {
        setUrlError("올바른 URL 형식(예: https://example.com)을 입력해주세요.");
        isValid = false;
      } else {
        setUrlError("");
      }
    }

    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    addLinkBlock({
      title,
      url,
      subtitle: subtitle || undefined,
      category,
      variant,
      icon,
      badge: badge || undefined,
      isPinned,
    });

    // 추가된 링크 카테고리로 필터 탭 자동 동기화 (전체일 경우 그대로 유지)
    if (category) {
      setSelectedCategory("all");
    }

    resetForm();
    setOpen(false);
    if (onSuccess) {
      onSuccess();
    }
  };

  // 실시간 미리보기용 임시 더미 링크 객체
  const previewLink: LinkBlock = {
    id: "preview",
    type: "link",
    title: title.trim() || "링크 제목을 입력하세요",
    subtitle: subtitle.trim() || "한 줄 소개 및 설명이 여기에 표시됩니다.",
    url: url.trim() || "https://example.com",
    icon,
    category,
    variant,
    badge: badge.trim() || undefined,
    isActive: true,
    isPinned,
    clickCount: 0,
    order: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // 전체를 제외한 카테고리 목록
  const selectableCategories =
    categories?.filter((c) => c.id !== "all") || [];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          trigger ? (
            (props) => React.cloneElement(trigger as React.ReactElement, props)
          ) : (
            <Button
              variant="black-pill"
              size="sm"
              className="gap-1.5 px-3 py-1.5 text-xs font-semibold cursor-pointer shadow-xs"
              type="button"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>새 링크 추가</span>
            </Button>
          )
        }
      />

      <DialogContent className="max-h-[90vh] max-w-xl overflow-hidden p-0 flex flex-col">
        {/* 모달 상단 헤더 */}
        <DialogHeader className="px-6 pt-6 pb-4 sm:px-7 border-b border-zinc-100">
          <div className="flex items-center gap-2 mb-1">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FFD02F] text-[#050038]">
              <Plus className="h-3.5 w-3.5 stroke-[2.5]" />
            </span>
            <DialogTitle>새 링크 추가</DialogTitle>
            <Badge
              variant="outline"
              className="ml-auto mr-7 rounded-full border-zinc-200 bg-zinc-50 px-2.5 py-0.5 text-[10px] font-semibold text-zinc-600"
            >
              로컬 상태 저장 (LocalStorage)
            </Badge>
          </div>
          <DialogDescription>
            새로운 프로젝트, 아티클, 포트폴리오 링크를 프로필에 등록합니다.
          </DialogDescription>
        </DialogHeader>

        {/* 폼 본문 영역 (스크롤 가능) */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-5 sm:px-7 space-y-5">
          {/* 1. 링크 제목 (필수) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="link-title" className="text-xs">
                링크 제목 <span className="text-rose-500">*</span>
              </Label>
              <span className="text-[11px] text-zinc-400">
                {title.length}/40
              </span>
            </div>
            <Input
              id="link-title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (titleError) setTitleError("");
              }}
              placeholder="예: My Awesome Project, 실시간 화이트보드 데모"
              maxLength={40}
              autoFocus
            />
            {titleError && (
              <p className="text-[11px] font-medium text-rose-500">{titleError}</p>
            )}
          </div>

          {/* 2. 링크 URL (필수) */}
          <div className="space-y-1.5">
            <Label htmlFor="link-url" className="text-xs">
              링크 URL <span className="text-rose-500">*</span>
            </Label>
            <Input
              id="link-url"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                if (urlError) setUrlError("");
              }}
              placeholder="https://github.com/username/project 또는 https://..."
            />
            {urlError && (
              <p className="text-[11px] font-medium text-rose-500">{urlError}</p>
            )}
          </div>

          {/* 3. 서브타이틀 / 한 줄 설명 (선택) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="link-subtitle" className="text-xs">
                한 줄 설명 (선택)
              </Label>
              <span className="text-[11px] text-zinc-400">
                {subtitle.length}/80
              </span>
            </div>
            <Input
              id="link-subtitle"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="예: Next.js 16과 React 19로 구현한 인터랙티브 데모"
              maxLength={80}
            />
          </div>

          {/* 4. 카테고리 선택 */}
          {selectableCategories.length > 0 && (
            <div className="space-y-1.5">
              <Label className="text-xs">카테고리</Label>
              <div className="flex flex-wrap gap-2">
                {selectableCategories.map((cat) => {
                  const isSelected = category === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategory(cat.id)}
                      className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                        isSelected
                          ? "bg-[#050038] text-white shadow-2xs"
                          : "border border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50"
                      }`}
                    >
                      <DynamicIcon
                        name={cat.icon}
                        className={`h-3 w-3 ${
                          isSelected ? "text-[#FFD02F]" : "text-zinc-400"
                        }`}
                      />
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 5. 카드 스타일 (Miro Sticky Note Tint Palette) */}
          <div className="space-y-1.5">
            <Label className="text-xs">카드 테마 (Miro Sticky-Note 팔레트)</Label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {VARIANT_OPTIONS.map((opt) => {
                const isSelected = variant === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setVariant(opt.id)}
                    className={`flex items-center gap-2 rounded-xl border p-2 text-left text-xs transition-all ${
                      isSelected
                        ? "border-[#050038] ring-2 ring-[#050038]/15 font-semibold text-[#050038]"
                        : "border-zinc-200 hover:border-zinc-300 text-zinc-600"
                    }`}
                  >
                    <span
                      className={`h-4 w-4 shrink-0 rounded-full border ${opt.bgClass} ${opt.borderClass}`}
                    />
                    <span className="truncate">{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 6. 아이콘 프리셋 선택 */}
          <div className="space-y-1.5">
            <Label className="text-xs">대표 아이콘</Label>
            <div className="flex flex-wrap gap-1.5">
              {ICON_PRESETS.map((p) => {
                const isSelected = icon.toLowerCase() === p.name.toLowerCase();
                return (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => setIcon(p.name)}
                    title={p.label}
                    className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs transition-all ${
                      isSelected
                        ? "border-[#050038] bg-[#050038] text-white font-medium shadow-xs"
                        : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50"
                    }`}
                  >
                    {p.icon}
                    <span>{p.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 7. 뱃지 및 상단 고정 옵션 */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 pt-1">
            {/* 뱃지 */}
            <div className="space-y-1.5">
              <Label htmlFor="link-badge" className="text-xs">
                강조 뱃지 텍스트 (선택)
              </Label>
              <Input
                id="link-badge"
                value={badge}
                onChange={(e) => setBadge(e.target.value.toUpperCase())}
                placeholder="예: NEW, HOT, BEST"
                maxLength={10}
              />
              <div className="flex flex-wrap gap-1 pt-1">
                {BADGE_PRESETS.map((bp) => (
                  <button
                    key={bp}
                    type="button"
                    onClick={() => setBadge(badge === bp ? "" : bp)}
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold transition-colors ${
                      badge === bp
                        ? "bg-[#FFD02F] text-[#050038]"
                        : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                    }`}
                  >
                    {bp}
                  </button>
                ))}
              </div>
            </div>

            {/* 상단 고정 체크 */}
            <div className="space-y-1.5">
              <Label className="text-xs">상단 고정 (Pin)</Label>
              <button
                type="button"
                onClick={() => setIsPinned(!isPinned)}
                className={`flex h-10 w-full items-center justify-between rounded-xl border px-3.5 text-xs transition-all ${
                  isPinned
                    ? "border-[#050038] bg-zinc-50 text-[#050038] font-semibold"
                    : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300"
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <Pin className={`h-3.5 w-3.5 ${isPinned ? "rotate-45 fill-current" : ""}`} />
                  <span>추천 링크로 상단 핀 고정</span>
                </span>
                <span
                  className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                    isPinned
                      ? "border-[#050038] bg-[#050038] text-white"
                      : "border-zinc-300"
                  }`}
                >
                  {isPinned && <Check className="h-2.5 w-2.5 stroke-[3]" />}
                </span>
              </button>
              <p className="text-[11px] text-zinc-400">
                핀이 설정된 링크는 핀 아이콘이 표시됩니다.
              </p>
            </div>
          </div>

          {/* 8. 실시간 카드 미리보기 */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-2">
              <span className="font-sans text-[11px] font-semibold uppercase tracking-wider text-zinc-500 flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-[#FFD02F]" />
                실시간 렌더링 미리보기
              </span>
              <span className="text-[11px] text-zinc-400">
                입력 내용이 실시간 반영됩니다
              </span>
            </div>
            <div className="rounded-2xl border border-dashed border-zinc-200 bg-zinc-50/60 p-3 pointer-events-none">
              <LinkCard link={previewLink} onLinkClick={() => {}} />
            </div>
          </div>

          {/* 모달 하단 버튼 영역 */}
          <DialogFooter className="border-t border-zinc-100 pt-4 flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
            <Button
              type="button"
              variant="outline-pill"
              size="sm"
              onClick={() => {
                resetForm();
                setOpen(false);
              }}
              className="px-4 py-2 text-xs"
            >
              취소
            </Button>
            <Button
              type="submit"
              variant="black-pill"
              size="sm"
              className="px-5 py-2 text-xs font-semibold"
            >
              링크 추가하기
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
