<script setup lang="ts">
import { computed, watchEffect } from 'vue';
import ProductCard from '~/components/ui/ProductCard.vue';
import TitleTag from '~/components/ui/TitleTag.vue';
import Paragraph from '~/components/ui/Paragraph.vue';
import type { Product } from '~/types/product';
import Pagination from '~/components/ui/Pagination.vue';
import Icons from '~/utils/Icons.vue';
import { usePaginationStore } from '~/pinia/pagination';
import { storeToRefs } from 'pinia';

const {
  filters: filterStore,
  toggleCategory,
  toggleBrand,
  setPriceRange,
  setRating,
  resetFilters,
} = useFilters();

const route = useRoute();
const router = useRouter(); 

const paginationStore = usePaginationStore();
const { currentPage, total } = storeToRefs(paginationStore);

const pageChange = async (page: number) => {
  paginationStore.setCurrentPage(page);

  await router.replace({
    query: {
      ...route.query,
      page: String(page),
    },
  });
};

const limit = 9;

const filterPayload = computed(() => ({
  categories: filterStore.categories.join(','),
  brands: filterStore.brands.join(','),
  rating: filterStore.rating,
  minPrice: filterStore.minPrice,
  maxPrice: filterStore.maxPrice,
}));

const { data, status } = await apiProducts.getProducts(() => ({
  categories: filterStore.categories.join(','),
  brands: filterStore.brands.join(','),
  rating: filterStore.rating,
  minPrice: filterStore.minPrice,
  maxPrice: filterStore.maxPrice,
  limit,
  skip: (currentPage.value - 1) * limit,
}));
// 2. Reset page to 1 when filters change
watch(
  [
    () => filterStore.categories,
    () => filterStore.brands,
    () => filterStore.minPrice,
    () => filterStore.maxPrice,
    () => filterStore.rating,
  ],
  () => {
    paginationStore.setCurrentPage(1);
  },
  { deep: true }
);

// Fetch whenever page changes
watch(currentPage, async (page) => {
  const result = await $apiFetch<ProductsResponse>(API_ENDPOINTS.PRODUCTS.LIST, {
    query: {
      categories: filterStore.categories.join(','),
      brands: filterStore.brands.join(','),
      rating: filterStore.rating,
      minPrice: filterStore.minPrice,
      maxPrice: filterStore.maxPrice,
      limit,
      skip: (page - 1) * limit,
    },
  });
  data.value = result;
});


watchEffect(() => {
  if (data.value) {
    paginationStore.setLimit(data.value.limit);
    paginationStore.setTotal(Math.ceil(data.value.total / data.value.limit));
  }
});
  

const allProducts = computed<Product[]>(() => {
  if (!data.value?.products) return [];
  return data.value.products.map((p) => ({
    id: p.id,
    title: p.title,
    price: p.price,
    discountPercentage: p.discountPercentage,
    thumbnail: p.thumbnail,
    rating: p.rating,
    description: p.description,
    category: p.category,
    brand: p.brand,
    stock: p.stock,
  })); 
     
});

const startProduct = computed(() => {
  return (currentPage.value - 1) * limit + 1;
});

const endProduct = computed(() => {
  return Math.min(currentPage.value * limit, data.value?.total || 0);
});
</script>

<template>
  <div class="w-full">
    <div class="mb-6 flex flex-wrap items-center justify-between gap-4">
      <div>
        <TitleTag as="h1" variant="bold" class="!text-[24px] laptop:!text-[28px] text-[#111111]">
          Casual
        </TitleTag>
        <Paragraph variant="normalPara" class="!text-[14px] !text-[#777777]">
          Showing {{ startProduct }}-{{ endProduct }} of {{ data?.total || 0 }} Products
        </Paragraph>
      </div>

      <div v-if="filterStore.hasActiveFilters" class="flex flex-wrap items-center gap-2">
        <span
          v-for="cat in filterStore.categories"
          :key="cat"
          class="inline-flex items-center gap-1 rounded-full bg-black/5 px-3 py-1 text-xs font-medium text-black capitalize"
        >
          {{ cat }}
          <button
            type="button"
            @click="toggleCategory(cat)"
            class="hover:text-red-500 font-bold ml-1 cursor-pointer"
          >
            ×
          </button>
        </span>

        <span
          v-for="b in filterStore.brands"
          :key="b"
          class="inline-flex items-center gap-1 rounded-full bg-black/5 px-3 py-1 text-xs font-medium text-black"
        >
          {{ b }}
          <button
            type="button"
            @click="toggleBrand(b)"
            class="hover:text-red-500 font-bold ml-1 cursor-pointer"
          >
            ×
          </button>
        </span>

        <span
          v-if="filterStore.minPrice > 0 || filterStore.maxPrice < 1000"
          class="inline-flex items-center gap-1 rounded-full bg-black/5 px-3 py-1 text-xs font-medium text-black"
        >
          ${{ filterStore.minPrice }} - ${{ filterStore.maxPrice }}
          <button
            type="button"
            @click="setPriceRange(0, 1000)"
            class="hover:text-red-500 font-bold ml-1 cursor-pointer"
          >
            <Icons name="crossIcon" :size="12" color="#000000" />
          </button>
        </span>

        <span
          v-if="filterStore.rating !== null"
          class="inline-flex items-center gap-1 rounded-full bg-black/5 px-3 py-1 text-xs font-medium text-black"
        >
          {{ filterStore.rating }}★ & above
          <button
            type="button"
            @click="setRating(null)"
            class="hover:text-red-500 font-bold ml-1 cursor-pointer"
          >
            <Icons name="crossIcon" :size="12" color="#000000" />
          </button>
        </span>

        <button
          type="button"
          @click="resetFilters()"
          class="text-xs font-semibold text-red-500 hover:underline cursor-pointer ml-1"
        >
          Reset
        </button>
      </div>
    </div>

    <div v-if="status === 'pending'" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="i in 6"
        :key="i"
        class="h-[380px] animate-pulse rounded-[20px] bg-gray-100"
      />
    </div>

    <div
      v-else-if="allProducts.length > 0"
      class="grid grid-cols-1 justify-items-center gap-[20px] sm:grid-cols-2 lg:grid-cols-3"
    >
      <ProductCard
        v-for="product in allProducts"
        :key="product.id"
        :product="product"
      />
    </div>
    <div
      v-else
      class="flex flex-col items-center justify-center rounded-[20px] border border-dashed border-gray-200 py-16 text-center"
    >
      <div class="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-2xl">
        <Icons name="searchIcon" :size="20" color="#000000" />
      </div>
      <TitleTag as="h3" variant="bold" class="!text-[18px] text-gray-800">
        No products match your filters
      </TitleTag>
      <Paragraph variant="normalPara" class="mt-1 !text-[14px] text-gray-500">
        Try adjusting your price range, category, or brand selections.
      </Paragraph>
      <button
        type="button"
        @click="resetFilters()"
        class="mt-4 rounded-full bg-black px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-neutral-800 cursor-pointer"
      >
        Clear All Filters
      </button>
    </div>

    <div class="laptop:mt-[60px] mt-[30px]">
      <Pagination :total="total" :current-page="currentPage" @page-change="pageChange" />
    </div>
  </div>
</template>