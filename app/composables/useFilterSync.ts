import { watch, onMounted, type Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useFilterStore } from '~/stores/filter';

const FILTER_KEYS = ['category', 'brand', 'minPrice', 'maxPrice', 'rating'];

export const useFilterSync = () => {
  const filterStore = useFilterStore();
  const route = useRoute();
  const router = useRouter();

  let isSyncingFromRoute = false;
  let debounceTimeout: ReturnType<typeof setTimeout> | null = null;

  // Initialize store from current route query immediately (SSR-friendly and client-friendly)
  filterStore.initFromQuery(route.query);

  const areFilterQueriesEqual = (
    currentRouteQuery: Record<string, unknown>,
    storeQueryParams: Record<string, string>
  ): boolean => {
    for (const key of FILTER_KEYS) {
      const routeVal = currentRouteQuery[key];
      const storeVal = storeQueryParams[key];

      const normalizedRoute =
        routeVal === undefined || routeVal === null || routeVal === ''
          ? undefined
          : Array.isArray(routeVal)
          ? routeVal.join(',')
          : String(routeVal);

      const normalizedStore =
        storeVal === undefined || storeVal === null || storeVal === ''
          ? undefined
          : String(storeVal);

      if (normalizedRoute !== normalizedStore) {
        return false;
      }
    }
    return true;
  };

  // Watch for external route changes (e.g. Back/Forward navigation or direct link clicks)
  watch(
    () => route.query,
    (newQuery) => {
      const storeQuery = filterStore.toQueryParams;
      if (!areFilterQueriesEqual(newQuery, storeQuery)) {
        isSyncingFromRoute = true;
        filterStore.initFromQuery(newQuery);
        // Clear flag on next tick
        setTimeout(() => {
          isSyncingFromRoute = false;
        }, 0);
      }
    },
    { deep: true }
  );

  // Watch for store changes and update URL query params
  watch(
    () => [
      filterStore.categories,
      filterStore.brands,
      filterStore.minPrice,
      filterStore.maxPrice,
      filterStore.rating,
    ],
    () => {
      if (isSyncingFromRoute) return;

      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }

      debounceTimeout = setTimeout(() => {
        const storeQuery = filterStore.toQueryParams;

        if (areFilterQueriesEqual(route.query, storeQuery)) {
          return;
        }

        // Preserve non-filter query parameters (like search, page, etc.)
        const nextQuery: Record<string, string> = {};
        for (const [key, value] of Object.entries(route.query)) {
          if (!FILTER_KEYS.includes(key) && value !== undefined && value !== null && value !== '') {
            nextQuery[key] = Array.isArray(value) ? value.join(',') : String(value);
          }
        }

        // Add active filter parameters
        Object.assign(nextQuery, storeQuery);

        router.replace({
          query: nextQuery,
        });
      }, 150);
    },
    { deep: true }
  );

  return {
    filterStore,
  };
};
