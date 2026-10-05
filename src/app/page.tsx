import type { Metadata } from "next";
import ProfileCard from "./components/ProfileCard";

export const metadata: Metadata = {
  title: "이지윤 | Frontend Developer",
  description:
    "사용자의 일상에 가치를 더하는 웹을 만드는 프론트엔드 개발자 이지윤의 프로필 링크입니다.",
  openGraph: {
    title: "이지윤 | Frontend Developer",
    description:
      "사용자의 일상에 가치를 더하는 웹을 만드는 프론트엔드 개발자 이지윤의 프로필 링크입니다.",
    type: "website",
  },
};

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-zinc-950 px-4 py-12 antialiased selection:bg-indigo-500 selection:text-white">
      {/* 앰비언트 오로라 배경 블러 레이어 */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* 인디고 글로우 */}
        <div className="animate-float-slow absolute -left-20 top-1/4 h-96 w-96 rounded-full bg-indigo-600/25 blur-[120px]" />
        {/* 퍼플 글로우 */}
        <div className="animate-float-reverse absolute -right-20 top-1/3 h-96 w-96 rounded-full bg-purple-600/20 blur-[130px]" />
        {/* 시안 / 틸 미세 하이라이트 */}
        <div className="animate-float-slow absolute bottom-10 left-1/3 h-80 w-80 rounded-full bg-cyan-600/15 blur-[100px]" />
        {/* 미세한 그리드 패턴 오버레이 */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      {/* 메인 프로필 카드 */}
      <ProfileCard />
    </div>
  );
}
