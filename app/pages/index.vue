<script setup lang="ts">
import SectionMainBanner from '~/section/SectionMainBanner.vue';
import SectionBrandLogo from '~/section/SectionBrandLogo.vue';
import SectionNewArrival from '~/section/SectionNewArrival.vue';
import SectionTopSelling from '~/section/SectionTopSelling.vue';
import { useCategoryStore, type Category } from '~/pinia/category';

useHead({
  title: 'SHOP.CO | Find Clothes That Matches Your Style',
  meta: [
    {
      name: 'description',
      content: 'Browse through our diverse range of meticulously crafted garments designed to bring out your individuality.',
    },
  ],
});

const categoryStore = useCategoryStore();

const { data: categories } = await useFetch<Category[]>('https://dummyjson.com/products/categories');

if (categories.value) {
  categoryStore.setCategories(categories.value);
}
</script>

<template>
  <main>
    <SectionMainBanner />
    <SectionBrandLogo />
    <SectionNewArrival />
    <SectionTopSelling />
  </main>
</template>
