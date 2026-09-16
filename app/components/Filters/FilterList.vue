<script setup lang="ts">
import { ref } from "vue";
import TitleTag from "~/components/ui/TitleTag.vue";
import Icons from "~/utils/Icons.vue";
import PriceFilter from "~/components/Filters/PriceFilter.vue";
import CategoryFilter from "~/components/Filters/CategoryFilter.vue";
import FilterOptions from "~/components/Filters/FilterOptions.vue";
import { useFilterStore } from "~/stores/filter";

const filterStore = useFilterStore();
const openSections = ref<string[]>(["Price", "Category", "Brand", "Rating"]);

const toggleSection = (name: string) => {
  if (openSections.value.includes(name)) {
    openSections.value = openSections.value.filter((s) => s !== name);
  } else {
    openSections.value.push(name);
  }
};

const brandOptions = ["Gucci", "Zara", "Prada", "Calvin Klein", "Nike", "Adidas"];

const ratingOptions = [
  { label: "4★ & above", value: 4 },
  { label: "3★ & above", value: 3 },
  { label: "2★ & above", value: 2 },
  { label: "1★ & above", value: 1 },
];
</script>

<template>
  <div class="flex flex-col divide-y divide-[#EEEEEE]">
    <!-- 1. Price Filter -->
    <div class="py-[14px] first:pt-0 last:pb-0">
      <button
        type="button"
        @click="toggleSection('Price')"
        class="flex w-full cursor-pointer items-center justify-between py-[4px] text-left"
      >
        <TitleTag as="h3" variant="satoshiBold" class="!text-[15px] font-semibold text-[#111111]">
          Price
        </TitleTag>
        <Icons
          name="chevronDown"
          :size="12"
          class="transition-transform duration-200"
          :class="{ 'rotate-180': openSections.includes('Price') }"
        />
      </button>

      <div v-show="openSections.includes('Price')">
        <PriceFilter />
      </div>
    </div>

    <!-- 2. Category Filter -->
    <div class="py-[14px] first:pt-0 last:pb-0">
      <button
        type="button"
        @click="toggleSection('Category')"
        class="flex w-full cursor-pointer items-center justify-between py-[4px] text-left"
      >
        <TitleTag as="h3" variant="satoshiBold" class="!text-[15px] font-semibold text-[#111111]">
          Category
        </TitleTag>
        <Icons
          name="chevronDown"
          :size="12"
          class="transition-transform duration-200"
          :class="{ 'rotate-180': openSections.includes('Category') }"
        />
      </button>

      <div v-show="openSections.includes('Category')">
        <CategoryFilter />
      </div>
    </div>

    <!-- 3. Brand Filter -->
    <div class="py-[14px] first:pt-0 last:pb-0">
      <button
        type="button"
        @click="toggleSection('Brand')"
        class="flex w-full cursor-pointer items-center justify-between py-[4px] text-left"
      >
        <TitleTag as="h3" variant="satoshiBold" class="!text-[15px] font-semibold text-[#111111]">
          Brand
        </TitleTag>
        <Icons
          name="chevronDown"
          :size="12"
          class="transition-transform duration-200"
          :class="{ 'rotate-180': openSections.includes('Brand') }"
        />
      </button>

      <div v-show="openSections.includes('Brand')">
        <FilterOptions
          :options="brandOptions"
          :selected-values="filterStore.brands"
          @select="(val) => filterStore.toggleBrand(String(val))"
        />
      </div>
    </div>

    <!-- 4. Rating Filter -->
    <div class="py-[14px] first:pt-0 last:pb-0">
      <button
        type="button"
        @click="toggleSection('Rating')"
        class="flex w-full cursor-pointer items-center justify-between py-[4px] text-left"
      >
        <TitleTag as="h3" variant="satoshiBold" class="!text-[15px] font-semibold text-[#111111]">
          Rating
        </TitleTag>
        <Icons
          name="chevronDown"
          :size="12"
          class="transition-transform duration-200"
          :class="{ 'rotate-180': openSections.includes('Rating') }"
        />
      </button>

      <div v-show="openSections.includes('Rating')">
        <FilterOptions
          :options="ratingOptions"
          :selected-values="filterStore.rating !== null ? [filterStore.rating] : []"
          @select="(val) => filterStore.setRating(Number(val))"
        />
      </div>
    </div>
  </div>
</template>
