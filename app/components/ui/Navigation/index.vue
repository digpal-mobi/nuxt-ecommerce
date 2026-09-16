<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { NAVIGATION_ITEMS } from '~/Data/DummyNavigation';
import Container from '~/components/ui/Container.vue';
import MainContainer from '~/components/ui/MainContainer.vue';
import LazyImage from '~/components/ui/LazyImage.vue';

const isMobileMenuOpen = ref(false);
const isProfileMenuOpen = ref(false);
const activeDropdownId = ref<number | null>(null);
const searchQuery = ref('');
const cartItemCount = ref(0);
const wishlistCount = ref(0);

const profileMenuRef = ref<HTMLElement | null>(null);
const desktopNavRef = ref<HTMLElement | null>(null);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => { 
  isMobileMenuOpen.value = false;
};

const toggleProfileMenu = () => {
  isProfileMenuOpen.value = !isProfileMenuOpen.value;
};

const toggleDropdown = (id: number) => {
  activeDropdownId.value = activeDropdownId.value === id ? null : id;
};

const handleClickOutside = (event: MouseEvent) => {
  if (
    profileMenuRef.value &&
    !profileMenuRef.value.contains(event.target as Node)
  ) {
    isProfileMenuOpen.value = false;
  }
  if (
    desktopNavRef.value &&
    !desktopNavRef.value.contains(event.target as Node)
  ) {
    activeDropdownId.value = null;
  }
};

