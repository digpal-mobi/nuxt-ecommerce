<script setup lang="ts">
import { ref } from 'vue';
import type { ProductDetail } from '~/types/product';
import ProductSpecs from '~/components/ProductDetail/ProductSpecs.vue';
import ProductReviews from '~/components/ProductDetail/ProductReviews.vue';

interface Props {
  product: ProductDetail;
}

const props = defineProps<Props>();

// Active tab selector: 'details' | 'reviews' | 'faqs'
const activeTab = ref<'details' | 'reviews' | 'faqs'>('details');

const tabs = [
  { id: 'details' as const, label: 'Specifications' },
  { id: 'reviews' as const, label: 'Rating & Reviews' },
  { id: 'faqs' as const, label: 'FAQs & Policies' },
];
</script>

<template>
  <div class="mt-12 sm:mt-16">
    <!-- Tab Navigation Bar -->
    <div class="flex border-b border-black/10">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        type="button"
        @click="activeTab = tab.id"
        :class="[
          'relative flex-1 pb-4 text-center font-satoshi text-sm sm:text-base font-medium transition-colors cursor-pointer',
          activeTab === tab.id
            ? 'font-bold text-black border-b-2 border-black -mb-[1px]'
            : 'text-black/50 hover:text-black'
        ]"
      >
        {{ tab.label }}
        <span
          v-if="tab.id === 'reviews' && product.reviews?.length"
          class="ml-1 text-xs text-black/50"
        >
          ({{ product.reviews.length }})
        </span>
      </button>
    </div>

    <!-- Tab Content -->
    <div class="mt-6 sm:mt-8">
      <!-- Specifications Tab -->
      <ProductSpecs v-if="activeTab === 'details'" :product="product" />

      <!-- Reviews Tab -->
      <ProductReviews
        v-else-if="activeTab === 'reviews'"
        :reviews="product.reviews"
        :rating="product.rating"
      />

      <!-- FAQs & Policies Tab -->
      <div
        v-else-if="activeTab === 'faqs'"
        class="rounded-2xl border border-black/10 bg-white p-6 sm:p-8 flex flex-col gap-5 text-sm"
      >
        <div>
          <h4 class="font-satoshi font-bold text-black mb-1">Return & Refund Policy</h4>
          <p class="text-black/60">{{ product.returnPolicy || 'Eligible for return within 30 days of receipt.' }}</p>
        </div>
        <hr class="border-black/5" />
        <div>
          <h4 class="font-satoshi font-bold text-black mb-1">Warranty Information</h4>
          <p class="text-black/60">{{ product.warrantyInformation || 'Standard manufacturer warranty applies.' }}</p>
        </div>
        <hr class="border-black/5" />
        <div>
          <h4 class="font-satoshi font-bold text-black mb-1">Shipping & Handling</h4>
          <p class="text-black/60">{{ product.shippingInformation || 'Standard delivery in 3-5 business days.' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
