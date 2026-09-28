import { defineStore } from "pinia";

export interface Category {
  name: string;
  slug: string;
  url?: string;
}

export const useCategoryStore = defineStore('category', {
  state: () => ({
    categories: [] as Category[],
  }),
  actions: {
    setCategories(categories: Category[]) {
      this.categories = categories;
    },
  },
});
    