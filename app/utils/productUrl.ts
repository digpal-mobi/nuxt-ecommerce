export interface UrlFilters {
    categories: string[];
    brands: string[];
    minPrice: number;
    maxPrice: number;
    rating: number | null;
}

export interface UrlPagination {
  page: number;
}

const DEFAULT_PAGE = 1;

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 1000;

export const getFiltersFromQuery = (query: Record<string, any>):UrlFilters => {
    return {
        categories:
      typeof query.category === 'string'
        ? query.category.split(',').filter(Boolean)
        : [],
      brands:
      typeof query.brand === 'string'
        ? query.brand.split(',').filter(Boolean)
        : [],
    minPrice:
      typeof query.minPrice === 'string'
        ? parseFloat(query.minPrice)
        : DEFAULT_MIN_PRICE,
    maxPrice:
      typeof query.maxPrice === 'string'
        ? parseFloat(query.maxPrice)
        : DEFAULT_MAX_PRICE,
    rating:
      typeof query.rating === 'string'
        ? parseFloat(query.rating)
        : null,
    }
}

export const getPaginationFromQuery = (
  query: Record<string, any>
): UrlPagination => {
  return {
    page:
      typeof query.page === 'string'
        ? Math.max(1, parseInt(query.page, 10))
        : DEFAULT_PAGE,
  };
};