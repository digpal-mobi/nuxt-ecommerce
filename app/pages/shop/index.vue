<script lang="ts" setup>
import UiBreadcrumb from '~/components/ui/Breadcrumb.vue';
import Container from '~/components/ui/Container.vue';
import MainContainer from '~/components/ui/MainContainer.vue';
import SectionFilter from '~/section/SectionFilter.vue';
import SectionProductList from '~/section/SectionProductList.vue';
import { useFilterSync } from '~/composables/useFilterSync';

useFilterSync();
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