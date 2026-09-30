<script setup lang="ts">
import Navigation from '~/components/ui/Navigation/index.vue';
import FooterNavigation from '~/components/ui/FooterNavigation/index.vue';
import SectionMiniCart from '~/section/SectionMiniCart.vue';
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <Navigation />
    <div class="flex-1">
      <slot />
    </div>
    <FooterNavigation />
    <SectionMiniCart/>
  </div>
</template>

