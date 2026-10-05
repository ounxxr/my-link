# [PRD] 링크트리 클론 서비스: 마이링크 (MyLink)

> **문서 버전:** v1.4.1 (더미 데이터 JSON 및 백엔드 Mock API 규격 반영 개정판)  
> **작성일:** 2026-10-05  
> **진행 단계:** **Step 1 (현재 진행)** - LocalStorage 기반 단일 프로필 페이지 구현  
> **기반 기술:** Next.js (App Router), React 19, TypeScript, Tailwind CSS v4, shadcn/ui (Base UI 기반), Zustand, LocalStorage  

---

## 1. 프로젝트 개요 (Overview)

### 1.1 배경 및 목적
- SNS(인스타그램, 깃허브 등) 프로필에 등록할 수 있는 단일 링크(Link-in-bio) 솔루션 "마이링크"를 구축함.
- **현재 시연(Demo) 목적에 맞추어 점진적·단계별(Phased) 개발을 진행함.**
- **[Step 1 - 현재]**: 대시보드나 통계 기능은 구현하지 않고, **LocalStorage를 활용하여 브라우저에서 동적으로 데이터를 읽어와 렌더링하는 완성도 높은 "프로필 페이지"**를 우선 완성함.
- **[Step 2 & 3 - 향후]**: 프로필 페이지가 완성된 이후, 관리자 대시보드(편집기, 프리뷰) 및 방문자 분석/통계 기능을 순차적으로 확장함.

