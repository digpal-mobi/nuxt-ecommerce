<script setup lang="ts">
import Container from '~/components/ui/Container.vue';
import MainContainer from '~/components/ui/MainContainer.vue';
import ProductCard from '~/components/ui/ProductCard.vue';
import TitleTag from '~/components/ui/TitleTag.vue';
import Button from '~/components/ui/Button.vue';
import type { Product } from '~/types/product';

interface Props {
  products?: Product[];
  viewAllHref?: string;
}

const defaultProducts: Product[] = [
  {
    id: 1,
    title: 'T-shirt with Tape Details',
    price: 120,
    discountPercentage: 0,
    rating: 4.5,
    thumbnail: '/products/product_1.png',
  },
  {
    id: 2,
    title: 'Skinny Fit Jeans',
    price: 260,
    discountPercentage: 20,
    rating: 3.5,
    thumbnail: '/products/product_2.png',
  },
  {
    id: 3,
    title: 'Checkered Shirt',
    price: 180,
    discountPercentage: 0,
    rating: 4.5,
    thumbnail: '/products/product_3.png',
  },
  {
    id: 4,
    title: 'Sleeve Striped T-shirt',
    price: 160,
    discountPercentage: 30,
    rating: 4.5,
    thumbnail: '/products/product_4.png',
  },
];

const props = withDefaults(defineProps<Props>(), {
  products: () => [],
  viewAllHref: '/shop?category=new-arrivals',
});

const displayProducts = computed(() =>
  props.products && props.products.length > 0 ? props.products : defaultProducts
);
</script>

<template>
  <MainContainer>
    <Container class="laptop:px-[100px] px-[16px]">
      <div class="laptop:pt-[85px] pt-[50px] pb-[40px] laptop:pb-[64px]">
        <!-- Title -->
        <div class="flex justify-center items-center w-full">
          <TitleTag as="h2" variant="heading">
            NEW ARRIVALS
          </TitleTag>
        </div>

        <!-- Product Cards Slider / Grid -->
        <div class="mt-[32px] laptop:mt-[55px] flex gap-[20px] justify-start desktop-lg:justify-center overflow-x-auto overflow-y-hidden pb-4 scrollbar-hide">
          <ProductCard
            v-for="product in displayProducts"
            :key="product.id"
            :product="product"
          />
        </div>

        <!-- View All Button -->
        <div class="flex items-center justify-center mt-[36px]">
          <NuxtLink :to="props.viewAllHref" aria-label="View all new arrivals">
            <Button variant="outline" class="!px-[54px] !py-[16px] text-[16px] border-black/10 text-black hover:bg-black/5">
              View All
            </Button>
          </NuxtLink>
        </div>
      </div>
    </Container>
  </MainContainer>
</template>