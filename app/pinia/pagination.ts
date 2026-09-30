import { defineStore } from "pinia";

export const usePaginationStore = defineStore('pagination', {
  state: () => ({
    currentPage: 1,
    limit: 9,
    total: 0
  }),
  actions: {
    setCurrentPage(page: number) {
      this.currentPage = page;
    },
    setLimit(limit: number) {
      this.limit = limit;
    },
    setTotal(total: number) {
      this.total = total;
    },
  },
});