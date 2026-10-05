<script setup lang="ts">
const CONTAINER_CLASS = "mx-auto w-full max-w-[1920px] px-4 sm:px-8 md:px-12 lg:px-[80px]";

defineProps<{
  class?: string;
}>();
</script>

<template>
  <div :class="[CONTAINER_CLASS, $props.class]">
    <slot />
  </div>
</template>