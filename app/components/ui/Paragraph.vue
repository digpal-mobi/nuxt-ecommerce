<script setup lang="ts">
type ParagraphVariant = "boldPara" | "normalPara";

const VARIANT_CLASSES: Record<ParagraphVariant, string> = {
  boldPara:
    "font-satoshi text-[20px] font-[700] leading-[1em] laptop:text-[24px]",
  normalPara:
    "font-satoshi text-[14px] font-[400] leading-[22px] laptop:text-[16px]",
};

const props = withDefaults(
  defineProps<{
    variant?: ParagraphVariant;
    class?: string;
  }>(),
  {
    variant: "boldPara",
    class: "",
  }
);
</script>

<template>
  <p :class="[VARIANT_CLASSES[props.variant], props.class]">
    <slot />
  </p>
</template>
