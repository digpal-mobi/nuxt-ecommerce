<script setup lang="ts">
import { computed } from 'vue';
import ProductCard from '~/components/ui/ProductCard.vue';
import TitleTag from '~/components/ui/TitleTag.vue';
import Paragraph from '~/components/ui/Paragraph.vue';
import { useFilterStore } from '~/stores/filter';
import type { Product } from '~/types/product';

const filterStore = useFilterStore();

const { data, status } = await useFetch<{ products: any[] }>(
  'https://dummyjson.com/products?limit=50'
);

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

const categoryMatches = (productCategory: string, selectedSlug: string): boolean => {
  const pCat = (productCategory || '').toLowerCase();
  const slug = (selectedSlug || '').toLowerCase();
  if (pCat === slug || pCat.includes(slug)) return true;
  if (slug === 'clothing' && (pCat.includes('shirt') || pCat.includes('dress') || pCat.includes('top'))) return true;
  if (slug === 'shoes' && pCat.includes('shoe')) return true;
  if (slug === 'accessories' && (pCat.includes('accessories') || pCat.includes('sunglasses') || pCat.includes('watch'))) return true;
  if (slug === 'jewelry' && (pCat.includes('jewel') || pCat.includes('watch'))) return true;
  if (slug === 'bags' && pCat.includes('bag')) return true;
  if (slug === 'electronics' && (pCat.includes('phone') || pCat.includes('laptop') || pCat.includes('tablet'))) return true;
  return false;
};

const filteredProducts = computed(() => {
  return allProducts.value.filter((product) => {
    // 1. Category Filter
    if (filterStore.categories.length > 0) {
      const match = filterStore.categories.some((cat) =>
        categoryMatches(product.category || '', cat)
      );
      if (!match) return false;
    }

    // 2. Brand Filter
    if (filterStore.brands.length > 0) {
      const pBrand = (product as any).brand?.toLowerCase() || '';
      const match = filterStore.brands.some((b) =>
        pBrand.includes(b.toLowerCase())
      );
      if (!match) return false;
    }

    // 3. Price Filter
    if (product.price < filterStore.minPrice || product.price > filterStore.maxPrice) {
      return false;
    }

    // 4. Rating Filter
    if (filterStore.rating !== null) {
      if (!product.rating || product.rating < filterStore.rating) {
        return false;
      }
    }

    return true;
  });
});
</script>

<template>
  <div class="w-full">
    <!-- Header with product count and active filters -->
    <div class="mb-6 flex flex-wrap items-center justify-between gap-4">
      <div>
        <TitleTag as="h1" variant="bold" class="!text-[24px] laptop:!text-[28px] text-[#111111]">
          Casual
        </TitleTag>
        <Paragraph variant="normalPara" class="!text-[14px] !text-[#777777]">
          Showing {{ filteredProducts.length }} of {{ allProducts.length }} Products
        </Paragraph>
      </div>

      <!-- Active filter badges -->
      <div v-if="filterStore.hasActiveFilters" class="flex flex-wrap items-center gap-2">
        <span
          v-for="cat in filterStore.categories"
          :key="cat"
          class="inline-flex items-center gap-1 rounded-full bg-black/5 px-3 py-1 text-xs font-medium text-black capitalize"
        >
          {{ cat }}
          <button
            type="button"
            @click="filterStore.toggleCategory(cat)"
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
            @click="filterStore.toggleBrand(b)"
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
            @click="filterStore.setPriceRange(0, 1000)"
            class="hover:text-red-500 font-bold ml-1 cursor-pointer"
          >
            ×
          </button>
        </span>

        <span
          v-if="filterStore.rating !== null"
          class="inline-flex items-center gap-1 rounded-full bg-black/5 px-3 py-1 text-xs font-medium text-black"
        >
          {{ filterStore.rating }}★ & above
          <button
            type="button"
            @click="filterStore.setRating(null)"
            class="hover:text-red-500 font-bold ml-1 cursor-pointer"
          >
            ×
          </button>
        </span>

        <button
          type="button"
          @click="filterStore.clearFilters()"
          class="text-xs font-semibold text-red-500 hover:underline cursor-pointer ml-1"
        >
          Reset
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="status === 'pending'" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="i in 6"
        :key="i"
        class="h-[380px] animate-pulse rounded-[20px] bg-gray-100"
      />
    </div>

    <!-- Product Grid -->
    <div
      v-else-if="filteredProducts.length > 0"
      class="grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
      />
    </div>

    <!-- Empty State -->
    <div
      v-else
      class="flex flex-col items-center justify-center rounded-[20px] border border-dashed border-gray-200 py-16 text-center"
    >
      <div class="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-2xl">
        🔍
      </div>
      <TitleTag as="h3" variant="bold" class="!text-[18px] text-gray-800">
        No products match your filters
      </TitleTag>
      <Paragraph variant="normalPara" class="mt-1 !text-[14px] text-gray-500">
        Try adjusting your price range, category, or brand selections.
      </Paragraph>
      <button
        type="button"
        @click="filterStore.clearFilters()"
        class="mt-4 rounded-full bg-black px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-neutral-800 cursor-pointer"
      >
        Clear All Filters
      </button>
    </div>
  </div>
</template>