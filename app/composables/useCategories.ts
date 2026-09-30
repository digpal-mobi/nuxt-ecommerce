import { computed } from 'vue';
import { useCategoryStore, type Category } from '~/pinia/category';

export const useCategories = async () => {
  const categoryStore = useCategoryStore();

  if (categoryStore.categories.length === 0) {
    const { data } = await apiProducts.getCategories();

    if (data.value) {
      categoryStore.setCategories(data.value);
    }
  }

  return {
    categories: computed(() => categoryStore.categories),
    categoryStore,
  };
};