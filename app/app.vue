<script setup lang="ts">
import SectionMainBanner from './section/SectionMainBanner.vue';
import SectionBrandLogo from './section/SectionBrandLogo.vue';
import SectionNewArrival from './section/SectionNewArrival.vue';
import SectionTopSelling from './section/SectionTopSelling.vue';
</script>

<template>
  <NuxtLayout>
    <main>
      <SectionMainBanner />
      <SectionBrandLogo />
      <SectionNewArrival />
      <SectionTopSelling />
    </main>
  </NuxtLayout>
</template>





