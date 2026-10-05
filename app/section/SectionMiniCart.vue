<script setup lang="ts">
import Increment from '~/components/ui/Increment.vue';
import { useCartStore } from '~/pinia/cart';
import Icons from '~/utils/Icons.vue';

const cartStore = useCartStore();
const { cartItems } = storeToRefs(cartStore);

const handleQuantityChange = (productId: number | string, value: number) => {
  cartStore.updateQuantity(productId, value);
};
</script>

<template>
  <Teleport to="body">
  <div
    v-if="cartStore.isMiniCartOpen"
    class="fixed inset-0 z-50 flex justify-end"
  >
    <!-- Overlay -->
    <div
      class="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
      @click="cartStore.closeMiniCart"
    />

    <!-- Drawer -->
    <div
      class="mini-cart-panel relative z-10 flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
    >
      <!-- Header -->
      <div
        class="flex items-center justify-between border-b border-gray-200 px-6 py-5"
      >
        <div class="flex items-center gap-3">
          <div
            class="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100"
          >
            <Icons name="cartsIcon" :size="22" />
          </div>

          <div>
            <h2 class="text-lg font-semibold text-gray-900">
              Shopping Cart
            </h2>

            <p class="text-sm text-gray-500">
              {{ cartStore.items.length }}
              {{ cartStore.items.length === 1 ? 'item' : 'items' }}
            </p>
          </div>
        </div>

        <button
          type="button"
          class="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-black"
          @click="cartStore.closeMiniCart"
        >
          <Icons name="crossIcon" :size="22" />
        </button>
      </div>
      <div
        v-if="cartItems.length === 0"
        class="flex flex-1 flex-col items-center justify-center px-6 text-center"
      >
        <div
          class="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100"
        >
          <Icons name="cartsIcon" :size="32" />
        </div>

        <h3 class="text-lg font-semibold text-gray-900">
          Your cart is empty
        </h3>

        <p class="mt-2 max-w-[280px] text-sm leading-5 text-gray-500">
          Nothing to show here. Add some products to your cart and they will
          appear here.
        </p>

        <button
          type="button"
          class="mt-6 cursor-pointer rounded-lg bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
          @click="cartStore.closeMiniCart"
        >
          Continue Shopping
        </button>
      </div>
      <template v-else>
        <!-- Cart Items -->
        <div class="mt-[30px] flex-1 overflow-y-auto px-6 py-5">
          <div
            v-for="cart in cartItems"
            :key="cart.id"
            class="flex gap-4 border-b border-gray-100 py-5 first:pt-0 last:border-b-0"
          >
            <!-- Product Image -->
            <div
              class="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-100"
            >
              <img
                :src="cart.thumbnail"
                :alt="cart.title"
                class="h-full w-full object-cover"
              />
            </div>

            <!-- Product Details -->
            <div class="flex min-w-0 flex-1 flex-col">
              <div class="flex items-start justify-between gap-3">
                <h3
                  class="line-clamp-2 text-sm font-medium leading-5 text-gray-900"
                >
                  {{ cart.title }}
                </h3>

                <button
                  type="button"
                  class="shrink-0 cursor-pointer text-gray-400 transition hover:text-red-500"
                  @click="cartStore.removeFromCart(cart.id)"
                >
                  <Icons name="crossIcon" :size="20" />
                </button>
              </div>

              <p class="mt-1 text-sm text-gray-500">
                ${{ cart.price.toFixed(2) }}
              </p>

              <!-- Quantity + Total -->
              <div class="mt-auto flex items-center justify-between pt-3">
                <!-- Quantity -->
               <Increment 
               :value="cart.quantity"
               @change="(value) => handleQuantityChange(cart.id, value)"
               class="!h-[46px] !min-w-[95px] shrink-0 !px-[12px]"
               />

                <!-- Item Total -->
                <span class="text-sm font-semibold text-gray-900">
                  ${{ (cart.price * cart.quantity).toFixed(2) }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div
          class="border-t border-gray-200 bg-white px-6 py-5"
        >
          <!-- Subtotal -->
          <div class="mb-4 flex items-center justify-between">
            <p class="text-base font-medium text-gray-900">
              Subtotal
            </p>

            <p class="text-lg font-semibold text-gray-900">
              ${{ cartStore.totalAmount.toFixed(2) }}
            </p>
          </div>

          <p class="mb-4 text-xs text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>

          <!-- Checkout -->
          <button
            type="button"
            class="w-full cursor-pointer rounded-lg bg-black px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            Proceed to Checkout
          </button>

          <!-- Continue Shopping -->
          <button
            type="button"
            class="mt-3 w-full cursor-pointer rounded-lg border border-gray-300 px-5 py-3.5 text-sm font-medium text-gray-900 transition hover:bg-gray-50"
            @click="cartStore.closeMiniCart"
          >
            Continue Shopping
          </button>
        </div>
      </template>
    </div>
  </div>
</Teleport>
</template>
<style scoped>
.mini-cart-enter-active,
.mini-cart-leave-active {
  transition: opacity 0.3s ease;
}

.mini-cart-enter-active .mini-cart-panel {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.mini-cart-leave-active .mini-cart-panel {
  transition: transform 0.3s ease-in;
}

.mini-cart-enter-from,
.mini-cart-leave-to {
  opacity: 0;
}

.mini-cart-enter-from .mini-cart-panel,
.mini-cart-leave-to .mini-cart-panel {
  transform: translateX(100%);
}
</style>