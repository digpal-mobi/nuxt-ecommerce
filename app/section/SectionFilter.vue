<script setup lang="ts">
import { ref } from "vue";
import FilterDesktop from "~/components/Filters/FilterDesktop.vue";
import FilterMobile from "~/components/Filters/FilterMobile.vue";
import Icons from "~/utils/Icons.vue";
import { useFilterStore } from "~/stores/filter";

const filterStore = useFilterStore();
const isMobileOpen = ref(false);
</script>

<template>
  <div>
    <!-- Desktop View -->
    <div class="hidden shrink-0 laptop:block">
      <FilterDesktop />
    </div>

    <!-- Mobile View -->
    <div class="w-full laptop:hidden">
      <button
        type="button"
        @click="isMobileOpen = true"
        class="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-black/15 bg-white py-[10px] px-[16px] font-satoshi text-[14px] font-semibold text-[#000000] shadow-xs transition active:bg-[#F5F5F5]"
      >
        <Icons name="filter" :size="16" color="#000000" />
        <span>Filters</span>
        <span
          v-if="filterStore.activeFilterCount > 0"
          class="flex h-5 w-5 items-center justify-center rounded-full bg-black text-[11px] font-bold text-white ml-1"
        >
          {{ filterStore.activeFilterCount }}
        </span>
      </button>

      <FilterMobile
        :is-open="isMobileOpen"
        @close="isMobileOpen = false"
      />
    </div>
  </div>
</template>