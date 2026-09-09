<script setup lang="ts">
const CONTAINER_CLASS = "mx-auto w-full max-w-[1920px]";

defineProps<{
  class?: string;
}>();
</script>

<template>
  <div :class="[CONTAINER_CLASS, $props.class]">
    <slot />
  </div>
</template>
