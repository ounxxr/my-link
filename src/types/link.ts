export type PlatformType =
  | 'github'
  | 'instagram'
  | 'linkedin'
  | 'twitter'
  | 'youtube'
  | 'email'
  | 'web'
  | 'velog';

export interface SocialLinkItem {
  id: string;
  platform: PlatformType;
  name: string;
  url: string;
  isActive: boolean;
}

export type BlockType = 'link' | 'header';

export type CardVariant =
  | 'default'
  | 'featured'
  | 'pastel-peach'
  | 'pastel-teal'
  | 'pastel-coral'
  | 'pastel-lavender'
  | 'pastel-yellow';

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

export interface CategoryItem {
  id: string;
  label: string;
  icon: string;
}

export interface MyLinkProfileData {
  user: UserProfile;
  socialLinks: {
    position: 'top' | 'bottom';
    items: SocialLinkItem[];
  };
  categories?: CategoryItem[];
  blocks: ContentBlock[];
  statistics?: {
    totalViews: number;
    totalClicks: number;
    averageCtr: string;
    topPerformingLink: string;
  };
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
