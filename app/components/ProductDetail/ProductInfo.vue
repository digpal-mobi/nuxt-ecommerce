<script setup lang="ts">
import { computed } from 'vue';
import type { ProductDetail } from '~/types/product';
import SectionRating from '~/components/ui/SectionRating.vue';
import TitleTag from '~/components/ui/TitleTag.vue';
import Paragraph from '~/components/ui/Paragraph.vue';
import { ConvertToFinalPrice, CurrencyConverter } from '~/utils/currency';

interface Props {
  product: ProductDetail;
}

const props = defineProps<Props>();

// Calculate discounted price if discountPercentage exists
const discount = computed(() => Number(props.product.discountPercentage ?? 0));
const finalPrice = computed(() =>
  discount.value > 0
    ? ConvertToFinalPrice(props.product.price, discount.value)
    : props.product.price
);

// Stock badge styling and text
const stockStatus = computed(() => {
  const stock = props.product.stock ?? 0;
  if (stock <= 0) return { label: 'Out of Stock', class: 'bg-red-50 text-red-600 border-red-200' };
  if (stock <= 5) return { label: `Only ${stock} left in stock!`, class: 'bg-amber-50 text-amber-700 border-amber-200' };
  return { label: props.product.availabilityStatus || 'In Stock', class: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
});
</script>

<template>
  <div class="flex flex-col gap-3">
    <!-- Brand & Category Badges -->
    <div class="flex flex-wrap items-center gap-2">
      <span
        v-if="product.brand"
        class="rounded-full bg-black/5 px-3 py-1 font-satoshi text-xs font-semibold text-black"
      >
        {{ product.brand }}
      </span>
      <span
        v-if="product.category"
        class="rounded-full bg-black/5 px-3 py-1 font-satoshi text-xs font-medium text-black/70 capitalize"
      >
        {{ product.category }}
      </span>
      <span
        class="rounded-full border px-2.5 py-0.5 font-satoshi text-xs font-semibold"
        :class="stockStatus.class"
      >
        {{ stockStatus.label }}
      </span>
    </div>

    <!-- Product Title -->
    <TitleTag
      as="h1"
      variant="heading"
      class="!text-[26px] leading-[32px] sm:!text-[34px] sm:leading-[40px] text-black"
    >
      {{ product.title }}
    </TitleTag>

    <!-- Star Rating & Review Count -->
    <div class="flex items-center gap-3">
      <SectionRating :rating="product.rating ?? 0" />
      <span
        v-if="product.reviews && product.reviews.length"
        class="font-satoshi text-xs font-medium text-black/60"
      >
        ({{ product.reviews.length }} {{ product.reviews.length === 1 ? 'review' : 'reviews' }})
      </span>
    </div>

    <!-- Price Section -->
    <div class="mt-1 flex flex-wrap items-center gap-3">
      <span class="font-satoshi text-[26px] font-bold text-black sm:text-[30px]">
        {{ CurrencyConverter(finalPrice) }}
      </span>

      <template v-if="discount > 0">
        <span class="font-satoshi text-[20px] font-bold text-black/40 line-through">
          {{ CurrencyConverter(product.price) }}
        </span>
        <span class="rounded-full bg-[#FF3333]/10 px-3 py-1 font-satoshi text-xs font-semibold text-[#FF3333]">
          -{{ Math.round(discount) }}%
        </span>
      </template>
    </div>

    <!-- Product Description -->
    <Paragraph
      variant="normalPara"
      class="mt-2 text-[14px] leading-[22px] text-black/60 sm:text-[15px]"
    >
      {{ product.description }}
    </Paragraph>

    <!-- SKU & Tags Quick Info -->
    <div class="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-black/50">
      <span v-if="product.sku">
        <strong class="font-medium text-black/70">SKU:</strong> {{ product.sku }}
      </span>
      <span v-if="product.tags && product.tags.length">
        <strong class="font-medium text-black/70">Tags:</strong> {{ product.tags.join(', ') }}
      </span>
    </div>
  </div>
</template>
