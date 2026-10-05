<script setup lang="ts">
import { computed } from 'vue';
import { useCartStore } from '~/pinia/cart';
import type { Product } from '~/types/product';
import Icons from '~/utils/Icons.vue';
import { CurrencyConverter } from '~/utils/currency';

const cartStore = useCartStore();

const items = computed(() => cartStore.wishlistedItems);
const currency = '$';

const handleAddAllToCart = () => {
  items.value.forEach((item) => {
    cartStore.addToCart(item, 1);
  });
};

const handleRemoveFromWishlist = (productId: number | string) => {
  cartStore.removeFromWishlist(productId);
};

const handleClearAll = () => {
  cartStore.clearWishlistItems();
};

const handleAddToCart = (item: Product) => {
  cartStore.addToCart(item, 1);
};
</script>

<template>
  <div class="pb-[80px]">
    <div
      class="flex flex-col justify-between gap-4 border-b border-[#000000]/10 pb-[24px] sm:flex-row sm:items-center"
    >
      <div>
        <TitleTag
          as="h1"
          variant="heading"
          class="!text-[28px] sm:!text-[36px]"
        >
          My Wishlist
        </TitleTag>

        <Paragraph
          variant="normalPara"
          class="mt-1 text-[#000000]/60"
        >
          {{ items.length }}
          {{ items.length === 1 ? 'item' : 'items' }}
          saved for later
        </Paragraph>
      </div>    

      <!-- Header Actions -->
      <div
        v-if="items.length > 0"
        class="flex items-center gap-3"
      >
        <Button
          variant="primary"
          class="gap-2 !px-[16px] !py-[10px] text-[14px]"
          @click="handleAddAllToCart"
        >
          <Icons name="cartsIcon" :size="16" />
          <span>Add All to Cart</span>
        </Button>

        <Button
          variant="secondary"
          class="cursor-pointer gap-2 !bg-red-50 !px-[16px] !py-[10px] text-[14px] !text-red-600 hover:!bg-red-100"
          @click="handleClearAll"
        >
          <Icons name="crossIcon" :size="14" color="#DC2626" />
          <span>Clear All</span>
        </Button>
      </div>
    </div>

    <div
      v-if="items.length > 0"
      class="mt-[32px] grid grid-cols-1 gap-[24px] sm:grid-cols-2 md:grid-cols-3 laptop:grid-cols-4"
    >
      <div
        v-for="item in items"
        :key="item.id"
        class="group relative flex flex-col justify-between rounded-[20px] border border-[#000000]/10 bg-white p-[16px] transition-all duration-300 hover:border-black/20 hover:shadow-lg"
      >
        <div>
          <div
            class="relative aspect-square w-full overflow-hidden rounded-[16px] bg-[#F0EEED]"
          >
            <NuxtLink
              :to="`/shop/${item.id}`"
              class="block h-full w-full"
            >
              <LazyImage
                :src="item.thumbnail"
                :alt="item.title || 'product image'"
                :fill="true"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </NuxtLink>

            <!-- Remove Wishlist -->
            <button
              type="button"
              aria-label="Remove from wishlist"
              class="absolute right-3 top-3 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/90 text-red-500 shadow-md backdrop-blur-sm transition-all hover:scale-110 hover:bg-white"
              @click="handleRemoveFromWishlist(item.id)"
            >
              <Icons
                name="wishlistIcon"
                :is-wishlisted="true"
                :size="18"
              />
            </button>

            <!-- Category -->
            <span
              v-if="item.category"
              class="absolute bottom-3 left-3 rounded-full bg-white/90 px-[10px] py-[3px] text-[11px] font-medium capitalize text-[#000000]/70 backdrop-blur-sm"
            >
              {{ item.category }}
            </span>
          </div>

          <div
            class="mt-[16px] flex flex-col items-start gap-1"
          >
            <!-- Title -->
            <NuxtLink
              :to="`/shop/${item.id}`"
              class="text-left hover:underline"
            >
              <TitleTag
                as="h3"
                variant="satoshiBold"
                class="line-clamp-1 !text-[16px] leading-[22px]"
              >
                {{ item.title }}
              </TitleTag>
            </NuxtLink>

            <!-- Rating -->
            <SectionRating
              v-if="item.rating !== undefined"
              :rating="item.rating"
            />

            <!-- Price -->
            <div class="mt-2">
              <Paragraph
                variant="boldPara"
                class="!text-[18px]"
              >
                {{ CurrencyConverter(item.price, currency) }}
              </Paragraph>
            </div>
          </div>
        </div>

        <div
          class="mt-[20px] flex items-center gap-2 border-t border-[#000000]/10 pt-2"
        >
          <Button
            variant="primary"
            class="w-full gap-2 !py-[10px] text-[14px]"
            @click="handleAddToCart(item)"
          >
            <Icons name="cartsIcon" :size="18" />
            <span>Add to Cart</span>
          </Button>
        </div>
      </div>
    </div>

    <div
      v-else
      class="flex flex-col items-center justify-center py-[80px] text-center"
    >
      <!-- Icon -->
      <div
        class="mb-6 flex h-[120px] w-[120px] items-center justify-center rounded-full bg-red-50"
      >
        <Icons
          name="wishlistIcon"
          :is-wishlisted="true"
          :size="56"
        />
      </div>

      <!-- Title -->
      <TitleTag
        as="h2"
        variant="heading"
        class="!text-[24px] sm:!text-[30px]"
      >
        Your Wishlist is Empty
      </TitleTag>

      <!-- Description -->
      <Paragraph
        variant="normalPara"
        class="mt-3 max-w-[440px] text-[15px] text-[#000000]/60"
      >
        Seems like you haven't added any items to your wishlist yet.
        Browse our catalog and save your favorites!
      </Paragraph>

      <!-- CTA -->
      <div class="mt-8">
        <NuxtLink to="/shop">
          <Button
            variant="primary"
            class="!px-[32px] !py-[14px]"
          >
            Explore Products
          </Button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>