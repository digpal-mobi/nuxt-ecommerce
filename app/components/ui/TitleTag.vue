<script setup lang="ts">
type TitleVariant =
  | "bold"
  | "heading"
  | "mainHeading"
  | "satoshiBold";

type TitleTag =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "span";

const VARIANT_CLASSES: Record<TitleVariant, string> = {
  bold: "font-integral text-[16px] font-[700] leading-[1em] laptop:text-[20px]",
  heading:
    "font-integral laptop:text-[48px] text-[32px] leading-[36px] font-[700]",
  mainHeading:
    "font-integral laptop:text-[64px] text-[36px] leading-[36px] font-[700]",
  satoshiBold:
    "font-satoshi text-[16px] laptop:text-[20px] leading-[1.3em] font-[500]",
};

const props = withDefaults(
  defineProps<{
    as?: TitleTag;
    variant?: TitleVariant;
    class?: string;
  }>(),
  {
    as: "h2",
    variant: "bold",
    class: "",
  }
);
</script>

<template>
  <component
    :is="props.as"
    :class="[VARIANT_CLASSES[props.variant], props.class]"
  >
    <slot />
  </component>
</template>
