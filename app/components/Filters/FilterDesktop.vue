<script setup lang="ts">
import TitleTag from "~/components/ui/TitleTag.vue";
import Icons from "~/utils/Icons.vue";
import FilterList from "~/components/Filters/FilterList.vue";
import { useFilterStore } from "~/stores/filter";

const filterStore = useFilterStore();
</script>

<template>
  <aside
    class="w-full max-w-[295px] max-h-full rounded-[16px] border border-[#E8E8E8] bg-white p-[18px] shadow-xs"
  >
    <div
      class="mb-[16px] flex items-center justify-between border-b border-[#EEEEEE] pb-[14px]"
    >
      <div class="flex items-center gap-2">
        <TitleTag
          as="h2"
          variant="bold"
          class="laptop:!text-[22px] !text-[18px] text-[#111111]"
        >
          Filters
        </TitleTag>
        <span
          v-if="filterStore.activeFilterCount > 0"
          class="flex h-5 w-5 items-center justify-center rounded-full bg-black text-[11px] font-bold text-white"
        >
          {{ filterStore.activeFilterCount }}
        </span>
      </div>

      <div class="flex items-center gap-2">
        <button
          v-if="filterStore.hasActiveFilters"
          type="button"
          @click="filterStore.clearFilters()"
          class="cursor-pointer font-satoshi text-[12px] font-semibold text-red-500 hover:underline transition-opacity"
        >
          Clear All
        </button>
        <div
          class="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-[#F5F5F5]"
          aria-label="Filters"
        >
          <Icons name="filter" :size="15" color="#555555" />
        </div>
      </div>
    </div>

    <FilterList />
  </aside>
</template>