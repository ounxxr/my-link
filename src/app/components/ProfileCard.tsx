"use client";

import React, { useState } from "react";
import {
  Mail,
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
  ArrowUpRight,
  MousePointer2,
  StickyNote,
  PenTool,
  Square,
  Type,
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

export default function ProfileCard() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

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

  const techStack = [
    { name: "React", icon: <Layers className="h-3.5 w-3.5 text-sky-600" /> },
    { name: "Next.js", icon: <Code2 className="h-3.5 w-3.5 text-zinc-900" /> },
    { name: "TypeScript", icon: <Terminal className="h-3.5 w-3.5 text-blue-600" /> },
    { name: "Tailwind CSS", icon: <Palette className="h-3.5 w-3.5 text-teal-600" /> },
    { name: "JavaScript", icon: <Code2 className="h-3.5 w-3.5 text-amber-600" /> },
    { name: "Git", icon: <GitBranch className="h-3.5 w-3.5 text-orange-600" /> },
  ];

  return (
    <div className="relative w-full max-w-2xl">
      {/* 실시간 협업 커서 데코레이션 1: 이지윤 (소프트 바이올렛) */}
      <div className="pointer-events-none absolute -top-8 -left-2 z-20 hidden items-center gap-1 sm:flex animate-bounce [animation-duration:3s]">
        <MousePointer2 className="h-5 w-5 fill-[#8B5CF6] text-[#8B5CF6] stroke-[1.5]" />
        <span className="rounded-full bg-[#8B5CF6] px-2.5 py-0.5 font-sans text-[11px] font-semibold text-white shadow-sm">
          이지윤 ✦
        </span>
      </div>

      {/* 실시간 협업 커서 데코레이션 2: 게스트 (소프트 블루) */}
      <div className="pointer-events-none absolute -bottom-6 -right-2 z-20 hidden items-center gap-1 sm:flex animate-pulse">
        <MousePointer2 className="h-4 w-4 fill-[#4262FF] text-[#4262FF] stroke-[1.5]" />
        <span className="rounded-full bg-[#4262FF] px-2.5 py-0.5 font-sans text-[11px] font-semibold text-white shadow-sm">
          Guest Viewing
        </span>
      </div>

      {/* 메인 화이트보드 프레임 카드 */}
      <main className="relative overflow-hidden rounded-[32px] border border-zinc-200/90 bg-white p-0 text-[#050038] shadow-[0px_12px_32px_-4px_rgba(5,0,56,0.08)]">
        
        {/* 상단 내비게이션 바 */}
        <header className="flex items-center justify-between border-b border-zinc-100 px-6 py-4">
          <div className="flex items-center gap-3">
            {/* 소프트 라벤더 워크마크 배지 */}
            <div className="flex h-8 items-center justify-center rounded-lg border border-[#C7D2FE]/70 bg-[#EEF2FF] px-3 font-sans text-xs font-bold tracking-tight text-[#3730A3] shadow-xs">
              MyLink
            </div>
            <span className="hidden font-sans text-xs font-medium text-zinc-500 sm:inline-block">
              / profile / jiyoon.workspace
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* 상단 파스텔 민트 태그 칩 */}
            <span className="hidden rounded-full border border-[#CEEAD6]/80 bg-[#E6F4EA] px-3 py-1 font-sans text-[11px] font-semibold text-[#137333] md:inline-block">
              🟢 Available for Work
            </span>

            {/* 공유하기 원형 버튼 */}
            <button
              onClick={handleShare}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-[#050038] transition-colors hover:bg-zinc-50 active:bg-zinc-100"
              title="프로필 링크 공유하기"
            >
              {copiedShare ? (
                <Check className="h-4 w-4 text-emerald-600" />
              ) : (
                <Share2 className="h-4 w-4 text-zinc-700" />
              )}
            </button>

            {/* 블랙 필 버튼 (Primary CTA) */}
            <button
              onClick={handleCopyEmail}
              className="flex items-center gap-1.5 rounded-full bg-[#050038] px-4 py-2 font-sans text-xs font-medium text-white transition-all hover:bg-zinc-800 active:scale-95"
            >
              {copiedEmail ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  <span>복사 완료</span>
                </>
              ) : (
                <>
                  <Mail className="h-3.5 w-3.5" />
                  <span>Contact Me</span>
                </>
              )}
            </button>
          </div>
        </header>

        {/* 메인 캔버스 콘텐츠 */}
        <div className="p-6 sm:p-9">
          
          {/* 히어로 영역: 이름 & 직함 & 태그 칩 */}
          <section className="mb-8">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="rounded-full bg-[#E0F2FE] px-3 py-1 font-sans text-xs font-semibold text-[#0369A1]">
                Frontend Developer
              </span>
              <span className="rounded-full bg-[#F1F0FE] px-3 py-1 font-sans text-xs font-semibold text-[#282582]">
                UI / UX Focused
              </span>
              <span className="rounded-full bg-[#E1F5F2] px-3 py-1 font-sans text-xs font-semibold text-[#094943]">
                Web Workspace
              </span>
            </div>

            <div className="flex items-baseline gap-3">
              <h1 className="font-sans text-3xl font-medium tracking-tight text-[#050038] sm:text-4xl">
                이지윤
              </h1>
              <span className="font-sans text-lg font-normal text-zinc-400">
                Jiyoon Lee
              </span>
            </div>

            <p className="mt-2.5 max-w-lg font-sans text-base leading-relaxed text-zinc-600">
              사용자의 일상에 자연스럽게 스며드는 인터랙션과 완성도 높은 UX를 설계합니다. 복잡한 문제를 직관적인 비주얼 컴포넌트로 풀어내는 것을 즐깁니다.
            </p>
          </section>

          {/* 파스텔 스티키 노트 피처 카드 그리드 (28px 라운드) */}
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            
            {/* 1. Soft Peach Sticky Card: 바이오 & 핵심 역량 */}
            <div className="group relative flex flex-col justify-between rounded-[28px] bg-[#FFF2EB] p-6 text-[#7A3619] transition-all hover:shadow-[0px_4px_12px_0px_rgba(5,0,56,0.06)]">
              <div>
                <div className="flex items-center justify-between pb-3">
                  <span className="rounded-full bg-white/70 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-[#7A3619]">
                    Sticky Note
                  </span>
                  <StickyNote className="h-4 w-4 text-[#7A3619]/70" />
                </div>
                <h2 className="font-sans text-lg font-medium tracking-tight text-[#5C230C]">
                  가치 있는 웹 경험 설계
                </h2>
                <p className="mt-2 font-sans text-xs leading-relaxed text-[#7A3619]/90">
                  단순한 화면 구현을 넘어, 사용자가 머무는 매 순간이 편리하고 직관적이도록 마이크로 인터랙션과 성능 최적화에 집중합니다.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#7A3619]/15 flex items-center justify-between text-xs font-medium">
                <span>Seoul, KR</span>
                <span className="text-[11px]">✦ Ready for Coffee Chat</span>
              </div>
            </div>

            {/* 2. Teal Sticky Card: GitHub */}
            <a
              href="https://github.com/ounxxr"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col justify-between rounded-[28px] bg-[#E1F5F2] p-6 text-[#094943] transition-all hover:shadow-[0px_4px_12px_0px_rgba(5,0,56,0.06)]"
            >
              <div>
                <div className="flex items-center justify-between pb-3">
                  <span className="rounded-full bg-white/80 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-[#094943]">
                    Code Repository
                  </span>
                  <GithubIcon className="h-5 w-5 text-[#094943]" />
                </div>
                <h2 className="font-sans text-lg font-medium tracking-tight text-[#06332f]">
                  GitHub @ounxxr
                </h2>
                <p className="mt-2 font-sans text-xs leading-relaxed text-[#094943]/85">
                  컴포넌트 주도 개발, 오픈소스 프로젝트 및 일일 잔디를 관리하는 개발자 공간입니다.
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between pt-3 border-t border-[#094943]/15">
                <span className="font-sans text-xs font-medium">github.com/ounxxr</span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/80 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight className="h-4 w-4 text-[#094943]" />
                </span>
              </div>
            </a>

            {/* 3. Coral Sticky Card: Tech Blog */}
            <a
              href="https://velog.io/@ounxxr"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col justify-between rounded-[28px] bg-[#FFEAE4] p-6 text-[#632314] transition-all hover:shadow-[0px_4px_12px_0px_rgba(5,0,56,0.06)]"
            >
              <div>
                <div className="flex items-center justify-between pb-3">
                  <span className="rounded-full bg-white/80 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-[#632314]">
                    Writing & Notes
                  </span>
                  <BookOpen className="h-4 w-4 text-[#632314]" />
                </div>
                <h2 className="font-sans text-lg font-medium tracking-tight text-[#45140b]">
                  기술 블로그 (Velog)
                </h2>
                <p className="mt-2 font-sans text-xs leading-relaxed text-[#632314]/85">
                  새로운 기술 탐구, 트러블슈팅 과정과 사용자 경험에 대한 고민을 글로 기록합니다.
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between pt-3 border-t border-[#632314]/15">
                <span className="font-sans text-xs font-medium">velog.io/@ounxxr</span>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/80 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight className="h-4 w-4 text-[#632314]" />
                </span>
              </div>
            </a>

            {/* 4. Lavender / Featured Card: Contact & Email */}
            <div className="relative flex flex-col justify-between rounded-[28px] bg-[#F1F0FE] p-6 text-[#282582] border-2 border-[#4262FF]/20 shadow-[0px_4px_12px_0px_rgba(5,0,56,0.06)]">
              <div>
                <div className="flex items-center justify-between pb-3">
                  <span className="rounded-full bg-[#4262FF] px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-white">
                    Featured
                  </span>
                  <Sparkles className="h-4 w-4 text-[#4262FF]" />
                </div>
                <h2 className="font-sans text-lg font-medium tracking-tight text-[#1c1a63]">
                  협업 & 커피챗 제안
                </h2>
                <p className="mt-2 font-sans text-xs leading-relaxed text-[#282582]/85">
                  언제든 가벼운 이야기나 새로운 프로젝트 제안을 환영합니다. 클릭 한 번으로 연락해 보세요.
                </p>
              </div>

              <div className="mt-5">
                <button
                  onClick={handleCopyEmail}
                  className="flex w-full items-center justify-between rounded-full bg-[#050038] px-4 py-2.5 text-xs font-medium text-white transition-all hover:bg-zinc-800 active:scale-98"
                >
                  <span className="font-mono">{emailAddress}</span>
                  <span className="flex items-center gap-1 text-[11px] text-zinc-300">
                    {copiedEmail ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="text-emerald-400">복사됨!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>복사</span>
                      </>
                    )}
                  </span>
                </button>
              </div>
            </div>

          </section>

          {/* 기술 스택 섹션 */}
          <section className="mt-8 rounded-2xl border border-zinc-100 bg-[#FAFAFC] p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="font-sans text-xs font-semibold text-zinc-700 uppercase tracking-wider">
                Tech Stack & Tools
              </span>
              <span className="font-sans text-[11px] text-zinc-400">
                Core Capabilities
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <div
                  key={tech.name}
                  className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200/80 bg-white px-3.5 py-1.5 font-sans text-xs font-medium text-[#050038] shadow-[0px_1px_2px_0px_rgba(5,0,56,0.04)] transition-all hover:border-zinc-300 hover:bg-zinc-50"
                >
                  {tech.icon}
                  <span>{tech.name}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 미니 화이트보드 툴바 데코레이션 */}
          <div className="mt-7 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1.5 shadow-[0px_4px_12px_0px_rgba(5,0,56,0.06)]">
              <button
                className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100 text-[#050038]"
                title="Select"
                type="button"
              >
                <MousePointer2 className="h-3.5 w-3.5" />
              </button>
              <button
                className="flex h-7 w-7 items-center justify-center rounded-full text-zinc-500 hover:bg-zinc-100"
                title="Sticky Note"
                type="button"
              >
                <StickyNote className="h-3.5 w-3.5" />
              </button>
              <button
                className="flex h-7 w-7 items-center justify-center rounded-full text-zinc-500 hover:bg-zinc-100"
                title="Shapes"
                type="button"
              >
                <Square className="h-3.5 w-3.5" />
              </button>
              <button
                className="flex h-7 w-7 items-center justify-center rounded-full text-zinc-500 hover:bg-zinc-100"
                title="Text"
                type="button"
              >
                <Type className="h-3.5 w-3.5" />
              </button>
              <button
                className="flex h-7 w-7 items-center justify-center rounded-full text-zinc-500 hover:bg-zinc-100"
                title="Pen"
                type="button"
              >
                <PenTool className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* 푸터 영역 */}
          <footer className="mt-8 border-t border-zinc-100 pt-4 text-center">
            <p className="font-sans text-[11px] text-zinc-400">
              © {new Date().getFullYear()} 이지윤. All rights reserved.
            </p>
          </footer>

        </div>
      </main>
    </div>
  );
}
