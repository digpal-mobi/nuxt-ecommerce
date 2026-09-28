<script lang="ts" setup>
import UiBreadcrumb from '~/components/ui/Breadcrumb.vue';
import Container from '~/components/ui/Container.vue';
import MainContainer from '~/components/ui/MainContainer.vue';
import { useFilterStore } from '~/pinia/filter';
import SectionFilter from '~/section/SectionFilter.vue';
import SectionProductList from '~/section/SectionProductList.vue';

useFilterStore();

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
      <UiBreadcrumb />

      <div
        class="flex flex-col laptop:flex-row items-start gap-x-[30px] gap-y-[10px] laptop:px-[80px] px-[16px] pb-[40px]"
      >
        <SectionFilter />   
        <div class="flex-1 w-full min-w-0">
          <SectionProductList />
        </div>
      </div>
    </Container>
  </MainContainer>
</template>