const route = useRoute();
watch(() => route.fullPath, () => {
  activeDropdownId.value = null;
  isMobileMenuOpen.value = false;
  isProfileMenuOpen.value = false;
});

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <header class="sticky top-0 z-50 w-full bg-white shadow-xs">
    <!-- Top Announcement Bar -->
    <div class="bg-black py-2 text-center text-xs text-white">
      <MainContainer>
        <Container class="!py-0">
          <div class="flex items-center justify-center gap-1 text-[12px] font-normal laptop:text-[14px]">
            <span>Sign up and get 20% off to your first order.</span>
            <NuxtLink to="/shop" class="font-medium underline hover:text-gray-300">
              Sign Up Now
            </NuxtLink>
          </div>
        </Container>
      </MainContainer>
    </div>

    <div class="hidden laptop:block">
      <MainContainer>
        <Container class="!py-0 laptop:px-[100px] px-[16px]">
          <div class="flex items-center justify-between py-5">
            <div class="flex items-center gap-10">
              <NuxtLink to="/" aria-label="SHOP.CO Homepage" class="shrink-0">
                <LazyImage
                  src="/shop-logo.png"
                  alt="SHOP.CO"
                  :width="160"
                  :height="22"
                  class="h-auto w-[160px] object-contain"
                />
              </NuxtLink>

              <nav ref="desktopNavRef" class="flex items-center gap-6">
                <template v-for="item in NAVIGATION_ITEMS" :key="item.id">
                  <div
                    v-if="item.children && item.children.length"
                    class="relative"
                  >
                    <div class="flex items-center gap-1">
                      <NuxtLink
                        v-if="item.href"
                        :to="item.href"
                        class="text-[16px] font-normal text-black transition-colors hover:text-black/70"
                      >
                        {{ item.title }}
                      </NuxtLink>
                      <span
                        v-else
                        class="text-[16px] font-normal text-black transition-colors hover:text-black/70"
                      >
                        {{ item.title }}
                      </span>

                      <button
                        type="button"
                        :aria-expanded="activeDropdownId === item.id"
                        :aria-label="`Toggle ${item.title} menu`"
                        @click.stop="toggleDropdown(item.id)"
                        @mouseenter="activeDropdownId = item.id"
                        @mouseleave="activeDropdownId = null"
                        class="flex items-center p-1 text-black transition-colors hover:text-black/70 cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-4 w-4 transition-transform duration-200"
                          :class="activeDropdownId === item.id ? 'rotate-180' : ''"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>

                    <transition
                      enter-active-class="transition ease-out duration-150"
                      enter-from-class="opacity-0 translate-y-1"
                      enter-to-class="opacity-100 translate-y-0"
                      leave-active-class="transition ease-in duration-100"
                      leave-from-class="opacity-100 translate-y-0"
                      leave-to-class="opacity-0 translate-y-1"
                    >
                      <div
                        v-if="activeDropdownId === item.id"
                        class="absolute left-0 top-full z-50 mt-2 w-52 rounded-xl border border-black/10 bg-white p-2 shadow-xl"
                      >
                        <NuxtLink
                          v-for="(child, cIdx) in item.children"
                          :key="cIdx"
                          :to="child.href"
                          class="block rounded-lg px-4 py-2 text-[14px] text-black transition-colors hover:bg-[#F0F0F0]"
                          @click="activeDropdownId = null"
                        >
                          {{ child.title }}
                        </NuxtLink>
                      </div>
                    </transition>
                  </div>
                  
                  <NuxtLink
                    v-else
                    :to="item.href"
                    class="text-[16px] font-normal text-black transition-colors hover:text-black/70"
                  >
                    {{ item.title }}
                  </NuxtLink>
                </template>
              </nav>
            </div>

            <div class="flex items-center gap-8">
              <div class="relative w-[280px] desktop:w-[400px]">
                <span class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-black/40">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </span>
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Search for products..."
                  class="w-full rounded-full bg-[#F0F0F0] py-2.5 pl-12 pr-4 text-[14px] text-black outline-none transition-all placeholder:text-black/40 focus:ring-1 focus:ring-black/20"
                />
              </div>

              <div class="flex items-center gap-4">
                <NuxtLink
                  to="/wishlist"
                  aria-label="Wishlist"
                  class="relative p-1 text-black transition-transform hover:scale-110"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                  <span
                    v-if="wishlistCount > 0"
                    class="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white"
                  >
                    {{ wishlistCount }}
                  </span>
                </NuxtLink>

                <!-- Cart -->
                <NuxtLink
                  to="/cart"
                  aria-label="Shopping Cart"
                  class="relative p-1 text-black transition-transform hover:scale-110"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span
                    v-if="cartItemCount > 0"
                    class="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white"
                  >
                    {{ cartItemCount }}
                  </span>
                </NuxtLink>

                <!-- User Profile Dropdown -->
                <div ref="profileMenuRef" class="relative">
                  <button
                    type="button"
                    aria-label="User Profile"
                    class="flex items-center p-1 text-black transition-transform hover:scale-110 focus:outline-none"
                    @click="toggleProfileMenu"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </button>

                  <transition
                    enter-active-class="transition ease-out duration-150"
                    enter-from-class="opacity-0 scale-95"
                    enter-to-class="opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-100"
                    leave-from-class="opacity-100 scale-100"
                    leave-to-class="opacity-0 scale-95"
                  >
                    <div
                      v-if="isProfileMenuOpen"
                      class="absolute right-0 top-full mt-2 w-48 rounded-xl border border-black/10 bg-white py-2 shadow-xl ring-1 ring-black/5"
                    >
                      <NuxtLink
                        to="/profile"
                        class="block px-4 py-2 text-[14px] text-black hover:bg-[#F0F0F0]"
                        @click="isProfileMenuOpen = false"
                      >
                        Profile
                      </NuxtLink>
                      <NuxtLink
                        to="/orders"
                        class="block px-4 py-2 text-[14px] text-black hover:bg-[#F0F0F0]"
                        @click="isProfileMenuOpen = false"
                      >
                        Orders
                      </NuxtLink>
                      <hr class="my-1 border-gray-100" />
                      <NuxtLink
                        to="/login"
                        class="block px-4 py-2 text-[14px] text-black hover:bg-[#F0F0F0]"
                        @click="isProfileMenuOpen = false"
                      >
                        Sign In / Register
                      </NuxtLink>
                    </div>
                  </transition>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </MainContainer>
    </div>

    <!-- Mobile Navigation Bar -->
    <div class="block laptop:hidden">
      <MainContainer>
        <Container class="!py-0 px-[16px]">
          <div class="flex items-center justify-between py-4">
            <!-- Left: Hamburger & Logo -->
            <div class="flex items-center gap-4">
              <button
                type="button"
                aria-label="Toggle navigation menu"
                class="p-1 text-black focus:outline-none"
                @click="toggleMobileMenu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              <NuxtLink to="/" aria-label="SHOP.CO Homepage">
                <LazyImage
                  src="/shop-logo.png"
                  alt="SHOP.CO"
                  :width="126"
                  :height="18"
                  class="h-auto w-[126px] object-contain"
                />
              </NuxtLink>
            </div>

            <!-- Right: Action Icons -->
            <div class="flex items-center gap-3">
              <NuxtLink to="/search" aria-label="Search" class="p-1 text-black">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </NuxtLink>

              <NuxtLink to="/cart" aria-label="Shopping Cart" class="relative p-1 text-black">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span
                  v-if="cartItemCount > 0"
                  class="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-black text-[9px] font-bold text-white"
                >
                  {{ cartItemCount }}
                </span>
              </NuxtLink>

              <NuxtLink to="/profile" aria-label="Profile" class="p-1 text-black">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </NuxtLink>
            </div>
          </div>
        </Container>
      </MainContainer>
    </div>

    <!-- Mobile Drawer -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-x-full"
      enter-to-class="opacity-100 translate-x-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-x-0"
      leave-to-class="opacity-0 -translate-x-full"
    >
      <div
        v-if="isMobileMenuOpen"
        class="fixed inset-0 z-50 flex"
      >
        <!-- Overlay -->
        <div
          class="fixed inset-0 bg-black/50"
          @click="closeMobileMenu"
        />

        <!-- Sidebar Content -->
        <div class="relative flex h-full w-4/5 max-w-[320px] flex-col bg-white p-6 shadow-2xl z-10 overflow-y-auto">
          <div class="flex items-center justify-between pb-6 border-b border-gray-100">
            <LazyImage
              src="/shop-logo.png"
              alt="SHOP.CO"
              :width="126"
              :height="18"
              class="h-auto w-[126px]"
            />
            <button
              type="button"
              aria-label="Close menu"
              class="p-1 text-black"
              @click="closeMobileMenu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Mobile Nav Links -->
          <nav class="flex flex-col gap-2 pt-6">
            <template v-for="item in NAVIGATION_ITEMS" :key="item.id">
              <div v-if="item.children && item.children.length">
                <button
                  type="button"
                  class="flex w-full items-center justify-between py-3 text-[16px] font-medium text-black"
                  @click="toggleDropdown(item.id)"
                >
                  <span>{{ item.title }}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 transition-transform"
                    :class="activeDropdownId === item.id ? 'rotate-180' : ''"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  v-if="activeDropdownId === item.id"
                  class="flex flex-col gap-2 pl-4 pb-2"
                >
                  <NuxtLink
                    v-for="(child, cIdx) in item.children"
                    :key="cIdx"
                    :to="child.href"
                    class="py-2 text-[14px] text-black/70 hover:text-black"
                    @click="closeMobileMenu"
                  >
                    {{ child.title }}
                  </NuxtLink>
                </div>
              </div>
              <NuxtLink
                v-else
                :to="item.href"
                class="py-3 text-[16px] font-medium text-black hover:text-black/70"
                @click="closeMobileMenu"
              >
                {{ item.title }}
              </NuxtLink>
            </template>
          </nav>
        </div>
      </div>
    </transition>
  </header>
</template>
