<script setup lang="ts">
import { computed } from "vue";
import Paragraph from "~/components/ui/Paragraph.vue";
import { useFilterStore, DEFAULT_MIN_PRICE, DEFAULT_MAX_PRICE } from "~/stores/filter";

const filterStore = useFilterStore();
const minLimit = DEFAULT_MIN_PRICE;
const maxLimit = DEFAULT_MAX_PRICE;

const progressLeft = computed(() => {
  const percentage = ((filterStore.minPrice - minLimit) / (maxLimit - minLimit)) * 100;
  return `${Math.max(0, Math.min(percentage, 100))}%`;
});

const progressWidth = computed(() => {
  const percentage =
    ((filterStore.maxPrice - filterStore.minPrice) / (maxLimit - minLimit)) * 100;
  return `${Math.max(0, Math.min(percentage, 100))}%`;
});

const onMinSliderChange = (event: Event) => {
  const val = Number((event.target as HTMLInputElement).value);
  const newMin = Math.min(val, filterStore.maxPrice);
  filterStore.setPriceRange(newMin, filterStore.maxPrice);
};

const onMaxSliderChange = (event: Event) => {
  const val = Number((event.target as HTMLInputElement).value);
  const newMax = Math.max(val, filterStore.minPrice);
  filterStore.setPriceRange(filterStore.minPrice, newMax);
};

const onMinInputChange = (event: Event) => {
  const val = Number((event.target as HTMLInputElement).value);
  if (!Number.isNaN(val)) {
    filterStore.setPriceRange(val, filterStore.maxPrice);
  }
};

const onMaxInputChange = (event: Event) => {
  const val = Number((event.target as HTMLInputElement).value);
  if (!Number.isNaN(val)) {
    filterStore.setPriceRange(filterStore.minPrice, val);
  }
};
</script>

<template>
  <div class="flex w-full flex-col gap-[12px] pt-[14px]">
    <!-- Price Labels -->
    <div class="flex w-full items-center justify-between">
      <Paragraph variant="normalPara" class="!text-[13px] !text-[#777777]">
        From
      </Paragraph>
      <Paragraph variant="normalPara" class="!text-[13px] !text-[#777777]">
        To
      </Paragraph>
    </div>

    <!-- Number Inputs -->
    <div class="flex w-full items-center justify-between gap-[8px]">
      <div class="relative flex items-center">
        <span class="absolute left-2.5 text-[13px] text-[#777777] font-medium">$</span>
        <input
          type="number"
          :min="minLimit"
          :max="filterStore.maxPrice"
          :value="filterStore.minPrice"
          @input="onMinInputChange"
          class="h-[38px] w-[100px] min-w-[90px] rounded-[6px] border border-[#D4D4D4] bg-transparent pl-6 pr-2 font-satoshi text-[13px] font-[500] text-[#000000] outline-none transition-colors focus:border-black"
          aria-label="Minimum Price Input"
        />
      </div>

      <span class="h-[1px] w-[16px] shrink-0 bg-[#D4D4D4]" />

      <div class="relative flex items-center">
        <span class="absolute left-2.5 text-[13px] text-[#777777] font-medium">$</span>
        <input
          type="number"
          :min="filterStore.minPrice"
          :max="maxLimit"
          :value="filterStore.maxPrice"
          @input="onMaxInputChange"
          class="h-[38px] w-[100px] min-w-[90px] rounded-[6px] border border-[#D4D4D4] bg-transparent pl-6 pr-2 text-end font-satoshi text-[13px] font-[500] text-[#000000] outline-none transition-colors focus:border-black"
          aria-label="Maximum Price Input"
        />
      </div>
    </div>

    <!-- Dual Range Sliders -->
    <div class="relative mt-[14px] mb-[6px] flex h-[24px] w-full items-center">
      <div class="absolute top-1/2 right-0 left-0 h-[3px] -translate-y-1/2 rounded-full bg-[#E5E5E5]" />
      <div
        class="absolute top-1/2 h-[4px] -translate-y-1/2 rounded-full bg-black transition-all duration-75"
        :style="{ left: progressLeft, width: progressWidth }"
      />
      <div>
        <label for="minPriceSlider" class="sr-only">Minimum Price</label>
        <input
          type="range"
          id="minPriceSlider"
          :min="minLimit"
          :max="maxLimit"
          :value="filterStore.minPrice"
          @input="onMinSliderChange"
          class="price-slider"
        />
      </div>
      <label for="maxPriceSlider" class="sr-only">Maximum Price</label>
      <input
        type="range"
        id="maxPriceSlider"
        :min="minLimit"
        :max="maxLimit"
        :value="filterStore.maxPrice"
        @input="onMaxSliderChange"
        class="price-slider"
      />
    </div>
  </div>
</template>

<style scoped>
.price-slider {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  pointer-events: none;
  appearance: none;
  background: transparent;
  margin: 0;
  outline: none;
  height: 24px;
}

.price-slider::-webkit-slider-thumb {
  pointer-events: auto;
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: #000000;
  cursor: pointer;
  border: 2px solid #ffffff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
  transition: transform 0.1s ease;
}

.price-slider::-webkit-slider-thumb:hover {
  transform: scale(1.15);
}

.price-slider::-moz-range-thumb {
  pointer-events: auto;
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: #000000;
  cursor: pointer;
  border: 2px solid #ffffff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.25);
  transition: transform 0.1s ease;
}

.price-slider::-moz-range-thumb:hover {
  transform: scale(1.15);
}
</style>
