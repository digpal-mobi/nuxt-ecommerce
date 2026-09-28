<script setup lang="ts">
import Checkbox from "~/components/ui/Checkbox.vue";
import Paragraph from "~/components/ui/Paragraph.vue";

const { filters, toggleCategory } = useFilters();
const { categories } = await useCategories();
</script>

<template>
  <div class="flex flex-col gap-[14px] pt-[14px]">
    <div class="flex max-h-[240px] flex-col gap-[10px] overflow-y-auto pr-1">
      <div
        v-for="item in categories"
        :key="item.slug"
        @click="toggleCategory(item.slug)"
        role="checkbox"
        :aria-checked="filters.categories.includes(item.slug.toLowerCase())"
        tabindex="0"
        @keydown.space.prevent="toggleCategory(item.slug)"
        class="flex cursor-pointer items-center gap-[10px] text-left transition hover:opacity-80"
      >
        <Checkbox
          :model-value="filters.categories.includes(item.slug.toLowerCase())"
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
