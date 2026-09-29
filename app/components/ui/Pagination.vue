<script lang="ts" setup>
import { computed } from "vue";
import { GetPagination } from "~/utils/helper";

interface Props {
  total: number;
  currentPage: number;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: "pageChange", page: number): void;
}>();

const pagination = computed(() =>
  GetPagination(props.total, props.currentPage)
);

const handlePageChange = (page: number) => {
  if (page < 1 || page > props.total || page === props.currentPage) {
    return;
  }

  emit("pageChange", page);
};
</script>

<template>
  <div v-if="total > 0" class="flex items-center max-h-[80px] justify-between gap-[20px]">
    <div class="w-full flex items-center justify-start">
      <button
        type="button"
        class="bg-black/10 px-[22px] py-[12px] rounded-full transition hover:bg-black/20 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        :disabled="currentPage <= 1"
        @click="handlePageChange(currentPage - 1)"
      >
        Previous
      </button>
    </div>
    <div class="w-full flex items-center justify-center gap-[10px]">
      <button
        type="button"
        class="px-[22px] py-[12px] flex items-center justify-center rounded-full transition cursor-pointer"
        v-for="page in pagination.pages"
        :key="page"
        @click="handlePageChange(page)"
        :class="page === currentPage ? 'bg-primary text-white' : 'bg-black/10 hover:bg-black/20'"
      >
        {{ page }}
      </button>
    </div>
    <div class="w-full flex items-center justify-end">
      <button
        type="button"
        class="bg-black/10 px-[22px] py-[12px] rounded-full transition hover:bg-black/20 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        :disabled="currentPage >= total"
        @click="handlePageChange(currentPage + 1)"
      >
        Next
      </button>
    </div>
  </div>
</template>
