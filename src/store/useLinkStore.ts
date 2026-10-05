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
} from "@/types/link";

interface LinkStoreState extends MyLinkProfileData {
  selectedCategory: string;
  hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  setSelectedCategory: (category: string) => void;
  incrementClick: (linkId: string) => void;
  resetToMockData: () => void;
  updateUserProfile: (user: Partial<UserProfile>) => void;
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
