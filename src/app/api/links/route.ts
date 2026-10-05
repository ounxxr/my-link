import { NextRequest, NextResponse } from "next/server";
import mockData from "@/data/mockLinks.json";
import { LinkBlock, ContentBlock, ApiResponse } from "@/types/link";

/**
 * GET /api/links
 * 링크 목록 조회 및 필터링 Mock API
 *
 * Query Params:
 * - category: 'projects' | 'articles' | 'connect' (선택 필터링)
 * - activeOnly: boolean (기본값 true, 활성 상태만 조회)
 * - search: 검색어 (title, subtitle 대상)
 * - includeHeaders: boolean (기본값 true, 헤더 블록 포함 여부)
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const activeOnly = searchParams.get("activeOnly") !== "false";
  const search = searchParams.get("search")?.toLowerCase();
  const includeHeaders = searchParams.get("includeHeaders") !== "false";

  let filteredBlocks: ContentBlock[] = mockData.blocks as ContentBlock[];

  // 1. 활성화 필터링
  if (activeOnly) {
    filteredBlocks = filteredBlocks.filter((block) => block.isActive);
  }

  // 2. 헤더 제외 여부
  if (!includeHeaders) {
    filteredBlocks = filteredBlocks.filter((block) => block.type === "link");
  }

  // 3. 카테고리 필터링
  if (category && category !== "all") {
    filteredBlocks = filteredBlocks.filter((block) => {
      if (block.type === "header") return false;
      return (block as LinkBlock).category === category;
    });
  }

  // 4. 검색어 필터링
  if (search) {
    filteredBlocks = filteredBlocks.filter((block) => {
      if (block.type === "header") {
        return block.title.toLowerCase().includes(search);
      }
      const link = block as LinkBlock;
      return (
        link.title.toLowerCase().includes(search) ||
        (link.subtitle && link.subtitle.toLowerCase().includes(search))
      );
    });
  }

  const response: ApiResponse<{
    user: typeof mockData.user;
    socialLinks: typeof mockData.socialLinks;
    categories: typeof mockData.categories;
    blocks: ContentBlock[];
  }> = {
    statusCode: 200,
    message: "링크 목록을 성공적으로 조회했습니다.",
    data: {
      user: mockData.user,
      socialLinks: mockData.socialLinks,
      categories: mockData.categories,
      blocks: filteredBlocks,
    },
    meta: {
      totalItems: filteredBlocks.length,
      totalPages: 1,
      currentPage: 1,
      pageSize: filteredBlocks.length,
    },
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(response, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
    },
  });
}

/**
 * POST /api/links
 * 신규 링크 추가 시뮬레이션 Mock API
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const newLink: LinkBlock = {
      id: `link-${Date.now()}`,
      type: "link",
      title: body.title || "새 링크",
      subtitle: body.subtitle || "",
      url: body.url || "https://",
      icon: body.icon || "Sparkles",
      category: body.category || "projects",
      variant: body.variant || "default",
      badge: body.badge || "",
      isActive: body.isActive ?? true,
      isPinned: body.isPinned ?? false,
      clickCount: 0,
      order: (mockData.blocks.length || 0) + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const response: ApiResponse<LinkBlock> = {
      statusCode: 201,
      message: "신규 링크가 생성되었습니다. (Mock)",
      data: newLink,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response, { status: 201 });
  } catch {
    return NextResponse.json(
      {
        statusCode: 400,
        message: "유효하지 않은 요청 데이터입니다.",
        timestamp: new Date().toISOString(),
      },
      { status: 400 }
    );
  }
}