### 1.2 디자인 시스템 및 스타일링 원칙: Tailwind CSS v4 × shadcn/ui × Miro Design System (`design.md` 준수)
본 프로젝트의 모든 UI/UX는 **공식 `shadcn/ui`의 견고한 컴포넌트 아키텍처(WAI-ARIA 웹 접근성, Headless 프리미티브, Tailwind CSS v4 CSS-first 토큰)**를 토대로 하되, 시각적 스타일링과 인터페이스 언어는 [`design.md`](file:///c:/Users/jiyoo/projects/my-link-hy/mylink/design.md)의 **Miro Design System**을 1:1로 정확하게 반영하여 구축한다.

> [!IMPORTANT]
> **스타일링 및 컴포넌트 아키텍처 핵심 규칙:**
> 1. **모듈 CSS(CSS Modules) 사용 금지 & Tailwind CSS v4 100% 통일**:
>    - 모듈 CSS(`*.module.css`) 사용을 일체 금지하며, 모든 스타일링은 **Tailwind CSS v4**의 CSS-first 유틸리티 클래스와 `globals.css` 디자인 토큰으로 통일한다.
> 2. **shadcn/ui 기반 재사용 컴포넌트 필수 사용**:
>    - 페이지의 모든 UI 요소(아바타, 버튼, 카드, 뱃지, 구분선 등)는 반드시 `src/components/ui/`에 위치한 **shadcn/ui 기반 원자 컴포넌트(`Button`, `Card`, `Badge`, `Avatar`, `Separator`)를 재사용**하여 조립해야 한다. 순수 HTML 태그의 직접적인 중복 스타일링을 금지한다.

1. **캔버스 & 서피스 (Canvas & Surface)**:
   - **스타크 화이트 캔버스**: 순수 화이트(`canvas`: `#ffffff`) 배경과 은은한 도트 격자(`miro-canvas-grid`, `radial-gradient(rgba(5, 0, 56, 0.08) 1.2px, transparent 1.2px)`)로 시각적 작업공간 느낌 연출.
   - **정교한 엘리베이션(Depth)**: 1px 헤어라인 테두리(`hairline-soft`: `#05003810`)와 Level 2 카드 그림자(`rgba(5, 0, 56, 0.06) 0px 4px 12px 0px`)를 기본으로 적용.
2. **시그니처 컬러 팔레트 (Color Tokens)**:
   - **Deep Ink (`#050038`)**: 주 텍스트 및 대표 Primary CTA 버튼의 핵심 색상.
   - **Miro Yellow (`#FFD02F`)**: 워드마크, 프로모 뱃지, 태그 칩 등 브랜드 시그니처 강조에만 사용 (※ 메인 CTA 배경으로는 절대 사용 금지).
   - **Sticky-Note Pastel Palette**: 실제 화이트보드 포스트잇 색상을 계승한 파스텔 틴트(Yellow `#FFF1B8`, Coral `#FFD7CC`, Teal `#CCF3EE`, Rose `#FFE0EB`)를 서브 카드 및 카테고리 태그 칩에 배치.
3. **타이포그래피 위계 (Typography)**:
   - Roobert PRO / Geist Sans를 기본으로 하며, 500(Medium) 가중치를 주축으로 디스플레이 헤딩에는 타이트한 행간(Tight Leading 1.05~1.15)과 음수 자간(-1px ~ -2px)을 적용.
4. **쉐입 및 라운딩 (Shapes & Radius)**:
   - **Pill 형태 (`rounded-full`)**: 모든 버튼(Primary, Secondary, Ghost, Icon), 태그 칩, 세그먼트 탭은 필(Pill) 형태로 통일.
   - **카드 라운딩**: 표준 카드는 `rounded-2xl` (16px), 메인 프로필 및 피처 카드는 `rounded-3xl` (28px) 코너 라운딩 적용.
5. **shadcn/ui 컴포넌트별 Miro 스타일 매핑 명세**:
   - **`Button` (`src/components/ui/button.tsx`)**:
     - `default`: Black-Pill CTA (`bg-[#050038] text-white rounded-full hover:bg-black/85`)
     - `secondary` / `outline`: Outlined Pill (`border border-[#050038]/20 text-[#050038] rounded-full hover:bg-[#050038]/5`)
     - `yellow`: Brand Yellow Pill (`bg-[#FFD02F] text-[#050038] font-medium rounded-full`)
     - `ghost` / `icon`: 원형 유틸리티 버튼 (`size-9 rounded-full border border-hairline hover:bg-muted`)
   - **`Card` (`src/components/ui/card.tsx`)**:
     - `card-base`: Miro 보드 타일/화이트 서피스 (`rounded-3xl`, 1px 헤어라인, Level 2 depth).
     - `card-pastel`: 스티키 노트 팔레트(Rose, Teal, Coral, Yellow) 배경 카드 variant 지원.
   - **`Badge` (`src/components/ui/badge.tsx`)**:
     - Miro 스타일 태그 칩 (`rounded-full`, 파스텔 배경 + 고대비 다크 텍스트).
   - **`Avatar` (`src/components/ui/avatar.tsx`)**:
     - Miro 협업자 아바타 스타일의 정교한 2px 헤어라인 서클.
   - **`Separator` (`src/components/ui/separator.tsx`)**:
     - Miro `hairline-soft` (0.5~1px의 연한 그레이 디바이더).
   - **`Toast` (Sonner)**:
     - Miro 모달 깊이감(Level 4)과 헤어라인 보더의 심플한 알림 토스트.

---

## 2. 유저 페르소나 및 사용자 시나리오 (Personas & User Scenarios)

### 2.1 주요 페르소나 (Personas)
1. **페르소나 A (소유자/크리에이터 - 이지윤, 28세)**:
   - 프론트엔드 개발자이자 기술 블로그 및 SNS를 운영하는 크리에이터.
   - 깃허브, 블로그, 포트폴리오, 이메일 연락처를 모바일 환경에서 세련되게 보여주고 싶어함.
2. **페르소나 B (방문자 - 김민준, 31세)**:
   - 인스타그램 및 깃허브를 둘러보다 이지윤 님의 프로필 링크를 타고 들어온 협업 담당자/채용 담당자.
   - 모바일에서 빠르게 핵심 이력과 프로젝트 데모를 확인하고자 함.
3. **페르소나 C (시연 평가자/청중)**:
   - 마이링크 서비스의 기술적 구조(LocalStorage, 반응형 UI, 상태 동기화)를 평가하는 청중.

---

### 2.2 핵심 사용자 시나리오 (User Scenarios)

#### 📍 시나리오 1: 방문자의 프로필 탐색 및 링크 이동 [Step 1 핵심]
> **"인스타/깃허브 바이오를 통해 접속한 방문자가 관심 링크로 이동한다."**
1. **진입**: 방문자(김민준)가 모바일 환경에서 `@jiyoon`의 마이링크 프로필 주소로 접속한다.
2. **프로필 확인**: 깔끔한 캔버스 배경 중앙의 카드에 둥근 아바타 이미지, '이지윤 | Frontend Developer' 타이틀, 직관적인 자기소개 문구를 확인한다.
3. **SNS 채널 탐색**: 상단의 SNS 아이콘 바에서 [GitHub] 또는 [Instagram] 아이콘을 터치하여 해당 채널로 새 창 이동한다.
4. **링크 탐색 및 터치**: 'Projects', 'Articles' 등 섹션 헤더로 잘 정돈된 링크 버튼 목록을 살펴보고, 관심 있는 프로젝트 링크 카드를 탭하여 실제 웹사이트로 이동한다.
5. **URL 복사 및 공유**: 프로필 우측 상단의 '공유' 아이콘을 눌러 클립보드에 링크 주소를 복사하고, "링크가 복사되었습니다!" Toast 안내를 확인한 뒤 동료에게 전달한다.

#### 📍 시나리오 2: 시연자의 로컬 무설정 즉각 시연 [Step 1 핵심]
> **"복잡한 DB 연결 없이 브라우저에서 바로 동적 데이터 렌더링을 시연한다."**
1. **앱 구동**: 시연자가 `npm run dev` 환경에서 프로필 페이지를 연다.
2. **자동 Seed 로딩**: 로컬스토리지에 기존 데이터가 없더라도, 사전에 준비된 '이지윤' 님의 기본 데이터셋이 자동으로 로드되어 빈 화면 없이 즉시 렌더링된다.
3. **영속성 검증**: 브라우저 개발자 도구(LocalStorage)에서 닉네임이나 링크 제목을 수정하거나 새로고침을 해도 데이터가 초기화되지 않고 동적으로 갱신되는 것을 청중에게 시연한다.

#### 📍 시나리오 3: 관리자의 링크 편집 및 실시간 프리뷰 [Step 2 - 향후]
> **"관리자가 링크를 추가/수정하고 드래그 앤 드롭으로 순서를 바꾼다."**
1. 관리자(이지윤)가 `/dashboard` 페이지로 진입한다.
2. 좌측 폼에 새로 릴리즈한 프로젝트 제목과 URL을 입력하고 [링크 추가]를 누른다.
3. 우측 모바일 목업 프리뷰에 해당 링크 버튼이 즉각적으로 반영되어 렌더링되는 것을 확인한다.
4. 마우스 드래그를 통해 방금 추가한 링크를 목록 최상단으로 끌어올린다.
5. 당분간 숨겨두고 싶은 링크는 토글 스위치를 `Off`로 꺼서 프리뷰와 공개 페이지에서 비노출시킨다.

#### 📍 시나리오 4: 크리에이터의 방문자 유입 및 성과 분석 [Step 3 - 향후]
> **"대시보드 통계 탭에서 7일 및 30일 클릭 성과를 분석한다."**
1. 크리에이터가 대시보드의 [통계] 탭을 클릭한다.
2. 지난 30일간의 총 방문수와 링크 클릭수를 확인하고 전월 대비 성과를 확인한다.
3. 최근 7일 및 30일 추이 차트 필터를 전환하며 요일별/주차별 방문 트렌드를 파악한다.
4. 'Top 3 인기 링크' 지표를 통해 어떤 프로젝트가 청중의 가장 큰 반응을 얻었는지 확인하고 다음 콘텐츠 기획에 반영한다.

---

## 3. 단계별 개발 범위 (Phased Scope)

| 단계 | 구분 | 주요 개발 내용 | 상태 |
| :--- | :--- | :--- | :--- |
| **Step 1** | **프로필 페이지 (Core MVP)** | • **LocalStorage 기반 프로필 데이터 영속화 & Seed 로드**<br>• 프로필 영역 (아바타 사진, 이름, 소개글)<br>• SNS 아이콘 바 (상/하단 아이콘 링크)<br>• 링크 버튼 목록 (클릭 시 새 탭 이동)<br>• 섹션 구분 헤더<br>• 프로필 공유(URL 복사) 버튼 | **🟢 현재 개발 대상** |
| **Step 2** | **관리자 대시보드 (Admin)** | • 좌측 편집기 + 우측 실시간 모바일 목업 프리뷰<br>• 링크 CRUD 및 드래그 앤 드롭 순서 변경<br>• 링크 On/Off 스위치 토글<br>• 테마 커스터마이징 (프리셋 6종, 배경/버튼 스타일) | ⚪ 보류 (향후 확장) |
| **Step 3** | **방문자 분석 (Analytics)** | • 프로필 총 방문수(Page Views) 및 링크별 누적 클릭수<br>• 최근 7일 및 최근 30일 방문/클릭 추이 차트<br>• Top 3 인기 링크 통계 | ⚪ 보류 (향후 확장) |

---

## 4. [Step 1] 기능별 상세 요구사항 (Functional Requirements)

### 4.1 데이터 모델 및 LocalStorage / Mock API 연동
- **FR-01 (초기 Seed 데이터 및 Mock API 연동)**:
  - **기본 더미 데이터 소스**: 프로젝트 내 [`src/data/mockLinks.json`](file:///c:/Users/jiyoo/projects/my-link-hy/mylink/src/data/mockLinks.json) 파일을 정식 시드 및 더미 데이터셋으로 채택.
  - 사용자가 처음 접속했을 때 `localStorage`에 데이터가 없으면, `mockLinks.json`에 정의된 이지윤 님(Frontend Developer)의 프로필, 소셜 링크, 카테고리, 링크 블록 데이터를 기본값(Seed)으로 자동 주입.
  - 브라우저를 새로고침하거나 닫았다 열어도 LocalStorage 데이터를 지속 유지 (`mylink_profile_data`).
  - **백엔드 Mock API 엔드포인트 연동**: Next.js App Router API Route([`src/app/api/links/route.ts`](file:///c:/Users/jiyoo/projects/my-link-hy/mylink/src/app/api/links/route.ts))를 구비하여 `GET /api/links` (카테고리/검색/활성여부 쿼리 필터링 지원) 및 `POST /api/links`를 통한 백엔드 통신 시뮬레이션 지원.
- **FR-02 (Zustand 스토어 구성)**:
  - Zustand의 `persist` 미들웨어를 사용하여 `mylink_profile_data` 키로 상태 관리.
  - 프로필 정보, SNS 링크, 블록(링크/헤더) 목록을 스토어에서 중앙 집중식으로 읽어와 컴포넌트에 공급.

### 4.2 프로필 페이지 레이아웃 & UI (Miro Canvas × shadcn/ui)
- **FR-03 (반응형 캔버스 & 카드 컨테이너)**:
  - 모바일 퍼스트 기준 최적화(최대 너비 440px~480px의 중앙 집중형 카드 레이아웃).
  - 전체 화면: Stark White 바탕에 Miro 캔버스 도트 그리드(`miro-canvas-grid`) 배경 적용.
  - 프로필 컨테이너: shadcn/ui `Card`를 확장하여 `rounded-3xl` (28px), 1px 헤어라인 보더(`hairline-soft`), 미세한 소프트 섀도우(Level 2: `rgba(5, 0, 56, 0.06) 0px 4px 12px 0px`)를 적용한 화이트 서피스.
- **FR-04 (프로필 헤더 영역)**:
  - **아바타 이미지**: shadcn/ui `Avatar` 컴포넌트 활용, 원형 서클(`rounded-full`)에 2px 헤어라인 테두리 및 미세 섀도우 적용.
  - **이름(Display Name)**: Roobert/Geist 500-weight의 볼드 타이틀 (Ink 컬러 `#050038`, 음수 자간 `-0.5px` 적용).
  - **한 줄 소개(Bio)**: Slate/Charcoal 텍스트로 자연스러운 자기소개 표시.
- **FR-05 (SNS 아이콘 바)**:
  - 깃허브, 인스타그램, 링크드인, 이메일 등 등록된 활성 SNS 아이콘을 Miro 원형 유틸리티 버튼 규격(`button-icon-circular`: shadcn/ui `Button` `variant: ghost, size: icon`, 36×36px, `rounded-full`, 1px 헤어라인 테두리)으로 가로 일렬 배치.
  - 클릭 시 해당 소셜 프로필 새 탭 열기.
- **FR-06 (링크 버튼 목록 & 섹션 헤더)**:
  - **웹 링크 버튼**:
    - shadcn/ui `Button`을 확장한 Miro 스타일 링크 카드 버튼:
      - **기본 링크 버튼**: Black-Pill 또는 클린 화이트 서피스 카드형 버튼(헤어라인 보더, 미세 호버 엘리베이션, 텍스트 타이틀 + 아이콘 배치).
      - **강조/피처 링크 버튼**: Miro 스티키 노트 팔레트(Yellow `#FFF1B8`, Coral `#FFD7CC`, Teal `#CCF3EE`, Rose `#FFE0EB`) 배경 틴트를 적용한 파스텔 카드형 버튼.
    - 호버 및 액티브 인터랙션(Miro 특유의 부드러운 스케일/음영 효과).
    - `isActive: true` 상태인 링크만 필터링하여 화면에 노출.
  - **섹션 구분 헤더**:
    - Miro 타이포그래피 규칙(`micro-uppercase`: 11px, 600 weight, 0.5px letter-spacing, uppercase)을 적용한 텍스트 라벨 및 shadcn/ui `Separator` (`hairline-soft`) 렌더링.
- **FR-07 (공유 & 편의 기능)**:
  - 프로필 상단 우측에 Miro 원형 유틸리티 버튼(`button-icon-circular`) 형태의 'URL 복사' 버튼(shadcn/ui `Tooltip` 연동) 제공.
  - 클릭 시 현재 URL 클립보드 복사 및 shadcn/ui `Sonner` 기반의 깔끔한 Miro 모달 뎁스(Level 4) 알림 Toast 표시.

---

## 5. [Step 1] 데이터 구조 정의 (Data Model & Mock API)

- **LocalStorage 키**: `mylink_profile_data`
- **더미 데이터 파일**: [`src/data/mockLinks.json`](file:///c:/Users/jiyoo/projects/my-link-hy/mylink/src/data/mockLinks.json)
- **TypeScript 타입 정의**: [`src/types/link.ts`](file:///c:/Users/jiyoo/projects/my-link-hy/mylink/src/types/link.ts)
- **Mock API 엔드포인트**: `GET/POST /api/links` ([`src/app/api/links/route.ts`](file:///c:/Users/jiyoo/projects/my-link-hy/mylink/src/app/api/links/route.ts))

### 5.1 TypeScript 모델 정의 (`src/types/link.ts`)

```typescript
export type PlatformType = 'github' | 'instagram' | 'linkedin' | 'twitter' | 'youtube' | 'email' | 'web' | 'velog';

export interface SocialLinkItem {
  id: string;
  platform: PlatformType;
  name: string;
  url: string;
  isActive: boolean;
}

export type BlockType = 'link' | 'header';
export type CardVariant = 'default' | 'featured' | 'pastel-peach' | 'pastel-teal' | 'pastel-coral' | 'pastel-lavender' | 'pastel-yellow';

export interface LinkBlock {
  id: string;
  type: 'link';
  title: string;
  subtitle?: string;
  url: string;
  icon?: string;
  category?: 'projects' | 'articles' | 'connect' | string;
  variant?: CardVariant;
  badge?: string;
  isActive: boolean;
  isPinned?: boolean;
  clickCount: number;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface HeaderBlock {
  id: string;
  type: 'header';
  title: string;
  isActive: boolean;
  order: number;
}

export type ContentBlock = LinkBlock | HeaderBlock;

export interface UserProfile {
  username: string;
  displayName: string;
  headline: string;
  bio: string;
  avatarUrl: string;
  statusBadge?: string;
  email: string;
  location?: string;
}

export interface MyLinkProfileState {
  user: UserProfile;
  socialLinks: {
    position: 'top' | 'bottom';
    items: SocialLinkItem[];
  };
  categories?: { id: string; label: string; icon: string }[];
  blocks: ContentBlock[];
}

export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
  meta?: {
    totalItems?: number;
    totalPages?: number;
    currentPage?: number;
    pageSize?: number;
  };
  timestamp: string;
}
```

### 5.2 Mock API Envelope 규격 (`GET /api/links`)

```json
{
  "statusCode": 200,
  "message": "링크 목록을 성공적으로 조회했습니다.",
  "data": {
    "user": { ... },
    "socialLinks": { ... },
    "categories": [ ... ],
    "blocks": [ ... ]
  },
  "meta": {
    "totalItems": 11,
    "totalPages": 1,
    "currentPage": 1,
    "pageSize": 11
  },
  "timestamp": "2026-10-05T08:52:43.000Z"
}
```

---

## 6. [Step 1] 비기능적 요구사항 (Non-Functional Requirements)

1. **시연 즉각성 (Demo Readiness)**:
   - 외부 서버나 DB 연결 없이 로컬 환경(`npm run dev`)에서 즉시 100% 동작.
   - LocalStorage 값만 브라우저 개발자 도구(DevTools)에서 수정하거나 초기화해도 화면에 즉시 반응.
2. **성능 & 번들 최적화**:
   - 불필요한 라이브러리 없이 경량 Zustand 훅만으로 상태 바인딩.
   - 첫 페인트(FCP) 지연 없는 빠른 초기 로딩.
3. **Miro 디자인 시스템 일관성 & 웹 접근성 (Design System & Accessibility)**:
   - 모든 신규 UI 및 인터랙션 요소는 **shadcn/ui 아키텍처 위에 `design.md`의 Miro Design System 규격**을 100% 반영하여 구현.
   - Miro 고유의 색상 팔레트(Deep Ink `#050038`, Canary Yellow `#FFD02F`, Sticky-Note Pastels) 및 타이트한 디스플레이 타이포그래피, Pill 쉐입(`rounded-full`), 정교한 엘리베이션(Level 0~4) 엄격 준수.
   - WAI-ARIA 웹 접근성 가이드라인을 준수하며, 키보드 네비게이션 및 포커스 링(`focus-visible:ring-ring`)을 기본 지원.
   - Tailwind CSS v4 CSS-first 환경에 맞추어 `src/app/globals.css`의 CSS 변수 토큰을 통해 디자인 시스템을 유기적으로 확장.

---

## 7. [Future Scope] 향후 확장 로드맵 (Step 2 & 3)

> *본 항목은 현재 Step 1 시연 단계에서는 구현하지 않으며, 다음 시연 단계에서 순차적으로 개발합니다.*

### 7.1 Step 2: 관리자 대시보드 (`/dashboard`)
- 좌측 실시간 입력 폼 & 우측 모바일 목업 실시간 미러링.
- 링크 추가/수정/삭제 폼 및 On/Off 토글.
- 드래그 앤 드롭을 통한 링크 순서 변경.
- 테마 프리셋 6종(미니멀, 다크, 파스텔, 미로 등) 및 버튼/배경 커스텀.

### 7.2 Step 3: 통계 및 분석 (Analytics)
- 프로필 총 방문수 및 링크별 누적 클릭수 트래킹.
- 최근 7일 및 최근 30일 추이 차트(라인/바) 및 Top 3 인기 링크 랭킹.
- 기간별(7일/30일) 성과 비교 지표.
