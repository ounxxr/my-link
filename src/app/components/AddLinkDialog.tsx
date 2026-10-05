"use client";

import React, { useState, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Plus,
  Sparkles,
  Pin,
  Check,
  CheckCircle2,
  AlertCircle,
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

// --- 1. Zod 스키마 정의 ---
export const linkFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "링크 제목을 입력해주세요.")
    .min(2, "제목은 최소 2자 이상 입력해주세요.")
    .max(40, "제목은 최대 40자까지 입력 가능합니다."),
  url: z
    .string()
    .trim()
    .min(1, "연결할 웹 주소(URL)를 입력해주세요.")
    .refine((val) => !/\s/.test(val), {
      message: "URL에는 공백(띄어쓰기)을 포함할 수 없습니다.",
    })
    .refine(
      (val) => {
        if (val.startsWith("mailto:")) {
          const email = val.replace("mailto:", "").split("?")[0];
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }
        // http, https 생략 허용 및 유효한 도메인 정규식
        const urlPattern =
          /^(https?:\/\/)?([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}(:\d+)?(\/[^\s]*)?$|^https?:\/\/localhost(:\d+)?(\/[^\s]*)?$/i;
        return urlPattern.test(val);
      },
      {
        message: "올바른 웹 주소(예: https://example.com 또는 velog.io/@username)를 입력해주세요.",
      }
    ),
  subtitle: z
    .string()
    .max(80, "한 줄 설명은 최대 80자까지 입력 가능합니다.")
    .optional()
    .or(z.literal("")),
  category: z.string().min(1, "카테고리를 선택해주세요."),
  variant: z.enum([
    "default",
    "featured",
    "pastel-peach",
    "pastel-teal",
    "pastel-coral",
    "pastel-lavender",
    "pastel-yellow",
  ]),
  icon: z.string().min(1, "대표 아이콘을 선택해주세요."),
  badge: z
    .string()
    .max(10, "뱃지 문구는 최대 10자까지 입력 가능합니다.")
    .optional()
    .or(z.literal("")),
  isPinned: z.boolean(),
});

export type LinkFormValues = z.infer<typeof linkFormSchema>;

