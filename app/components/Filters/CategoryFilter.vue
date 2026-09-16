<script setup lang="ts">
import Checkbox from "~/components/ui/Checkbox.vue";
import Paragraph from "~/components/ui/Paragraph.vue";
import { useFilterStore } from "~/stores/filter";

const filterStore = useFilterStore();

// Default categories list (can also accept props if needed)
const categories = [
  { name: "Clothing", slug: "clothing" },
  { name: "Shoes", slug: "shoes" },
  { name: "Accessories", slug: "accessories" },
  { name: "Jewelry", slug: "jewelry" },
  { name: "Bags", slug: "bags" },
  { name: "Electronics", slug: "electronics" },
];
</script>

<template>
  <div class="flex flex-col gap-[14px] pt-[14px]">
    <div class="flex max-h-[240px] flex-col gap-[10px] overflow-y-auto pr-1">
      <div
        v-for="item in categories"
        :key="item.slug"
        @click="filterStore.toggleCategory(item.slug)"
        role="checkbox"
        :aria-checked="filterStore.categories.includes(item.slug.toLowerCase())"
        tabindex="0"
        @keydown.space.prevent="filterStore.toggleCategory(item.slug)"
        class="flex cursor-pointer items-center gap-[10px] text-left transition hover:opacity-80"
      >
        <Checkbox
          :model-value="filterStore.categories.includes(item.slug.toLowerCase())"
          class="pointer-events-none"
        />
        <Paragraph
          variant="normalPara"
          class="!text-[13px] capitalize select-none text-[#555555]"
        >
          {{ item.name }}
        </Paragraph>
      </div>
    </div>
  </div>
</template>
