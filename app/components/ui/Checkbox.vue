<script setup lang="ts">
import Icons from '~/utils/Icons.vue';

interface Props {
  modelValue?: boolean;
  disabled?: boolean;
  id?: string;
  ariaLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  disabled: false,
  id: 'inputId',
  ariaLabel: 'checkbox',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'change', value: boolean): void;
}>();

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit('update:modelValue', target.checked);
  emit('change', target.checked);
};
</script>

<template>
  <label class="inline-flex items-center cursor-pointer">
    <input
      :id="id"
      type="checkbox"
      :aria-label="ariaLabel"
      class="sr-only peer"
      :checked="modelValue"
      :disabled="disabled"
      @change="handleChange"
      v-bind="$attrs"
    />
    <div
      class="flex items-center justify-center w-5 h-5 rounded border border-gray-300 transition peer-checked:bg-black peer-checked:border-black text-white"
    >
      <Icons v-if="modelValue" name="check" :size="12" />
    </div>
  </label>
</template>