// --- 2. 프리셋 상수 ---
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

  // --- React Hook Form 초기화 ---
  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors, touchedFields, isSubmitted },
  } = useForm<LinkFormValues>({
    resolver: zodResolver(linkFormSchema),
    mode: "onChange", // 실시간 입력 검증 모드
    defaultValues: {
      title: "",
      url: "",
      subtitle: "",
      category: defaultCategory,
      variant: "default",
      icon: "Globe",
      badge: "",
      isPinned: false,
    },
  });

  // 실시간 입력 필드 구독 (Live Preview & 카운터용, useWatch로 최적화)
  const formValues = useWatch({ control });
  const watchedTitle = formValues.title || "";
  const watchedUrl = formValues.url || "";
  const watchedSubtitle = formValues.subtitle || "";
  const watchedCategory = formValues.category || defaultCategory;
  const watchedVariant = formValues.variant || "default";
  const watchedIcon = formValues.icon || "Globe";
  const watchedBadge = formValues.badge || "";
  const watchedIsPinned = Boolean(formValues.isPinned);

  // 유효 상태 (성공 체크 인디케이터용)
  const isTitleValid = !errors.title && touchedFields.title && watchedTitle.trim().length >= 2;
  const isUrlValid = !errors.url && touchedFields.url && watchedUrl.trim().length > 0;

  // URL 자동 보정 미리보기 텍스트
  const formattedUrlPreview = useMemo(() => {
    const trimmed = watchedUrl.trim();
    if (!trimmed || errors.url) return null;
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://") || trimmed.startsWith("mailto:")) {
      return trimmed;
    }
    return `https://${trimmed}`;
  }, [watchedUrl, errors.url]);

  // 다이얼로그 닫힐 때 폼 초기화
  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      reset({
        title: "",
        url: "",
        subtitle: "",
        category: defaultCategory,
        variant: "default",
        icon: "Globe",
        badge: "",
        isPinned: false,
      });
    }
  };

  // 폼 제출 핸들러 (Zod 검증 통과 완료 시 실행)
  const onSubmit = (data: LinkFormValues) => {
    addLinkBlock({
      title: data.title,
      url: data.url,
      subtitle: data.subtitle || undefined,
      category: data.category,
      variant: data.variant,
      icon: data.icon,
      badge: data.badge || undefined,
      isPinned: data.isPinned,
    });

    // 전체 카테고리 뷰로 이동하여 새로 추가된 링크 즉시 노출
    setSelectedCategory("all");

    reset();
    setOpen(false);
    if (onSuccess) {
      onSuccess();
    }
  };

  // 실시간 미리보기용 임시 더미 링크 객체
  const previewLink: LinkBlock = {
    id: "preview",
    type: "link",
    title: watchedTitle.trim() || "링크 제목을 입력하세요",
    subtitle: watchedSubtitle.trim() || "한 줄 소개 및 설명이 여기에 표시됩니다.",
    url: formattedUrlPreview || (watchedUrl.trim() ? watchedUrl.trim() : "https://example.com"),
    icon: watchedIcon,
    category: watchedCategory,
    variant: watchedVariant,
    badge: watchedBadge.trim() || undefined,
    isActive: true,
    isPinned: watchedIsPinned,
    clickCount: 0,
    order: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // 전체를 제외한 카테고리 목록
  const selectableCategories =
    categories?.filter((c) => c.id !== "all") || [];

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
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
              React Hook Form × Zod
            </Badge>
          </div>
          <DialogDescription>
            Zod 스키마 검증을 거쳐 안전하고 유효한 링크를 프로필에 등록합니다.
          </DialogDescription>
        </DialogHeader>

        {/* 폼 본문 영역 (스크롤 가능) */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex-1 overflow-y-auto px-6 py-5 sm:px-7 space-y-5">
          {/* 전체 유효성 경고 배너 (제출 시도 시 에러가 남아있는 경우) */}
          {isSubmitted && Object.keys(errors).length > 0 && (
            <div className="flex items-center gap-2.5 rounded-xl border border-rose-200 bg-rose-50/80 px-3.5 py-2.5 text-xs text-rose-800">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-500" />
              <span>입력하신 정보 중 확인이 필요한 항목이 있습니다. 붉은색 표시를 확인해주세요.</span>
            </div>
          )}

          {/* 1. 링크 제목 (필수) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="link-title" className="text-xs flex items-center gap-1.5">
                <span>링크 제목</span>
                <span className="text-rose-500 font-bold">*</span>
                {isTitleValid && (
                  <span className="text-[11px] font-medium text-emerald-600 inline-flex items-center gap-0.5">
                    <CheckCircle2 className="h-3 w-3" /> 유효
                  </span>
                )}
              </Label>
              <span
                className={`text-[11px] font-mono ${
                  watchedTitle.length >= 40
                    ? "font-semibold text-rose-500"
                    : watchedTitle.length >= 35
                    ? "text-amber-500"
                    : "text-zinc-400"
                }`}
              >
                {watchedTitle.length}/40
              </span>
            </div>
            <Input
              id="link-title"
              {...register("title")}
              aria-invalid={!!errors.title}
              placeholder="예: My Awesome Project, 실시간 화이트보드 데모"
              maxLength={40}
              autoFocus
            />
            {errors.title ? (
              <p className="flex items-center gap-1 text-[11px] font-medium text-rose-500">
                <AlertCircle className="h-3 w-3 shrink-0" />
                <span>{errors.title.message}</span>
              </p>
            ) : (
              <p className="text-[11px] text-zinc-400">
                방문자가 링크 카드를 식별할 수 있는 직관적인 이름을 2자 이상 입력해주세요.
              </p>
            )}
          </div>

          {/* 2. 링크 URL (필수) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="link-url" className="text-xs flex items-center gap-1.5">
                <span>연결할 웹 주소 (URL)</span>
                <span className="text-rose-500 font-bold">*</span>
                {isUrlValid && (
                  <span className="text-[11px] font-medium text-emerald-600 inline-flex items-center gap-0.5">
                    <CheckCircle2 className="h-3 w-3" /> 확인됨
                  </span>
                )}
              </Label>
            </div>
            <Input
              id="link-url"
              {...register("url")}
              aria-invalid={!!errors.url}
              placeholder="예: https://github.com/username 또는 myproject.dev"
            />
            {errors.url ? (
              <p className="flex items-center gap-1 text-[11px] font-medium text-rose-500">
                <AlertCircle className="h-3 w-3 shrink-0" />
                <span>{errors.url.message}</span>
              </p>
            ) : formattedUrlPreview ? (
              <p className="text-[11px] text-zinc-500 flex items-center gap-1">
                <span className="font-semibold text-[#050038]">연결 주소:</span>
                <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[10px] text-zinc-700">
                  {formattedUrlPreview}
                </code>
              </p>
            ) : (
              <p className="text-[11px] text-zinc-400">
                http/https 프로토콜을 생략하셔도 저장 시 자동으로 추가됩니다.
              </p>
            )}
          </div>

          {/* 3. 서브타이틀 / 한 줄 설명 (선택) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label htmlFor="link-subtitle" className="text-xs">
                한 줄 설명 (선택)
              </Label>
              <span
                className={`text-[11px] font-mono ${
                  watchedSubtitle.length >= 80 ? "font-semibold text-rose-500" : "text-zinc-400"
                }`}
              >
                {watchedSubtitle.length}/80
              </span>
            </div>
            <Input
              id="link-subtitle"
              {...register("subtitle")}
              aria-invalid={!!errors.subtitle}
              placeholder="예: Next.js 16과 React 19로 구현한 인터랙티브 데모"
              maxLength={80}
            />
            {errors.subtitle ? (
              <p className="flex items-center gap-1 text-[11px] font-medium text-rose-500">
                <AlertCircle className="h-3 w-3 shrink-0" />
                <span>{errors.subtitle.message}</span>
              </p>
            ) : (
              <p className="text-[11px] text-zinc-400">
                링크 카드의 타이틀 아래에 부가적인 설명으로 표시됩니다.
              </p>
            )}
          </div>

          {/* 4. 카테고리 선택 */}
          {selectableCategories.length > 0 && (
            <div className="space-y-1.5">
              <Label className="text-xs">카테고리 분류</Label>
              <div className="flex flex-wrap gap-2">
                {selectableCategories.map((cat) => {
                  const isSelected = watchedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setValue("category", cat.id, { shouldValidate: true })}
                      className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium cursor-pointer transition-all ${
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
              {errors.category && (
                <p className="text-[11px] font-medium text-rose-500">{errors.category.message}</p>
              )}
            </div>
          )}

          {/* 5. 카드 테마 (Miro Sticky Note Tint Palette) */}
          <div className="space-y-1.5">
            <Label className="text-xs">카드 테마 (Miro Sticky-Note 팔레트)</Label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {VARIANT_OPTIONS.map((opt) => {
                const isSelected = watchedVariant === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setValue("variant", opt.id, { shouldValidate: true })}
                    className={`flex items-center gap-2 rounded-xl border p-2 text-left text-xs cursor-pointer transition-all ${
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

          {/* 6. 대표 아이콘 프리셋 선택 */}
          <div className="space-y-1.5">
            <Label className="text-xs">대표 아이콘</Label>
            <div className="flex flex-wrap gap-1.5">
              {ICON_PRESETS.map((p) => {
                const isSelected = watchedIcon.toLowerCase() === p.name.toLowerCase();
                return (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => setValue("icon", p.name, { shouldValidate: true })}
                    title={p.label}
                    className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs cursor-pointer transition-all ${
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
              <div className="flex items-center justify-between">
                <Label htmlFor="link-badge" className="text-xs">
                  강조 뱃지 문구 (선택)
                </Label>
                <span
                  className={`text-[11px] font-mono ${
                    watchedBadge.length >= 10 ? "font-semibold text-rose-500" : "text-zinc-400"
                  }`}
                >
                  {watchedBadge.length}/10
                </span>
              </div>
              <Input
                id="link-badge"
                {...register("badge")}
                aria-invalid={!!errors.badge}
                placeholder="예: NEW, HOT, BEST"
                maxLength={10}
              />
              {errors.badge && (
                <p className="flex items-center gap-1 text-[11px] font-medium text-rose-500">
                  <AlertCircle className="h-3 w-3 shrink-0" />
                  <span>{errors.badge.message}</span>
                </p>
              )}
              <div className="flex flex-wrap gap-1 pt-1">
                {BADGE_PRESETS.map((bp) => (
                  <button
                    key={bp}
                    type="button"
                    onClick={() =>
                      setValue("badge", watchedBadge === bp ? "" : bp, {
                        shouldValidate: true,
                        shouldDirty: true,
                      })
                    }
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold cursor-pointer transition-colors ${
                      watchedBadge === bp
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
                onClick={() =>
                  setValue("isPinned", !watchedIsPinned, {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
                className={`flex h-10 w-full items-center justify-between rounded-xl border px-3.5 text-xs cursor-pointer transition-all ${
                  watchedIsPinned
                    ? "border-[#050038] bg-zinc-50 text-[#050038] font-semibold"
                    : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300"
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <Pin className={`h-3.5 w-3.5 ${watchedIsPinned ? "rotate-45 fill-current" : ""}`} />
                  <span>추천 링크로 상단 핀 고정</span>
                </span>
                <span
                  className={`h-4 w-4 rounded-full border flex items-center justify-center ${
                    watchedIsPinned
                      ? "border-[#050038] bg-[#050038] text-white"
                      : "border-zinc-300"
                  }`}
                >
                  {watchedIsPinned && <Check className="h-2.5 w-2.5 stroke-[3]" />}
                </span>
              </button>
              <p className="text-[11px] text-zinc-400">
                핀이 설정된 링크는 핀 아이콘과 함께 강조 표시됩니다.
              </p>
            </div>
          </div>

          {/* 8. 실시간 카드 미리보기 */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-2">
              <span className="font-sans text-[11px] font-semibold uppercase tracking-wider text-zinc-500 flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-[#FFD02F]" />
                실시간 렌더링 미리보기 (Watch)
              </span>
              <span className="text-[11px] text-zinc-400">
                React Hook Form 상태가 실시간 반영됩니다
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
              onClick={() => handleOpenChange(false)}
              className="px-4 py-2 text-xs cursor-pointer"
            >
              취소
            </Button>
            <Button
              type="submit"
              variant="black-pill"
              size="sm"
              className="px-5 py-2 text-xs font-semibold cursor-pointer"
            >
              링크 추가하기
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
