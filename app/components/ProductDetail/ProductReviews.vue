<script setup lang="ts">
import type { ProductReview } from '~/types/product';
import SectionRating from '~/components/ui/SectionRating.vue';

interface Props {
  reviews?: ProductReview[];
  rating?: number;
}

const props = withDefaults(defineProps<Props>(), {
  reviews: () => [],
  rating: 0,
});

// Format ISO date to readable string
const formatDate = (dateStr: string) => {
  if (!dateStr) return '';
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateStr;
  }
};
</script>

<template>
  <div class="rounded-2xl border border-black/10 bg-white p-6 sm:p-8">
    <!-- Header with Review Count & Average -->
    <div class="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-black/10 pb-4">
      <div>
        <h3 class="font-satoshi text-lg font-bold text-black sm:text-xl">
          Customer Reviews
          <span class="text-sm font-normal text-black/50">({{ reviews.length }})</span>
        </h3>
        <p class="text-xs text-black/50 mt-0.5">
          Verified customer feedback and experiences
        </p>
      </div>

      <div class="flex items-center gap-2">
        <SectionRating :rating="rating" />
      </div>
    </div>

    <!-- Reviews Grid -->
    <div
      v-if="reviews.length > 0"
      class="grid grid-cols-1 gap-4 md:grid-cols-2"
    >
      <div
        v-for="(review, idx) in reviews"
        :key="idx"
        class="flex flex-col justify-between rounded-xl border border-black/10 bg-[#FAFAFA] p-5 transition-shadow hover:shadow-xs"
      >
        <div>
          <!-- Stars & Date -->
          <div class="flex items-center justify-between gap-2">
            <SectionRating :rating="review.rating" :show-score="false" />
            <span class="text-xs text-black/40">{{ formatDate(review.date) }}</span>
          </div>

          <!-- Reviewer Name + Verified Icon -->
          <div class="mt-3 flex items-center gap-1.5">
            <span class="font-satoshi text-sm font-bold text-black">
              {{ review.reviewerName }}
            </span>
            <span
              class="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[10px] text-white"
              title="Verified Buyer"
            >
              ✓
            </span>
          </div>

          <!-- Comment -->
          <p class="mt-2 text-sm leading-relaxed text-black/70">
            "{{ review.comment }}"
          </p>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="py-12 text-center">
      <p class="text-sm text-black/50">There are no reviews for this product yet.</p>
    </div>
  </div>
</template>
