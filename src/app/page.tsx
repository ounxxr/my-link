import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "이지윤 | Frontend Developer",
  description: "사용자의 일상에 가치를 더하는 웹을 만드는 개발자 이지윤입니다. 직관적인 인터페이스와 완성도 높은 사용자 경험을 지향합니다.",
};

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-4 py-12 text-zinc-900 antialiased dark:bg-zinc-950 dark:text-zinc-100">
      <main className="w-full max-w-sm rounded-3xl border border-zinc-200/80 bg-white p-8 text-center shadow-sm backdrop-blur-sm transition-all dark:border-zinc-800/80 dark:bg-zinc-900/90 sm:p-10">
        {/* 프로필 아바타 */}
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-3xl font-semibold text-white shadow-md ring-4 ring-white dark:ring-zinc-800">
          지윤
        </div>

        {/* 이름 */}
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          이지윤
        </h1>

        {/* 태그 / 신분 */}
        <div className="mt-2 flex justify-center">
          <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300">
            Frontend / Web Developer
          </span>
        </div>

        {/* 개발자 소개글 */}
        <p className="mt-4 break-keep text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          사용자의 일상에 가치를 더하는 웹을 만드는 개발자입니다. 새로운 기술을 탐구하고 직관적인 사용자 경험(UX)과 깔끔한 코드를 지향합니다.
        </p>

        {/* 링크 버튼 */}
        <div className="mt-6 flex flex-col gap-2.5">
          <a
            href="https://github.com/ounxxr"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white shadow transition-all hover:bg-zinc-800 active:scale-[0.98] dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            <svg
              className="h-4 w-4"
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
            <span>GitHub @ounxxr</span>
          </a>
        </div>

        {/* 태그 모음 */}
        <div className="mt-6 flex flex-wrap justify-center gap-2 border-t border-zinc-100 pt-6 dark:border-zinc-800/60">
          <span className="rounded-lg bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
            # 프론트엔드
          </span>
          <span className="rounded-lg bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
            # React / Next.js
          </span>
          <span className="rounded-lg bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
            # 웹개발
          </span>
          <span className="rounded-lg bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
            # 지속적인성장
          </span>
        </div>
      </main>
    </div>
  );
}
