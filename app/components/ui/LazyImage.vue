<script setup lang="ts">
interface Props {
  src: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  class?: string;
  priority?: boolean;
  loading?: "lazy" | "eager";
  fill?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  alt: "Image",
  priority: false,
  fill: false,
});
</script>

<template>
  <img
    :src="props.src"
    :alt="props.alt"
    :width="props.fill ? undefined : props.width"
    :height="props.fill ? undefined : props.height"
    :class="[
      props.class,
      props.fill,
    ]"
    :loading="props.priority ? 'eager' : (props.loading ?? 'lazy')"
  />
</template>
