<script setup lang="ts">
import TitleTag from "~/components/ui/TitleTag.vue";
import Icons from "~/utils/Icons.vue";
import FilterList from "~/components/Filters/FilterList.vue";
import { useFilterStore } from "~/stores/filter";

interface Props {
  isOpen?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isOpen: false,
});

const emit = defineEmits<{
  (e: "close"): void;
}>();

const filterStore = useFilterStore();
</script>

<template>
  <ClientOnly>
    <Teleport to="body">
      <!-- Modal Wrapper -->
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[100] flex justify-end"
      >
        <!-- Backdrop -->
        <div
          class="fixed inset-0 bg-black/50 backdrop-blur-xs cursor-pointer"
          @click="emit('close')"
          aria-hidden="true"
        />

        <!-- Slide-up Bottom Sheet -->
        <div
          class="fixed right-0 left-0 bottom-0 z-[110] flex max-h-[85vh] w-full flex-col rounded-t-[20px] bg-white shadow-2xl"
        >
          <!-- Header -->
          <div
            class="flex items-center justify-between border-b border-[#EEEEEE] px-[20px] py-[18px]"
          >
            <div class="flex items-center gap-x-[12px]">
              <button
                type="button"
                @click="emit('close')"
                class="flex h-[32px] w-[32px] cursor-pointer items-center justify-center rounded-full hover:bg-[#F5F5F5]"
              >
                <Icons name="arrowLeft" :size="16" color="#000000" />
              </button>
              <TitleTag as="h2" variant="bold" class="!text-[20px] text-[#111111]">
                Filters
              </TitleTag>
              <span
                v-if="filterStore.activeFilterCount > 0"
                class="flex h-5 w-5 items-center justify-center rounded-full bg-black text-[11px] font-bold text-white"
              >
                {{ filterStore.activeFilterCount }}
              </span>
            </div>

            <button
              v-if="filterStore.hasActiveFilters"
              type="button"
              @click="filterStore.clearFilters()"
              class="cursor-pointer font-satoshi text-[12px] font-semibold text-red-500 hover:underline"
            >
              Clear All
            </button>
          </div>

          <!-- Body -->
          <div class="flex-1 overflow-y-auto px-[20px] py-[16px]">
            <FilterList />
          </div>

          <!-- Footer Action Button -->
          <div class="border-t border-[#EEEEEE] p-[16px] bg-white">
            <button
              type="button"
              @click="emit('close')"
              class="w-full rounded-full bg-black py-[12px] font-satoshi text-[15px] font-semibold text-white transition hover:bg-neutral-800 cursor-pointer"
            >
              Apply Filters {{ filterStore.activeFilterCount > 0 ? `(${filterStore.activeFilterCount})` : '' }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </ClientOnly>
</template>
