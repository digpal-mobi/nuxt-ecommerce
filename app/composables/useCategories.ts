import { computed } from 'vue';
import { useCategoryStore, type Category } from '~/pinia/category';

export const useCategories = async () => {
  const categoryStore = useCategoryStore();

  if (categoryStore.categories.length === 0) {
    const { data } = await useFetch<Category[]>(
      'https://dummyjson.com/products/categories',
      { key: 'product-categories' }
    );

    if (data.value) {
      categoryStore.setCategories(data.value);
    }
  }

  return {
    categories: computed(() => categoryStore.categories),
    categoryStore,
  };
};