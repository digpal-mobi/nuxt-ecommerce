<script setup lang="ts">
interface Props {
  rating?: number;
  maxStars?: number;
  showScore?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  rating: 0,
  maxStars: 5,
  showScore: true,
});
</script>

<template>
  <div class="mt-[8px] flex items-center gap-[11px]">
    <div class="flex items-center gap-[5px]">
      <span
        v-for="star in maxStars"
        :key="star" 
        class="text-[18px] leading-none"
        :class="star <= Math.round(props.rating) ? 'text-[#FFC633]' : 'text-gray-300'"
      >
        ★
      </span>
    </div>
    <span v-if="showScore" class="font-satoshi text-[12px] font-normal text-black laptop:text-[14px]">
      {{ props.rating?.toFixed(1) }}/<span class="text-black/60">{{ maxStars }}</span>
    </span>
  </div>
</template>
