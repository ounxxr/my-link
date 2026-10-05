"use client";

import React, { useState } from "react";
import {
  Mail,
  ExternalLink,
  Copy,
  Check,
  Sparkles,
  BookOpen,
  Share2,
  Code2,
  Layers,
  Palette,
  Terminal,
  GitBranch,
} from "lucide-react";

// GitHub 공식 SVG 아이콘
function GithubIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        clipRule="evenodd"
      />
    </svg>
  );
}

interface LinkItem {
  id: string;
  title: string;
  subtitle: string;
  url?: string;
  icon: React.ReactNode;
  badge?: string;
  isCopyAction?: boolean;
  copyValue?: string;
}

export default function ProfileCard() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  // 기본 이메일 주소 (언제든 변경 가능)
  const emailAddress = "ounxxr@gmail.com";

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2200);
    } catch {
      // fallback
    }
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "이지윤 | Frontend Developer",
          text: "프론트엔드 개발자 이지윤의 프로필 링크입니다.",
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopiedShare(true);
        setTimeout(() => setCopiedShare(false), 2200);
      }
    } catch {
      // dismissed
    }
  };

  const links: LinkItem[] = [
    {
      id: "github",
      title: "GitHub",
      subtitle: "github.com/ounxxr",
      url: "https://github.com/ounxxr",
      icon: <GithubIcon className="h-5 w-5 text-zinc-100" />,
      badge: "Projects & Code",
    },
    {
      id: "email",
      title: "이메일 보내기",
      subtitle: emailAddress,
      isCopyAction: true,
      copyValue: emailAddress,
      icon: <Mail className="h-5 w-5 text-indigo-400" />,
      badge: "원클릭 복사",
    },
    {
      id: "blog",
      title: "기술 블로그",
      subtitle: "개발 지식과 트러블슈팅 아카이브",
      url: "https://velog.io/@ounxxr",
      icon: <BookOpen className="h-5 w-5 text-emerald-400" />,
      badge: "Velog",
    },
    {
      id: "portfolio",
      title: "포트폴리오 & 프로젝트",
      subtitle: "진행했던 주요 웹 프로젝트 모음",
      url: "#",
      icon: <Sparkles className="h-5 w-5 text-amber-400" />,
      badge: "Showcase",
    },
  ];

  const techStack = [
    { name: "React", icon: <Layers className="h-3.5 w-3.5 text-cyan-400" /> },
    { name: "Next.js", icon: <Code2 className="h-3.5 w-3.5 text-white" /> },
    { name: "TypeScript", icon: <Terminal className="h-3.5 w-3.5 text-blue-400" /> },
    { name: "Tailwind CSS", icon: <Palette className="h-3.5 w-3.5 text-teal-400" /> },
    { name: "JavaScript", icon: <Code2 className="h-3.5 w-3.5 text-yellow-400" /> },
    { name: "Git", icon: <GitBranch className="h-3.5 w-3.5 text-orange-400" /> },
  ];

  return (
    <div className="relative w-full max-w-md">
      {/* 바깥쪽 앰비언트 글로우 테두리 효과 */}
      <div className="absolute -inset-0.5 rounded-[2.5rem] bg-gradient-to-b from-indigo-500/30 via-purple-500/20 to-pink-500/30 opacity-75 blur-xl transition-all duration-500" />

      {/* 메인 프로필 카드 */}
      <main className="relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-zinc-900/60 p-0 text-zinc-100 shadow-2xl backdrop-blur-2xl transition-all duration-300">
        
        {/* 상단 커버 배너 아트 */}
        <div className="relative h-32 w-full overflow-hidden bg-gradient-to-r from-violet-600/40 via-indigo-600/30 to-pink-500/40">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-400/20 via-transparent to-transparent" />
          
          {/* 공유 버튼 */}
          <button
            onClick={handleShare}
            className="group absolute right-4 top-4 flex h-9 items-center gap-1.5 rounded-full border border-white/15 bg-black/40 px-3.5 py-1.5 text-xs font-medium text-zinc-200 backdrop-blur-md transition-all hover:border-white/30 hover:bg-black/60 active:scale-95"
            title="프로필 공유하기"
            aria-label="프로필 공유"
          >
            {copiedShare ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400">링크 복사됨</span>
              </>
            ) : (
              <>
                <Share2 className="h-3.5 w-3.5 text-zinc-300 transition-transform group-hover:rotate-12" />
                <span>공유</span>
              </>
            )}
          </button>
        </div>

        {/* 프로필 정보 영역 */}
        <div className="px-6 pb-8 pt-0 sm:px-8">
          {/* 아바타 */}
          <div className="relative -mt-16 mb-4 flex justify-center">
            <div className="group relative">
              {/* 아바타 글로우 링 */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 opacity-80 blur transition duration-300 group-hover:opacity-100" />
              
              <div className="relative flex h-28 w-28 items-center justify-center rounded-full border-4 border-zinc-950 bg-gradient-to-br from-zinc-800 to-zinc-900 text-3xl font-bold tracking-tight text-white shadow-xl">
                <span className="bg-gradient-to-br from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                  지윤
                </span>

                {/* 상태 뱃지 (Open to work 펄스) */}
                <div
                  className="absolute bottom-1 right-1 flex items-center justify-center rounded-full border-2 border-zinc-950 bg-emerald-500 p-1 shadow"
                  title="현재 협업 및 커피챗 환영"
                >
                  <span className="absolute h-3 w-3 animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative h-2 w-2 rounded-full bg-emerald-300" />
                </div>
              </div>
            </div>
          </div>

          {/* 이름 & 신분 */}
          <div className="text-center">
            <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              이지윤
              <span className="ml-2 text-sm font-normal text-zinc-400">
                Jiyoon Lee
              </span>
            </h1>

            {/* 역할 뱃지 */}
            <div className="mt-2.5 flex items-center justify-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-300 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                Frontend / Web Developer
              </span>
            </div>

            {/* 소개글 */}
            <p className="mx-auto mt-3.5 max-w-xs break-keep text-sm leading-relaxed text-zinc-300/90">
              사용자의 일상에 가치를 더하는 웹을 만듭니다. 직관적인 인터랙션과 완성도 높은 UX, 깔끔한 코드를 지향합니다.
            </p>

            {/* 상태 알림 칩 */}
            <div className="mt-3 flex justify-center">
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400/90">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                열린 기회 & 커피챗 환영
              </span>
            </div>
          </div>

          {/* 구분선 */}
          <div className="my-6 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* 링크 카드 모음 */}
          <div className="flex flex-col gap-3">
            {links.map((link) => {
              if (link.isCopyAction) {
                return (
                  <button
                    key={link.id}
                    onClick={handleCopyEmail}
                    className="group relative flex w-full items-center justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 text-left backdrop-blur-md transition-all duration-300 hover:border-indigo-500/40 hover:bg-white/[0.08] hover:shadow-lg hover:shadow-indigo-500/10 active:scale-[0.98]"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-zinc-900/80 transition-transform duration-300 group-hover:scale-105">
                        {link.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-white">
                            {link.title}
                          </span>
                          {link.badge && (
                            <span className="rounded-md border border-indigo-500/20 bg-indigo-500/10 px-1.5 py-0.5 text-[10px] font-medium text-indigo-300">
                              {link.badge}
                            </span>
                          )}
                        </div>
                        <p className="mt-0.5 text-xs text-zinc-400">
                          {link.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center pl-2 text-zinc-400 transition-colors group-hover:text-white">
                      {copiedEmail ? (
                        <div className="flex items-center gap-1 text-xs font-medium text-emerald-400">
                          <Check className="h-4 w-4" />
                          <span>복사완료</span>
                        </div>
                      ) : (
                        <Copy className="h-4 w-4 text-zinc-400 transition-transform group-hover:scale-110" />
                      )}
                    </div>
                  </button>
                );
              }

              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex w-full items-center justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-3.5 text-left backdrop-blur-md transition-all duration-300 hover:border-indigo-500/40 hover:bg-white/[0.08] hover:shadow-lg hover:shadow-indigo-500/10 active:scale-[0.98]"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-zinc-900/80 transition-transform duration-300 group-hover:scale-105">
                      {link.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-white">
                          {link.title}
                        </span>
                        {link.badge && (
                          <span className="rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] font-medium text-zinc-300">
                            {link.badge}
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 text-xs text-zinc-400">
                        {link.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center pl-2 text-zinc-500 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-white">
                    <ExternalLink className="h-4 w-4" />
                  </div>
                </a>
              );
            })}
          </div>

          {/* 기술 스택 영역 */}
          <div className="mt-7">
            <h2 className="mb-3 text-center text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Tech Stack & Focus
            </h2>
            <div className="flex flex-wrap justify-center gap-2">
              {techStack.map((tech) => (
                <span
                  key={tech.name}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-zinc-300 backdrop-blur-sm transition-all duration-200 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                >
                  {tech.icon}
                  {tech.name}
                </span>
              ))}
            </div>
          </div>

          {/* 키워드 태그 */}
          <div className="mt-4 flex flex-wrap justify-center gap-1.5">
            <span className="text-[11px] text-zinc-500">#프론트엔드</span>
            <span className="text-[11px] text-zinc-500">•</span>
            <span className="text-[11px] text-zinc-500">#UI_UX</span>
            <span className="text-[11px] text-zinc-500">•</span>
            <span className="text-[11px] text-zinc-500">#지속적인성장</span>
            <span className="text-[11px] text-zinc-500">•</span>
            <span className="text-[11px] text-zinc-500">#모던웹</span>
          </div>

          {/* 푸터 카피라이트 */}
          <div className="mt-8 border-t border-white/5 pt-4 text-center">
            <p className="text-[11px] text-zinc-500">
              © {new Date().getFullYear()} 이지윤. All rights reserved.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
