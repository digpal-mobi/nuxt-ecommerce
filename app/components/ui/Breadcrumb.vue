<script lang="ts" setup>
import Icons from '~/utils/Icons.vue';


interface IBreadcrumb { 
    name: string;
    url?: string;
}

const props = withDefaults(
  defineProps<{
    items?: IBreadcrumb[];
  }>(),
  {
    items: () => [
      {
        name: "home",
        url: "/"
      },
      {
        name: "Shop",
      }
    ]
  }
);

function formatBreadcrumbLabel(name: string): string {
  if (!name) return "";
  if (name.includes("-") || name.includes("_")) {
    return name
      .split(/[-_]+/)
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }
  return name
    .split(" ")
    .map((word) => (word ? word.charAt(0).toUpperCase() + word.slice(1) : ""))
    .join(" ");
}
</script>

<template>
  <nav class="breadcrumb-wrapper" aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li v-for="(item, index) in props.items" :key="item.url || index" class="breadcrumb-item" :class="{ last: index === props.items.length - 1 }" >
        <NuxtLink v-if="item.url" :to="item.url" class="breadcrumb-link">
          {{ formatBreadcrumbLabel(item.name) }}
        </NuxtLink>
        <span v-else class="breadcrumb-current">
          {{ formatBreadcrumbLabel(item.name) }}
        </span>

        <span class="breadcrumb-separator" v-if="index !== props.items.length - 1">
            <Icons name="arrowRight" color="#000" />
        </span>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.breadcrumb-wrapper {
    padding: 20px 100px;
    max-width: 1440px;
    margin: 0 auto;
    display: flex;
    align-items: center;
}
.breadcrumb {
    list-style: none;
    display: flex;
    padding: 0;
    margin: 0;
}
.breadcrumb-item {
    margin: 0 5px 0 0;
    display: flex;
    align-items: center;
    gap: 5px;
}
.breadcrumb-link {
    text-decoration: none;
    color: #333;
    display: flex;
}

.breadcrumb-separator {
    display: flex;
    align-items: center;
    margin-top: 2px;
}
</style>