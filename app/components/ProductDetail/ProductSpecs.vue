<script setup lang="ts">
import { computed } from 'vue';
import type { ProductDetail } from '~/types/product';

interface Props {
  product: ProductDetail;
}

const props = defineProps<Props>();

// Format dimension values cleanly
const dimensionsText = computed(() => {
  if (!props.product.dimensions) return null;
  const { width, height, depth } = props.product.dimensions;
  return `${width} × ${height} × ${depth} cm`;
});

// Specifications mapping for clean rendering
const specs = computed(() => [
  { label: 'Brand', value: props.product.brand },
  { label: 'SKU', value: props.product.sku },
  { label: 'Category', value: props.product.category },
  { label: 'Availability', value: props.product.availabilityStatus },
  { label: 'Stock Level', value: props.product.stock ? `${props.product.stock} units` : null },
  { label: 'Min. Order Qty', value: props.product.minimumOrderQuantity ? `${props.product.minimumOrderQuantity} units` : null },
  { label: 'Weight', value: props.product.weight ? `${props.product.weight} kg` : null },
  { label: 'Dimensions (W×H×D)', value: dimensionsText.value },
  { label: 'Warranty', value: props.product.warrantyInformation },
  { label: 'Shipping', value: props.product.shippingInformation },
  { label: 'Return Policy', value: props.product.returnPolicy },
  { label: 'Barcode', value: props.product.meta?.barcode },
].filter((item) => item.value != null && item.value !== ''));
</script>

<template>
  <div class="rounded-2xl border border-black/10 bg-white p-6 sm:p-8">
    <h3 class="font-satoshi text-lg font-bold text-black mb-4">
      Product Specifications
    </h3>

    <div class="grid grid-cols-1 gap-y-3 gap-x-8 sm:grid-cols-2">
      <div
        v-for="spec in specs"
        :key="spec.label"
        class="flex items-center justify-between border-b border-black/5 py-2 text-sm"
      >
        <span class="text-black/50">{{ spec.label }}</span>
        <span class="font-medium text-black capitalize">{{ spec.value }}</span>
      </div>
    </div>
  </div>
</template>
