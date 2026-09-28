import { defineStore } from 'pinia';


export const DEFAULT_MIN_PRICE = 0
export const DEFAULT_MAX_PRICE = 1000

interface FilterState {
  categories: string[];
  brands: string[];
  minPrice: number;
  maxPrice: number;
  rating: number | null;
}

export const useFilterStore = defineStore('filter', {
  state: (): FilterState => {
    return {
      categories: [],
      brands: [],
      minPrice: DEFAULT_MIN_PRICE,
      maxPrice: DEFAULT_MAX_PRICE,
      rating: null,
    };
  },

  getters: {
  activeFilterCount: (state): number => {
    let count = 0;

    count += state.categories.length;
    count += state.brands.length;

    if (
      state.minPrice > DEFAULT_MIN_PRICE ||
      state.maxPrice < DEFAULT_MAX_PRICE
    ) {
      count += 1;
    }

    if (state.rating !== null) {
      count += 1;
    }

    return count;
  },

  hasActiveFilters(): boolean {
    return this.activeFilterCount > 0;
  },
},

  actions: {
    setFilters(filters: Partial<FilterState>) {
      if (filters.categories !== undefined) {
        this.categories = filters.categories;
      }
      if (filters.brands !== undefined) {
        this.brands = filters.brands;
      }
      if (filters.minPrice !== undefined) {
        this.minPrice = filters.minPrice;
      }
      if (filters.maxPrice !== undefined) {
        this.maxPrice = filters.maxPrice;
      }
      if (filters.rating !== undefined) {
        this.rating = filters.rating;
      }
    },
    setRating(rating: number | null) {
      this.rating = rating;
    },
    setCategories(categories: string[]) {
      this.categories = categories;
    },
    setBrands(brands: string[]) {
      this.brands = brands;
    },
    setPriceRange(min: number, max: number) {
      this.minPrice = min;
      this.maxPrice = max;
    },
    clearAllFilters() {
      this.categories = [];
      this.brands = [];
      this.minPrice = DEFAULT_MIN_PRICE;
      this.maxPrice = DEFAULT_MAX_PRICE;
      this.rating = null;
    },
  },
});