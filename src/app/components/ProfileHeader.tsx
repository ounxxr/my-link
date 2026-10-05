"use client";

import React, { useState } from "react";
import { Check, Share2, Mail, MapPin, Plus } from "lucide-react";
import { UserProfile } from "@/types/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import AddLinkDialog from "./AddLinkDialog";

interface ProfileHeaderProps {
  user: UserProfile;
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  const [copiedShare, setCopiedShare] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2400);
  };

  const handleShare = async () => {
    try {
      if (typeof window !== "undefined" && navigator.share) {
        await navigator.share({
          title: `${user.displayName} | ${user.headline}`,
          text: user.bio,
          url: window.location.href,
        });
      } else if (typeof window !== "undefined") {
        await navigator.clipboard.writeText(window.location.href);
        setCopiedShare(true);
        triggerToast("링크가 클립보드에 복사되었습니다! 📋");
        setTimeout(() => setCopiedShare(false), 2200);
      }
    } catch {
      // dismissed
    }
  };

  const handleCopyEmail = async () => {
    try {
      if (typeof window !== "undefined") {
        await navigator.clipboard.writeText(user.email);
        setCopiedEmail(true);
        triggerToast(`${user.email} 주소가 복사되었습니다! ✉️`);
        setTimeout(() => setCopiedEmail(false), 2200);
      }
    } catch {
      // fallback
    }
  };

  return (
    <>
      {/* Miro 스타일 토스트 노티피케이션 (Level 4 Depth) */}
      <div
        aria-live="polite"
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 pointer-events-none ${
          showToast
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-4 scale-95"
        }`}
      >
        <div className="flex items-center gap-2.5 rounded-full bg-[#050038] px-4 py-2.5 text-xs font-medium text-white shadow-[0px_12px_24px_rgba(5,0,56,0.18)] border border-white/10">
          <Check className="h-4 w-4 text-[#FFD02F]" />
          <span>{toastMessage}</span>
        </div>
      </div>

      {/* 상단 내비게이션 바 */}
      <header className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          {/* MyLink 워드마크 배지 */}
          <div className="flex h-8 items-center justify-center rounded-lg border border-[#C7D2FE]/70 bg-[#EEF2FF] px-3 font-sans text-xs font-bold tracking-tight text-[#3730A3] shadow-xs">
            MyLink
          </div>
          <span className="hidden font-sans text-xs font-medium text-zinc-500 sm:inline-block">
            / profile / {user.username}.workspace
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* 상태 배지 */}
          {user.statusBadge && (
            <Badge
              variant="outline"
              className="hidden md:inline-flex rounded-full border-[#CEEAD6]/80 bg-[#E6F4EA] px-3 py-1 font-sans text-[11px] font-semibold text-[#137333]"
            >
              {user.statusBadge}
            </Badge>
          )}

          {/* 공유하기 원형 버튼 (shadcn Button variant="icon-circle") */}
          <Button
            onClick={handleShare}
            variant="icon-circle"
            size="icon"
            title="프로필 링크 복사 및 공유"
            type="button"
          >
            {copiedShare ? (
              <Check className="h-4 w-4 text-emerald-600" />
            ) : (
              <Share2 className="h-4 w-4 text-zinc-700" />
            )}
          </Button>

          {/* 새 링크 추가 다이얼로그 트리거 */}
          <AddLinkDialog
            trigger={
              <Button
                variant="outline-pill"
                size="sm"
                className="gap-1.5 px-3 py-2 text-xs font-semibold cursor-pointer border-zinc-200 text-[#050038] hover:border-zinc-300 hover:bg-zinc-50"
                type="button"
                title="새 링크 추가"
              >
                <Plus className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">링크 추가</span>
              </Button>
            }
            onSuccess={() => triggerToast("새 링크가 성공적으로 추가되었습니다! 🎉")}
          />

          {/* Contact Me CTA 버튼 (shadcn Button variant="black-pill") */}
          <Button
            onClick={handleCopyEmail}
            variant="black-pill"
            size="sm"
            className="px-4 py-2 text-xs"
            type="button"
          >
            {copiedEmail ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span>복사 완료</span>
              </>
            ) : (
              <>
                <Mail className="h-3.5 w-3.5" />
                <span>Contact Me</span>
              </>
            )}
          </Button>
        </div>
      </header>

      <Separator />

      {/* 히어로 프로필 영역 */}
      <section className="px-6 pt-7 pb-4 sm:px-9">
        <div className="flex flex-col sm:flex-row sm:items-center gap-5">
          {/* 둥근 아바타 컴포넌트 (shadcn/ui Avatar) */}
          <div className="relative shrink-0">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.avatarUrl} alt={user.displayName} />
              <AvatarFallback>{user.displayName.slice(0, 2)}</AvatarFallback>
            </Avatar>
            {/* 온라인 상태 인디케이터 점 */}
            <span className="absolute bottom-0.5 right-0.5 block h-4 w-4 rounded-full border-2 border-white bg-emerald-500 shadow-xs" />
          </div>

          {/* 프로필 정보 */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <Badge
                variant="outline"
                className="rounded-full border-transparent bg-[#E0F2FE] px-2.5 py-0.5 font-sans text-[11px] font-semibold text-[#0369A1]"
              >
                Frontend Developer
              </Badge>
              <Badge
                variant="outline"
                className="rounded-full border-transparent bg-[#F1F0FE] px-2.5 py-0.5 font-sans text-[11px] font-semibold text-[#282582]"
              >
                UI / UX Focused
              </Badge>
              {user.location && (
                <Badge
                  variant="outline"
                  className="rounded-full border-transparent bg-zinc-100 px-2.5 py-0.5 font-sans text-[11px] font-medium text-zinc-600 inline-flex items-center gap-1"
                >
                  <MapPin className="h-3 w-3 text-zinc-400" />
                  {user.location}
                </Badge>
              )}
            </div>

            <div className="flex items-baseline gap-2.5">
              <h1 className="font-sans text-2xl font-bold tracking-tight text-[#050038] sm:text-3xl">
                {user.displayName}
              </h1>
              <span className="font-sans text-sm font-normal text-zinc-400">
                @{user.username}
              </span>
            </div>

            <p className="mt-1 font-sans text-xs font-medium text-zinc-500">
              {user.headline}
            </p>
          </div>
        </div>

        {/* 바이오 본문 */}
        <p className="mt-4 font-sans text-sm leading-relaxed text-zinc-600 max-w-xl">
          {user.bio}
        </p>
      </section>
    </>
  );
}
