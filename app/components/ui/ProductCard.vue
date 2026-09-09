<script setup lang="ts">
import { computed } from 'vue';
import type { Product } from '~/types/product';
import LazyImage from '~/components/ui/LazyImage.vue';
import TitleTag from '~/components/ui/TitleTag.vue';
import Paragraph from '~/components/ui/Paragraph.vue';
import Button from '~/components/ui/Button.vue';
import Increment from '~/components/ui/Increment.vue';
import SectionRating from '~/components/ui/SectionRating.vue';
import { ConvertToFinalPrice, CurrencyConverter } from '~/utils/currency';

interface Props {
  product: Product;
  currency?: string;
  isWishlisted?: boolean;
  quantity?: number;
}

const props = withDefaults(defineProps<Props>(), {
  currency: '$',
  isWishlisted: false,
  quantity: 1,
});

const emit = defineEmits<{
  (e: 'toggleWishlist', event: MouseEvent, product: Product): void;
  (e: 'quantityChange', quantity: number, product: Product): void;
  (e: 'addToCart', product: Product): void;
}>();

const discount = computed(() => Number(props.product.discountPercentage ?? 0));

const finalPrice = computed(() =>
  discount.value > 0
    ? ConvertToFinalPrice(props.product.price, discount.value)
    : props.product.price
);

const handleToggleWishlist = (e: MouseEvent) => {
  e.preventDefault();
  emit('toggleWishlist', e, props.product);
};

const handleQuantityChange = (qty: number) => {
  emit('quantityChange', qty, props.product);
};

const handleAddToCart = () => {
  emit('addToCart', props.product);
};
</script>

<template>
  <div class="flex w-[295px] shrink-0 flex-col justify-between">
    <NuxtLink
      :to="`/shop/${product.id}`"
      :aria-label="`View details for ${product.title}`"
      class="relative block"
    >
      <LazyImage
        :src="product.thumbnail"
        :width="295"
        :height="298"
        :alt="product.title"
        class="h-auto max-h-[298px] w-full cursor-pointer rounded-[20px] bg-[#F0EEED] object-cover transition-all hover:scale-[1.05]"
      />

      <div class="absolute right-3 top-3 z-10">
        <button
          type="button"
          :aria-label="isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'"
          class="flex h-9 w-9 items-center justify-center rounded-full bg-white/80 shadow-md backdrop-blur-sm transition-all hover:scale-110 hover:bg-white"
          @click="handleToggleWishlist"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-[18px] w-[18px] cursor-pointer transition-colors"
            :class="isWishlisted ? 'text-red-500 fill-red-500' : 'text-gray-700 fill-none stroke-current stroke-2'"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </button>
      </div>
    </NuxtLink>

    <!-- Product Info -->
    <div class="mt-[16px] flex flex-col items-start">
      <div class="overflow-hidden">
        <TitleTag
          variant="satoshiBold"
          as="h3"
          class="line-clamp-2 leading-[24px] !tracking-[0.4px]"
        >
          {{ product.title }}
        </TitleTag>
      </div>

      <SectionRating :rating="product.rating" />

      <!-- Price Section -->
      <div class="mt-[12px] flex w-full flex-wrap items-center gap-[10px]">
        <Paragraph variant="boldPara">
          <span v-html="CurrencyConverter(finalPrice, currency)" />
        </Paragraph>

        <template v-if="discount > 0">
          <Paragraph
            variant="boldPara"
            class="font-satoshi text-[14px] font-bold text-[#000000]/40 line-through"
          >
            <span v-html="CurrencyConverter(product.price, currency)" />
          </Paragraph>

          <span
            class="rounded-full bg-[#FF3333]/10 px-[5px] py-[3px] font-satoshi text-[10px] font-medium leading-[1em] text-[#FF3333] laptop:px-[13.5px] laptop:py-[6px] laptop:text-[12px]"
          >
            -{{ Math.round(discount) }}%
          </span>
        </template>
      </div>
    </div>

    <!-- Actions (Quantity & Add to Cart) -->
    <div class="mt-[16px] flex w-full items-center gap-[10px]">
      <Increment
        :value="quantity"
        class="!h-[46px] !min-w-[95px] shrink-0 !px-[12px]"
        @change="handleQuantityChange"
      />

      <Button
        variant="primary"
        class="flex-1 gap-[8px] whitespace-nowrap !px-[14px] !py-[12px]"
        @click="handleAddToCart"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-[18px] w-[18px]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>

        <TitleTag
          as="span"
          variant="satoshiBold"
          class="!text-[14px]"
        >
          Add to Cart
        </TitleTag>
      </Button>
    </div>
  </div>
</template>
