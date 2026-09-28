import { useFilterStore, DEFAULT_MIN_PRICE, DEFAULT_MAX_PRICE } from "~/pinia/filter";
import { getFiltersFromQuery } from "~/utils/productUrl";

let debounceTimer: ReturnType<typeof setTimeout> | null = null;

const useFilters = () => {
  const filterStore = useFilterStore();
  const route = useRoute();
  const router = useRouter();

  const areFiltersEqual = (
    current: {
      categories: string[];
      brands: string[];
      minPrice: number;
      maxPrice: number;
      rating: number | null;
    },
    incoming: {
      categories: string[];
      brands: string[];
      minPrice: number;
      maxPrice: number;
      rating: number | null;
    }
  ) => {
    if (current.minPrice !== incoming.minPrice) return false;
    if (current.maxPrice !== incoming.maxPrice) return false;
    if (current.rating !== incoming.rating) return false;

    if (current.categories.length !== incoming.categories.length) return false;
    const sameCategories = current.categories.every(
      (c, i) => c === incoming.categories[i]
    );
    if (!sameCategories) return false;

    if (current.brands.length !== incoming.brands.length) return false;
    const sameBrands = current.brands.every((b, i) => b === incoming.brands[i]);
    if (!sameBrands) return false;

    return true;
  };

  const syncFiltersFromUrl = () => {
    const queryFilters = getFiltersFromQuery(route.query);
    const currentFilters = {
      categories: filterStore.categories,
      brands: filterStore.brands,
      minPrice: filterStore.minPrice,
      maxPrice: filterStore.maxPrice,
      rating: filterStore.rating,
    };

    if (!areFiltersEqual(currentFilters, queryFilters)) {
      filterStore.setFilters(queryFilters);
    }
  };

  const updateFiltersInUrl = () => {
    const query = {
      ...route.query,
    };

    const updates: Record<string, any> = {
      category: filterStore.categories,
      brand: filterStore.brands,
      minPrice:
        filterStore.minPrice !== DEFAULT_MIN_PRICE ? filterStore.minPrice : null,
      maxPrice:
        filterStore.maxPrice !== DEFAULT_MAX_PRICE ? filterStore.maxPrice : null,
      rating: filterStore.rating,
    };

    Object.entries(updates).forEach(([key, value]) => {
      if (
        value === null ||
        value === undefined ||
        value === "" ||
        (Array.isArray(value) && value.length === 0)
      ) {
        delete query[key];
        return;
      }

      query[key] = Array.isArray(value) ? value.join(",") : String(value);
    });

    router.replace({
      query,
    });
  };

  const applyFilters = (
    updates: Partial<{
      categories: string[];
      brands: string[];
      minPrice: number;
      maxPrice: number;
      rating: number | null;
    }>
  ) => {
    // 1. Update store immediately for instant UI feedback (checkboxes, badges, sliders)
    filterStore.setFilters(updates);

    // 2. Debounce the URL update so rapid changes (e.g. slider dragging, fast clicks) don't spam the router
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    debounceTimer = setTimeout(() => {
      updateFiltersInUrl();
    }, 300);
  };

  // Toggle category
  const toggleCategory = (category: string) => {
    const currentCategories = filterStore.categories;
    const isSelected = currentCategories.includes(category);

    const nextCategories = isSelected
      ? currentCategories.filter((item) => item !== category)
      : [...currentCategories, category];

    applyFilters({
      categories: nextCategories,
    });
  };

  // Toggle brand
  const toggleBrand = (brand: string) => {
    const currentBrands = filterStore.brands;
    const isSelected = currentBrands.includes(brand);

    const nextBrands = isSelected
      ? currentBrands.filter((item) => item !== brand)
      : [...currentBrands, brand];

    applyFilters({
      brands: nextBrands,
    });
  };

  // Set rating
  const setRating = (rating: number | null) => {
    applyFilters({
      rating,
    });
  };

  // Set price range
  const setPriceRange = (min: number, max: number) => {
    applyFilters({
      minPrice: min,
      maxPrice: max,
    });
  };

  const resetFilters = () => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    filterStore.clearAllFilters();

    const query = {
      ...route.query,
    };

    delete query.category;
    delete query.brand;
    delete query.minPrice;
    delete query.maxPrice;
    delete query.rating;

    router.replace({
      query,
    });
  };

  watch(
    () => route.query,
    () => {
      syncFiltersFromUrl();
    },
    {
      immediate: true,
    }
  );

  return {
    filters: filterStore,
    applyFilters,
    toggleCategory,
    toggleBrand,
    setRating,
    setPriceRange,
    resetFilters,
  };
};

export default useFilters;
