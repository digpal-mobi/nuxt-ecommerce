<script lang="ts" setup>
import Container from '~/components/ui/Container.vue';
import MainContainer from '~/components/ui/MainContainer.vue';
import { useFilterStore } from '~/pinia/filter';
import SectionWishlist from '~/section/SectionWishlist.vue';

useFilterStore();
await useCategories();

useHead({
  title: 'SHOP.CO | Find Clothes That Matches Your Style',
  meta: [
    {
      name: 'description',
      content: 'Browse through our diverse range of meticulously crafted garments designed to bring out your individuality.',
    },
  ],
});

</script>

<template>
  <MainContainer>
    <Container>   
     <SectionWishlist/>
    </Container>
  </MainContainer>
</template>