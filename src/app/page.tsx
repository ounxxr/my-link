import type { Metadata } from "next";
import ProfileCard from "./components/ProfileCard";

export const metadata: Metadata = {
  title: "이지윤 | Frontend Developer",
  description:
    "사용자의 일상에 가치를 더하는 웹을 만드는 프론트엔드 개발자 이지윤의 프로필입니다.",
  openGraph: {
    title: "이지윤 | Frontend Developer",
    description:
      "사용자의 일상에 가치를 더하는 웹을 만드는 프론트엔드 개발자 이지윤의 프로필입니다.",
    type: "website",
  },
};

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-white px-4 py-12 antialiased selection:bg-[#E0E7FF] selection:text-[#3730A3] miro-canvas-grid">
      {/* 캔버스 배경 장식 헤어라인 */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black_80%)]" />

      {/* 메인 프로필 화이트보드 카드 */}
      <div className="relative z-10 w-full flex justify-center">
        <ProfileCard />
      </div>
    </div>
  );
}
