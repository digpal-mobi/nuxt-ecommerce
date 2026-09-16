<script setup lang="ts">
import { computed } from "vue";
import Checkbox from "~/components/ui/Checkbox.vue";
import Paragraph from "~/components/ui/Paragraph.vue";

export interface FilterOptionItem {
  label: string;
  value: string | number;
}

interface Props {
  options?: (string | FilterOptionItem)[];
  selectedValues?: (string | number)[];
}

const props = withDefaults(defineProps<Props>(), {
  options: () => ["Gucci", "Zara", "Prada", "Calvin Klein", "Nike", "Adidas"],
  selectedValues: () => [],
});

const emit = defineEmits<{
  (e: "select", value: string | number): void;
}>();

const normalizedOptions = computed(() => {
  return props.options.map((opt) => {
    if (typeof opt === "object" && opt !== null) {
      return opt;
    }
    return { label: String(opt), value: opt };
  });
});

const isSelected = (val: string | number): boolean => {
  return props.selectedValues.some(
    (v) => String(v).toLowerCase() === String(val).toLowerCase()
  );
};
</script>

<template>
  <div class="flex flex-col gap-[14px] pt-[14px]">
    <div class="flex max-h-[220px] flex-col gap-[10px] overflow-y-auto pr-1">
      <div
        v-for="item in normalizedOptions"
        :key="String(item.value)"
        @click="emit('select', item.value)"
        role="checkbox"
        :aria-checked="isSelected(item.value)"
        tabindex="0"
        @keydown.space.prevent="emit('select', item.value)"
        class="flex cursor-pointer items-center gap-[10px] text-left transition hover:opacity-80"
      >
        <Checkbox
          :model-value="isSelected(item.value)"
          class="pointer-events-none"
        />
        <Paragraph
          variant="normalPara"
          class="!text-[13px] select-none text-[#555555]"
        >
          {{ item.label }}
        </Paragraph>
      </div>
    </div>
  </div>
</template>
