
<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { NAVIGATION_ITEMS } from '~/Data/DummyNavigation';
import Button from '~/components/ui/Button.vue';

const emit = defineEmits(['openSearch', 'openWishlist', 'openCart']);

const isDesktop = computed(() => typeof window !== 'undefined' ? window.innerWidth >= 1280 : false);
const openMegaMenuId = ref<number | null>(null);
const isMobileNavOpen = ref(false);
const navRef = ref<HTMLElement | null>(null);

const isMegaMenuOpen = (id: number) => openMegaMenuId.value === id;

const openMegaMenu = (id: number) => {
  if (isDesktop.value) {
    openMegaMenuId.value = id;
  }
};

const closeMegaMenu = () => {       
  openMegaMenuId.value = null;
};

const toggleMegaMenu = (id: number) => {
  if (openMegaMenuId.value === id) {
    closeMegaMenu();
  } else {
    openMegaMenuId.value = id;
  }
};

const handleClickOutside = (event: MouseEvent) => {
  if (navRef.value && !navRef.value.contains(event.target as Node)) {
    closeMegaMenu();
  }
};

const route = useRoute();
watch(() => route.fullPath, () => {
  closeMegaMenu();
});

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

const cartItemCount = computed(() => 0);

// const openSearchModal: any

</script>

<template>
  <header
    class="sticky top-0 z-50 w-full border-b border-black/10 bg-white/95 backdrop-blur-xl transition-all duration-300 ease-in-out"
  >
    <MainContainer>
      <Container
        data-testid="desktop-navigation"
        class="mx-auto flex max-w-[1600px] items-center justify-between px-[16px] tablet:px-[30px] desktop:px-[100px]"
      >
        <div class="flex items-center">
          <NuxtLink
            to="/"
            aria-label="Home page"
            class="focus-visible:ring-offset-bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/50"
          >
            <Logo />
          </NuxtLink>
        </div>
        <nav ref="navRef" class="hidden flex-1 items-center justify-center gap-[42px] desktop:flex desktop:gap-[60px]">
          <template v-for="(item, index) in NAVIGATION_ITEMS" :key="item.id">
            <div v-if="item.children && item.children.length" class="relative">
              <div class="flex items-center gap-1">
                <NuxtLink
                  v-if="item.href"
                  :to="item.href"
                  class="text-xs uppercase tracking-wide text-black transition-colors duration-300 hover:text-brand-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/50"
                >
                  {{ item.title }}
                </NuxtLink>
                <span
                  v-else
                  class="text-xs uppercase tracking-wide text-black transition-colors duration-300 hover:text-brand-green"
                >
                  {{ item.title }}
                </span>

                <button
                  type="button"
                  :aria-expanded="isMegaMenuOpen(item.id)"  
                  :aria-controls="`mega-menu-${item.id}`"
                  :id="`mega-menu-trigger-${item.id}`"
                  :aria-label="`Toggle ${item.title} menu`"
                  @click="toggleMegaMenu(item.id)"
                  class="flex items-center justify-center p-0.5 text-black transition-colors hover:text-brand-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/50 cursor-pointer"
                >
                  <Icon
                    name="chevron-down"
                    :class="[
                      'h-4 w-4 transition-transform duration-300',
                      isMegaMenuOpen(item.id) ? 'rotate-180 text-brand-green' : ''
                    ]"
                  />
                </button>
              </div>
              <transition
                name="fade"
              >
                <div
                  v-if="isMegaMenuOpen(item.id)"
                  :id="`mega-menu-${item.id}`"
                  :aria-labelledby="`mega-menu-trigger-${item.id}`"
                  class="pointer-events-auto absolute top-full left-0 z-50 mt-1 min-w-[742px] max-w-[1126px] rounded-[20px] border border-black/10 bg-[#F8F9FA] p-8 shadow-2xl"
                >
                  <div class="grid grid-cols-1 gap-8 desktop:grid-cols-3">
                    <!-- Left Section - Mega Menu Image -->
                    <div class="col-span-1 hidden desktop:block">
                      <div class="h-[324px] w-full overflow-hidden rounded-xl">
                        <NuxtImg
                          :src="`/mega-menu-${item.id}.png`"
                          :alt="`${item.title} Collection`"
                          width="446"
                          height="659"
                          class="h-full w-full object-cover object-top"
                        />
                      </div>
                      <div class="mt-4">
                        <Button class="w-full !py-3" variant="primary">
                          Shop The Collection
                        </Button>
                      </div>
                    </div>
                    <!-- Right Section - Mega Menu Links -->
                    <div class="col-span-2">
                      <div class="grid grid-cols-1 gap-y-4 tablet:grid-cols-2">
                        <template
                          v-for="(child, childIndex) in item.children"
                          :key="childIndex"
                        >
                          <NuxtLink
                            :to="child.href"
                            :aria-label="child.title"
                            class="group flex items-center gap-3 rounded-lg px-4 py-2 text-xs font-normal tracking-wide text-black transition-all duration-200 hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/50"
                          >
                            <!-- Chevron -->
                            <Icon
                              name="chevron-right"
                              class="h-4 w-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-hover:text-brand-green"
                            />
                            <!-- Link Text -->
                            <span
                              class="transition-colors duration-200 group-hover:text-brand-green"
                            >
                              {{ child.title }}
                            </span>
                          </NuxtLink>
                        </template>
                      </div>
                    </div>
                  </div>
                </div>
              </transition>
            </div>
            <div v-else>
              <!-- Regular Navigation Link -->
              <NuxtLink
                :to="item.href"
                :aria-label="item.title"
                class="text-xs uppercase tracking-wide text-black transition-colors duration-300 hover:text-brand-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/50"
              >
                {{ item.title }}
              </NuxtLink>
            </div>
            <!-- Divider -->
            <div v-if="index !== NAVIGATION_ITEMS.length - 1" class="hidden h-4 w-px bg-black/10 desktop:block" />
          </template>
        </nav>
        <!-- Icons -->
        <div class="flex items-center gap-[15px]">
          <button
            class="icon-wrapper"
            aria-label="Search"
          >
            <Icon name="search" />
          </button>
          <button
            class="icon-wrapper"
            aria-label="Wishlist"
          >
            <Icon name="heart" />
          </button>
          <button
            class="relative icon-wrapper"
            aria-label="Shopping Cart"
          >
            <Icon name="shopping-bag" />
            <div
              v-if="cartItemCount > 0"
              class="absolute -right-1.5 -top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-brand-green text-[10px] font-bold leading-none text-white"
            >
              {{ cartItemCount }}
            </div>
          </button>
        </div>
      </Container>
    </MainContainer>
  </header>
</template>