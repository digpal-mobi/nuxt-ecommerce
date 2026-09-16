<script setup lang="ts">
import SectionMainBanner from '~/section/SectionMainBanner.vue';
import SectionBrandLogo from '~/section/SectionBrandLogo.vue';
import SectionNewArrival from '~/section/SectionNewArrival.vue';
import SectionTopSelling from '~/section/SectionTopSelling.vue';

useHead({
  title: 'SHOP.CO | Find Clothes That Matches Your Style',
  meta: [
    {
      name: 'description',
      content: 'Browse through our diverse range of meticulously crafted garments designed to bring out your individuality.',
    },
  ],
});

const { data: categories } = await useFetch('https://dummyjson.com/products/categories')
 
 console.log(categories.value)
</script>

<template>
  <main>
    <SectionMainBanner />
    <SectionBrandLogo />
    <SectionNewArrival />
    <SectionTopSelling />
  </main>
</template>
