import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "이지윤 | 프로필",
  description: "안녕하세요! 바이브 코딩을 배우고 있는 대학생입니다.",
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
          <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300">
            Student & Learner
          </span>
        </div>

        {/* 소개글 */}
        <p className="mt-4 break-keep text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          안녕하세요! 바이브 코딩을 배우고 있는 대학생입니다.
        </p>

        {/* 태그 모음 */}
        <div className="mt-6 flex flex-wrap justify-center gap-2 pt-6 border-t border-zinc-100 dark:border-zinc-800/60">
          <span className="rounded-lg bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
            # 바이브코딩
          </span>
          <span className="rounded-lg bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
            # 대학생
          </span>
          <span className="rounded-lg bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
            # 웹개발
          </span>
        </div>
      </main>
    </div>
  );
}
