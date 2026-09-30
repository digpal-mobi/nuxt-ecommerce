import type { UseFetchOptions } from 'nuxt/app';
import type { MaybeRefOrGetter } from 'vue';
import type { Category } from '~/pinia/category';

export const API_ENDPOINTS = {
  PRODUCTS: {
    LIST: 'products',
    DETAIL: (id: string | number) => `products/${id}`,
    CATEGORIES: 'products/categories',
    CATEGORY_LIST: (category: string) => `products/category/${category}`,
    SEARCH: 'products/search',
  },
} as const;

export interface ProductsResponse {
  products: any[];
  total: number;
  skip: number;
  limit: number;
}

export interface ProductQueryParams {
  limit?: number;
  skip?: number;
  select?: string;
  sortBy?: string;
  order?: 'asc' | 'desc';
  q?: string;
  [key: string]: any;
}

export const useApiFetch: typeof useFetch = (url: any, options: any = {}) => {
  const config = useRuntimeConfig();

  return useFetch(url, {
    baseURL: config.public.baseUrl,
    ...options,
  });
};


export const $apiFetch = <T>(
  url: string,
  options: Parameters<typeof $fetch>[1] = {}
) => {
  const config = useRuntimeConfig();

  return $fetch<T>(url, {
    baseURL: config.public.baseUrl,
    ...options,
  });
};

export const apiProducts = {
  getProducts: (params?: MaybeRefOrGetter<ProductQueryParams>, options?: UseFetchOptions<ProductsResponse>) => {
    return useApiFetch<ProductsResponse>(API_ENDPOINTS.PRODUCTS.LIST, {
      query: params,
      ...options,
    });
  },

  getProductById: (id: MaybeRefOrGetter<string | number>, options?: UseFetchOptions<any>) => {
    return useApiFetch<any>(() => API_ENDPOINTS.PRODUCTS.DETAIL(toValue(id)), options);
  },

  getCategories: (options?: UseFetchOptions<Category[]>) => {
    return useApiFetch<Category[]>(API_ENDPOINTS.PRODUCTS.CATEGORIES, {
      key: 'product-categories',
      ...options,
    });
  },

  searchProducts: (q: MaybeRefOrGetter<string>, options?: UseFetchOptions<ProductsResponse>) => {
    return useApiFetch<ProductsResponse>(API_ENDPOINTS.PRODUCTS.SEARCH, {
      query: { q },
      ...options,
    });
  },
};
