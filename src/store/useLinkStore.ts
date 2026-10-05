import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import mockData from "@/data/mockLinks.json";
import {
  MyLinkProfileData,
  UserProfile,
  SocialLinkItem,
  ContentBlock,
  LinkBlock,
  CategoryItem,
  CardVariant,
} from "@/types/link";

interface LinkStoreState extends MyLinkProfileData {
  selectedCategory: string;
  hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  setSelectedCategory: (category: string) => void;
  incrementClick: (linkId: string) => void;
  resetToMockData: () => void;
  updateUserProfile: (user: Partial<UserProfile>) => void;
  addLinkBlock: (linkData: {
    title: string;
    url: string;
    subtitle?: string;
    category?: string;
    variant?: CardVariant;
    badge?: string;
    icon?: string;
    isPinned?: boolean;
  }) => void;
  deleteLinkBlock: (linkId: string) => void;
}

const initialData: MyLinkProfileData = {
  user: mockData.user as UserProfile,
  socialLinks: mockData.socialLinks as {
    position: "top" | "bottom";
    items: SocialLinkItem[];
  },
  categories: mockData.categories as CategoryItem[],
  blocks: mockData.blocks as ContentBlock[],
  statistics: mockData.statistics,
};

export const useLinkStore = create<LinkStoreState>()(
  persist(
    (set) => ({
      ...initialData,
      selectedCategory: "all",
      hasHydrated: false,

      setHasHydrated: (state: boolean) => {
        set({ hasHydrated: state });
      },

      setSelectedCategory: (category: string) => {
        set({ selectedCategory: category });
      },

      incrementClick: (linkId: string) => {
        set((state) => ({
          blocks: state.blocks.map((block) => {
            if (block.type === "link" && block.id === linkId) {
              return {
                ...block,
                clickCount: (block as LinkBlock).clickCount + 1,
                updatedAt: new Date().toISOString(),
              };
            }
            return block;
          }),
        }));
      },

      resetToMockData: () => {
        set({
          user: mockData.user as UserProfile,
          socialLinks: mockData.socialLinks as {
            position: "top" | "bottom";
            items: SocialLinkItem[];
          },
          categories: mockData.categories as CategoryItem[],
          blocks: mockData.blocks as ContentBlock[],
          statistics: mockData.statistics,
          selectedCategory: "all",
        });
      },

      updateUserProfile: (updatedUser: Partial<UserProfile>) => {
        set((state) => ({
          user: {
            ...state.user,
            ...updatedUser,
          },
        }));
      },

      addLinkBlock: (linkData) => {
        set((state) => {
          const id = `link-${Date.now()}`;
          const now = new Date().toISOString();
          let formattedUrl = linkData.url.trim();
          if (
            !formattedUrl.startsWith("http://") &&
            !formattedUrl.startsWith("https://") &&
            !formattedUrl.startsWith("mailto:")
          ) {
            formattedUrl = `https://${formattedUrl}`;
          }

          const newLink: LinkBlock = {
            id,
            type: "link",
            title: linkData.title.trim(),
            subtitle: linkData.subtitle?.trim() || undefined,
            url: formattedUrl,
            icon: linkData.icon || "Globe",
            category: linkData.category || "projects",
            variant: linkData.variant || "default",
            badge: linkData.badge?.trim() || undefined,
            isActive: true,
            isPinned: Boolean(linkData.isPinned),
            clickCount: 0,
            order: 1,
            createdAt: now,
            updatedAt: now,
          };

          // 새로 추가된 링크를 최상단에 배치하고 기존 블록의 order를 1씩 증가
          const updatedBlocks: ContentBlock[] = [
            newLink,
            ...state.blocks.map((block) => ({
              ...block,
              order: block.order + 1,
            })),
          ];

          return {
            blocks: updatedBlocks,
          };
        });
      },

      deleteLinkBlock: (linkId: string) => {
        set((state) => ({
          blocks: state.blocks.filter((b) => b.id !== linkId),
        }));
      },
    }),
    {
      name: "mylink_profile_data",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
      partialize: (state) => ({
        user: state.user,
        socialLinks: state.socialLinks,
        categories: state.categories,
        blocks: state.blocks,
        statistics: state.statistics,
      }),
    }
  )
);
