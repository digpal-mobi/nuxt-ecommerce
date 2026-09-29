<script setup lang="ts">
import { useCartStore } from '~/pinia/cart';
const cartStore = useCartStore();

const { cartItems, cartTotalAmount } = storeToRefs(cartStore);

console.log("cartitems", cartItems)


</script>

<template>
    <section class="flex w-full items-center justify-center  mt-6 gap-4">
       <div class="flex w-full flex-col items-center justify-center">
         <div class="w-full flex md:w-2/3">
            <h2 class="text-2xl flex font-bold">Cart</h2>
        </div>

        <div class="w-full flex items-center justify-center  md:w-1/3">
            <h2>Summary</h2>
            <div v-for="cart in cartItems">
                <div>
                    <p>{{ cart.title }}</p>
                    <p>{{ cart.quantity }}</p>
                    <p>{{ cart.price * cart.quantity }}</p>
                </div>
            </div>
            <div>
                <p>Total: {{ cartTotalAmount }}</p>
            </div>
        </div>
       </div>
    </section>
</template>