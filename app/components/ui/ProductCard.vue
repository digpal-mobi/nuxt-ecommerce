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
import { useCartStore } from '~/pinia/cart';
import Icons from '~/utils/Icons.vue';

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

const cartStore = useCartStore();

const emit = defineEmits<{
  (e: 'toggleWishlist', event: MouseEvent, product: Product): void;
  (e: 'quantityChange', quantity: number, product: Product): void;
  (e: 'addToCart', product: Product, quantity?: number): void;
}>();

const discount = computed(() => Number(props.product.discountPercentage ?? 0));

const finalPrice = computed(() =>
  discount.value > 0
    ? ConvertToFinalPrice(props.product.price, discount.value)
    : props.product.price
);

const isWishlisted = computed(() =>
  Boolean(props.isWishlisted || cartStore.wishlistedItems.some((item) => item.id === props.product.id))
);

const handleToggleWishlist = (e: MouseEvent) => {
  cartStore.toggleWishlist(props.product);
};  

const handleQuantityChange = (qty: number) => {
  emit('quantityChange', qty, props.product);
};

const handleAddToCart = () => {
  cartStore.addToCart(props.product, props.quantity);
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
      :aria-label="
        isWishlisted
          ? 'Remove from Wishlist'
          : 'Add to Wishlist'
      "
      class="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/80 shadow-md backdrop-blur-sm transition-all hover:scale-110 hover:bg-white"
      @click.stop.prevent="handleToggleWishlist"
    >
      <Icons
        name="wishlistIcon"
        :is-wishlisted="isWishlisted"
      />
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
        <Icons name="cartsIcon" :size="18" />
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