<script setup lang="ts">
import { computed } from 'vue';
import MainContainer from '~/components/ui/MainContainer.vue';
import Container from '~/components/ui/Container.vue';
import UiBreadcrumb from '~/components/ui/Breadcrumb.vue';
import TitleTag from '~/components/ui/TitleTag.vue';
import Button from '~/components/ui/Button.vue';
import ProductCard from '~/components/ui/ProductCard.vue';
import ProductGallery from '~/components/ProductDetail/ProductGallery.vue';
import ProductInfo from '~/components/ProductDetail/ProductInfo.vue';
import ProductActions from '~/components/ProductDetail/ProductActions.vue';
import ProductTabs from '~/components/ProductDetail/ProductTabs.vue';
import { apiProducts } from '~/utils/api';

const route = useRoute();

// Extract route parameter ID
const productId = computed(() => route.params.id as string);

// 1. Fetch current product details from DummyJSON
const { data: product, status, error } = await apiProducts.getProductById(productId);

// 2. Fetch related / recommended products
const { data: relatedData } = await apiProducts.getProducts(() => ({
  limit: 5,
}));

// Filter out current product from related list and keep up to 4
const relatedProducts = computed(() => {
  if (!relatedData.value?.products) return [];
  return relatedData.value.products
    .filter((p) => String(p.id) !== productId.value)
    .slice(0, 4);
});

// Dynamic SEO metadata
useHead(() => ({
  title: product.value?.title ? `${product.value.title} | SHOP.CO` : 'Product Details | SHOP.CO',
  meta: [
    {
      name: 'description',
      content: product.value?.description || 'Browse fashion and lifestyle products on SHOP.CO',
    },
  ],
}));

// Dynamic Breadcrumb navigation trail
const breadcrumbItems = computed(() => [
  { name: 'Home', url: '/' },
  { name: 'Shop', url: '/shop' },
  ...(product.value?.category
    ? [{ name: product.value.category, url: `/shop?category=${product.value.category}` }]
    : []),
  { name: product.value?.title || 'Product Details' },
]);
</script>

<template>
  <MainContainer>
    <Container class="pb-16 sm:pb-24">
      <!-- Breadcrumb Navigation -->
      <UiBreadcrumb :items="breadcrumbItems" />

      <!-- State 1: Loading Skeleton -->
      <div v-if="status === 'pending'" class="grid grid-cols-1 gap-10 laptop:grid-cols-2 pt-4">
        <div class="h-[460px] animate-pulse rounded-[20px] bg-gray-100" />
        <div class="flex flex-col gap-4">
          <div class="h-8 w-3/4 animate-pulse rounded-lg bg-gray-100" />
          <div class="h-6 w-1/3 animate-pulse rounded-lg bg-gray-100" />
          <div class="h-10 w-1/2 animate-pulse rounded-lg bg-gray-100" />
          <div class="h-28 w-full animate-pulse rounded-lg bg-gray-100" />
          <div class="h-14 w-full animate-pulse rounded-lg bg-gray-100" />
        </div>
      </div>

      <!-- State 2: Error / Product Not Found -->
      <div
        v-else-if="error || !product"
        class="flex flex-col items-center justify-center rounded-[20px] border border-dashed border-gray-200 py-20 text-center"
      >
        <div class="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-2xl text-red-500">
          ✕
        </div>
        <TitleTag as="h2" variant="heading" class="!text-[24px] text-gray-900">
          Product Not Found
        </TitleTag>
        <p class="mt-2 text-sm text-gray-500 max-w-[360px]">
          The product you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <NuxtLink to="/shop" class="mt-6">
          <Button variant="primary" class="!px-6 !py-3">
            Back to Shop
          </Button>
        </NuxtLink>
      </div>

      <!-- State 3: Product Detail View -->
      <div v-else>
        <!-- Top Section: Image Gallery & Product Info/Actions -->
        <div class="grid grid-cols-1 gap-8 laptop:grid-cols-2 laptop:gap-12 pt-2">
          <!-- Left: Gallery -->
          <ProductGallery
            :images="product.images"
            :thumbnail="product.thumbnail"
            :title="product.title"
          />

          <!-- Right: Info & Actions -->
          <div class="flex flex-col justify-between gap-6">
            <ProductInfo :product="product" />
            <ProductActions :product="product" />
          </div>
        </div>

        <!-- Middle Section: Tabs (Specifications, Customer Reviews, Policies) -->
        <ProductTabs :product="product" />

        <!-- Bottom Section: Related Products -->
        <div v-if="relatedProducts.length > 0" class="mt-16 sm:mt-24 border-t border-black/10 pt-12">
          <div class="mb-8 text-center">
            <TitleTag as="h2" variant="heading" class="!text-[28px] sm:!text-[36px]">
              YOU MIGHT ALSO LIKE
            </TitleTag>
          </div>

          <div class="grid grid-cols-1 gap-6 justify-items-center sm:grid-cols-2 lg:grid-cols-4">
            <ProductCard
              v-for="item in relatedProducts"
              :key="item.id"
              :product="item"
            />
          </div>
        </div>
      </div>
    </Container>
  </MainContainer>
</template>
