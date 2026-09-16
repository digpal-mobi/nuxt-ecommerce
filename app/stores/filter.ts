import { defineStore } from 'pinia';

export const DEFAULT_MIN_PRICE = 0;
export const DEFAULT_MAX_PRICE = 1000;

export interface FilterState {
  categories: string[];
  brands: string[];
  minPrice: number;
  maxPrice: number;
  rating: number | null;
}

const parseArrayParam = (param: unknown): string[] => {
  if (!param) return [];
  if (Array.isArray(param)) {
    return param.map((item) => String(item).trim()).filter(Boolean);
  }
  if (typeof param === 'string') {
    return param
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
};

const parseNumberParam = (param: unknown, fallback: number): number => {
  if (param === undefined || param === null || param === '') return fallback;
  const parsed = Number(param);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const useFilterStore = defineStore('filter', {
  state: (): FilterState => ({
    categories: [],
    brands: [],
    minPrice: DEFAULT_MIN_PRICE,
    maxPrice: DEFAULT_MAX_PRICE,
    rating: null,
  }),

  getters: {
    hasActiveFilters: (state): boolean => {
      return (
        state.categories.length > 0 ||
        state.brands.length > 0 ||
        state.minPrice > DEFAULT_MIN_PRICE ||
        state.maxPrice < DEFAULT_MAX_PRICE ||
        state.rating !== null
      );
    },

    activeFilterCount: (state): number => {
      let count = state.categories.length + state.brands.length;
      if (state.minPrice > DEFAULT_MIN_PRICE || state.maxPrice < DEFAULT_MAX_PRICE) {
        count += 1;
      }
      if (state.rating !== null) {
        count += 1;
      }
      return count;
    },

    toQueryParams: (state): Record<string, string> => {
      const query: Record<string, string> = {};

      if (state.categories.length > 0) {
        query.category = state.categories.join(',');
      }

      if (state.brands.length > 0) {
        query.brand = state.brands.join(',');
      }

      if (state.minPrice > DEFAULT_MIN_PRICE) {
        query.minPrice = String(state.minPrice);
      }

      if (state.maxPrice < DEFAULT_MAX_PRICE) {
        query.maxPrice = String(state.maxPrice);
      }

      if (state.rating !== null) {
        query.rating = String(state.rating);
      }

      return query;
    },
  },

  actions: {
    toggleCategory(category: string) {
      const slug = category.toLowerCase();
      const index = this.categories.findIndex((c) => c.toLowerCase() === slug);
      if (index >= 0) {
        this.categories.splice(index, 1);
      } else {
        this.categories.push(slug);
      }
    },

    setCategories(categories: string[]) {
      this.categories = categories.map((c) => c.toLowerCase());
    },

    toggleBrand(brand: string) {
      const index = this.brands.findIndex((b) => b.toLowerCase() === brand.toLowerCase());
      if (index >= 0) {
        this.brands.splice(index, 1);
      } else {
        this.brands.push(brand);
      }
    },

    setBrands(brands: string[]) {
      this.brands = [...brands];
    },

    setPriceRange(min: number, max: number) {
      const clampedMin = Math.max(DEFAULT_MIN_PRICE, Math.min(min, DEFAULT_MAX_PRICE));
      const clampedMax = Math.max(DEFAULT_MIN_PRICE, Math.min(max, DEFAULT_MAX_PRICE));
      this.minPrice = Math.min(clampedMin, clampedMax);
      this.maxPrice = Math.max(clampedMin, clampedMax);
    },

    setMinPrice(min: number) {
      this.setPriceRange(min, this.maxPrice);
    },

    setMaxPrice(max: number) {
      this.setPriceRange(this.minPrice, max);
    },

    setRating(rating: number | null) {
      if (this.rating === rating) {
        this.rating = null;
      } else {
        this.rating = rating;
      }
    },

    clearFilters() {
      this.categories = [];
      this.brands = [];
      this.minPrice = DEFAULT_MIN_PRICE;
      this.maxPrice = DEFAULT_MAX_PRICE;
      this.rating = null;
    },

    initFromQuery(query: Record<string, unknown>) {
      const categories = parseArrayParam(query.category);
      const brands = parseArrayParam(query.brand);
      const minPrice = parseNumberParam(query.minPrice, DEFAULT_MIN_PRICE);
      const maxPrice = parseNumberParam(query.maxPrice, DEFAULT_MAX_PRICE);
      const rawRating = query.rating ? Number(query.rating) : null;
      const rating = rawRating && Number.isFinite(rawRating) ? rawRating : null;

      this.categories = categories.map((c) => c.toLowerCase());
      this.brands = brands;
      this.setPriceRange(minPrice, maxPrice);
      this.rating = rating;
    },
  },
});
