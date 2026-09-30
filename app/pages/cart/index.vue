<script setup lang="ts">
import Container from '~/components/ui/Container.vue';
import MainContainer from '~/components/ui/MainContainer.vue';
import SectionCart from '~/section/SectionCart.vue';

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
    <SectionCart />
   </Container>
  </MainContainer>
</template>
