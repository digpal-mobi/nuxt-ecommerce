<script setup lang="ts">
import { ref, computed } from 'vue';
import type { ProductDetail } from '~/types/product';
import { useCartStore } from '~/pinia/cart';
import Button from '~/components/ui/Button.vue';
import Increment from '~/components/ui/Increment.vue';
import Icons from '~/utils/Icons.vue';

interface Props {
  product: ProductDetail;
}

const props = defineProps<Props>();

const cartStore = useCartStore();

// Local selected quantity
const quantity = ref(1);

// Check if currently wishlisted
const isWishlisted = computed(() =>
  cartStore.wishlistedItems.some((item) => item.id === props.product.id)
);

// Stock constraints
const isOutOfStock = computed(() => (props.product.stock ?? 0) <= 0);
const maxQuantity = computed(() => Math.min(props.product.stock || 99, 99));

// Add to cart handler
const handleAddToCart = () => {
  if (isOutOfStock.value) return;
  cartStore.addToCart(props.product, quantity.value);
};

// Wishlist toggle handler
const handleToggleWishlist = () => {
  cartStore.toggleWishlist(props.product);
};
</script>

<template>
  <div class="flex flex-col gap-5 border-t border-b border-black/10 py-6">
    <!-- Quantity and Action Buttons -->
    <div class="flex flex-wrap items-center gap-3">
      <!-- Quantity Stepper -->
      <Increment
        :value="quantity"
        :min="1"
        :max="maxQuantity"
        class="!h-[52px] !min-w-[130px] !px-4"
        @change="(val) => (quantity = val)"
      />

      <!-- Add to Cart CTA -->
      <Button
        variant="primary"
        class="flex-1 gap-2 !py-[15px] !px-6 text-[15px] transition-transform active:scale-[0.98]"
        :disabled="isOutOfStock"
        @click="handleAddToCart"
      >
        <Icons name="cartsIcon" :size="20" />
        <span>{{ isOutOfStock ? 'Out of Stock' : 'Add to Cart' }}</span>
      </Button>

      <!-- Wishlist Button -->
      <button
        type="button"
        @click="handleToggleWishlist"
        :aria-label="isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'"
        class="flex h-[52px] w-[52px] cursor-pointer items-center justify-center rounded-full border border-black/15 bg-white shadow-xs transition-all hover:border-black/30 hover:bg-black/5"
      >
        <Icons name="wishlistIcon" :is-wishlisted="isWishlisted" :size="22" />
      </button>
    </div>

    <!-- Trust Badges & Guarantee Highlights -->
    <div class="grid grid-cols-1 gap-3 sm:grid-cols-3 pt-2 text-xs text-black/70">
      <div class="flex items-center gap-2 rounded-xl bg-[#F0EEED]/60 p-3">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-black shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
        </svg>
        <span>{{ product.shippingInformation || 'Fast Delivery' }}</span>
      </div>

      <div class="flex items-center gap-2 rounded-xl bg-[#F0EEED]/60 p-3">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-black shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        <span>{{ product.returnPolicy || '30 Days Return' }}</span>
      </div>

      <div class="flex items-center gap-2 rounded-xl bg-[#F0EEED]/60 p-3">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-black shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
        <span>{{ product.warrantyInformation || 'Warranty Included' }}</span>
      </div>
    </div>
  </div>
</template>
