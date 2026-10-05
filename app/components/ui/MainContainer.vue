<script setup lang="ts">
defineProps<{
  class?: string;
}>();
</script>

<template>
  <div :class="['w-full', $props.class]">
    <slot />
  </div>
</template>
