<script setup lang="ts">
import { ref, computed, watch } from 'vue';

interface Props {
  images?: string[];
  thumbnail: string;
  title: string;
}

const props = withDefaults(defineProps<Props>(), {
  images: () => [],
});

// Normalized images list with fallback to thumbnail
const allImages = computed(() => {
  if (props.images && props.images.length > 0) {
    return props.images;
  }
  return props.thumbnail ? [props.thumbnail] : [];
});

// Currently selected main image
const selectedImage = ref<string>(allImages.value[0] || props.thumbnail);

// Keep selectedImage in sync when product changes
watch(
  allImages,
  (newImages) => {
    const firstImage = newImages[0];
    if (firstImage) {
      selectedImage.value = firstImage;
    }
  },
  { immediate: true }
);
</script>

<template>
  <div class="flex flex-col-reverse gap-4 laptop:flex-row">
    <!-- Thumbnails List -->
    <div
      v-if="allImages.length > 1"
      class="flex gap-3 overflow-x-auto pb-2 scrollbar-hide laptop:flex-col laptop:overflow-y-auto laptop:pb-0"
    >
      <button
        v-for="(img, idx) in allImages"
        :key="idx"
        type="button"
        @click="selectedImage = img"
        :class="[
          'relative h-[75px] w-[75px] shrink-0 overflow-hidden rounded-xl border-2 bg-[#F0EEED] p-1 transition-all sm:h-[90px] sm:w-[90px] laptop:h-[105px] laptop:w-[105px]',
          selectedImage === img ? 'border-black ring-1 ring-black' : 'border-transparent hover:border-black/30'
        ]"
        :aria-label="`Select image ${idx + 1}`"
      >
        <img
          :src="img"
          :alt="`${title} - thumbnail ${idx + 1}`"
          class="h-full w-full object-contain"
          loading="lazy"
        />
      </button>
    </div>

    <!-- Main Display Image -->
    <div
      class="relative flex flex-1 items-center justify-center overflow-hidden rounded-[20px] bg-[#F0EEED] p-4 min-h-[340px] sm:min-h-[440px] laptop:min-h-[500px]"
    >
      <img
        :src="selectedImage || thumbnail"
        :alt="title"
        class="max-h-[460px] w-auto max-w-full object-contain transition-transform duration-300 hover:scale-105"
      />
    </div>
  </div>
</template>
