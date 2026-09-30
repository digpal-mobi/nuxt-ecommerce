import { usePaginationStore } from "~/pinia/pagination";

export const pageChange = async (page: number) => {
  const paginationStore = usePaginationStore();
  const router = useRouter();
  const route = useRoute();

  paginationStore.setCurrentPage(page);

  await router.push({
    query: {
      ...route.query,
      page: page.toString(),
    },
  });
};