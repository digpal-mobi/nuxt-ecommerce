<script setup lang="ts">
interface Props {
  value?: number;
  min?: number;
  max?: number;
  className?: string;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  value: 1,
  min: 1,
  max: 99,
  className: '',
  class: '',
});

const emit = defineEmits<{
  (e: 'change', value: number): void;
  (e: 'update:modelValue', value: number): void;
}>();

const decrease = () => {
  if (props.value > props.min) {
    const newVal = props.value - 1;
    emit('change', newVal);
    emit('update:modelValue', newVal);
  }
};

const increase = () => {
  if (props.value < props.max) {
    const newVal = props.value + 1;
    emit('change', newVal);
    emit('update:modelValue', newVal);
  }
};
</script>

<template>
  <div
    :class="[
      'flex items-center justify-between rounded-full bg-[#F0F0F0] px-4 py-2 font-satoshi text-[14px] font-medium text-black',
      props.className,
      props.class,
    ]"
  >
    <button
      type="button"
      :disabled="props.value <= props.min"
      class="flex h-5 w-5 items-center justify-center text-[18px] font-bold text-black transition-opacity hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-30"
      aria-label="Decrease quantity"
      @click="decrease"
    >
      −
    </button>
    <span class="px-2 font-bold">{{ props.value }}</span>
    <button
      type="button"
      :disabled="props.value >= props.max"
      class="flex h-5 w-5 items-center justify-center text-[18px] font-bold text-black transition-opacity hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-30"
      aria-label="Increase quantity"
      @click="increase"
    >
      +
    </button>
  </div>
</template>
