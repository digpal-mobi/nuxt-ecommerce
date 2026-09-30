import {defineStore} from 'pinia';
import type { Product } from '~/types/product';

interface CartItem extends Product {
    quantity: number;
}

interface CartState {
    items: CartItem[];
    totalQuantity: number;
    totalAmount: number;
    isMiniCartOpen: boolean;
    wishlistedItems: Product[];
    isWishlist: boolean;
}

export const useCartStore = defineStore('cart', {
    state: (): CartState => ({
        items: [],
        totalQuantity: 0,
        totalAmount: 0,
        isMiniCartOpen: false,
        wishlistedItems: [],
        isWishlist: false
    }),
    actions: {
        openMiniCart() {
            this.isMiniCartOpen = true;
        },
        closeMiniCart() {
            this.isMiniCartOpen = false;
        },
        toggleMiniCart() {
            this.isMiniCartOpen = !this.isMiniCartOpen;
        },
        addToWishlist(product: Product){
            this.isWishlist = true;
            this.wishlistedItems.push(product);
        },
        removeFromWishlist(productId: number | string) {
            this.wishlistedItems = this.wishlistedItems.filter(item => item.id !== productId);
            this.isWishlist = false;
        },
        toggleWishlist(product: Product) {
            const existingItem = this.wishlistedItems.find(item => item.id === product.id);
            if (existingItem) {
                this.removeFromWishlist(product.id);
            } else {
                this.addToWishlist(product);
            }
        },
        addToCart(product: Product, quantity: number = 1) {
            const existingItem = this.items.find(item => item.id === product.id); // check if the item already exists in the cart

            if (existingItem) { // if the item exists, update the quantity
                existingItem.quantity += quantity;
            } else { // if the item does not exist, add it to the cart
                this.items.push({ ...product, quantity });
            }

            this.totalQuantity += quantity; // add the quantity to the total quantity
            this.totalAmount += product.price * quantity; // add the price to the total amount
            this.openMiniCart(); // open the mini cart
        },
        updateCart(productId: number | string, quantity: number) {
            const item = this.items.find(item => item.id === productId); // find the item in the cart

            if (!item) return; // if the item is not found, return
            
            const priceDifference = item.price * quantity - item.price * item.quantity; // calculate the price difference
            
            item.quantity = quantity; // update the quantity
            this.totalQuantity += quantity; // update the total quantity
            this.totalAmount += priceDifference; // update the total amount
        },
        removeFromCart(productId: number | string) {
            const item = this.items.find(item => item.id === productId); // find the item in the cart

            if (!item) return; // if the item is not found, return
            
            this.totalQuantity -= item.quantity; // subtract the quantity from the total quantity
            this.totalAmount -= item.price * item.quantity; // subtract the price from the total amount
            this.items = this.items.filter(item => item.id !== productId); // remove the item from the cart
        },
        clearCart(){
            this.items = [];
            this.totalQuantity = 0;
            this.totalAmount = 0;
            this.closeMiniCart();
        },
    },
    getters: {
        isCartEmpty(state): boolean {
            return state.items.length === 0;
        },
        cartItems(state): CartItem[] {
            return state.items;
        },
        cartTotalQuantity(state): number {
            return state.totalQuantity;
        },
        cartTotalAmount(state): number {
            return state.totalAmount;
        },
        wishlistQuantity(state): number {
            return state.wishlistedItems.length;
        }
    },
    
})