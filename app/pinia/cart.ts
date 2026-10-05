import {defineStore} from 'pinia';
import type { Product } from '~/types/product';

interface CartItem extends Product {
    quantity: number;
}

interface CartState {
    items: CartItem[];
    isMiniCartOpen: boolean;
    wishlistedItems: Product[];
    isWishlist: boolean;
}

export const useCartStore = defineStore('cart', {
    state: (): CartState => ({
        items: [],
        isMiniCartOpen: false,
        wishlistedItems: [],
        isWishlist: false
    }),
        getters: {
        isCartEmpty(state): boolean {
            return state.items.length === 0;
        },
        cartItems(state): CartItem[] {
            return state.items;
        },
        totalQuantity(state): number {
            return state.items.reduce((total, item) => total + item.quantity, 0); // using reduce to calculate the total quantity
        },
        totalAmount(state): number {
            return state.items.reduce((total, item) => total + item.price * item.quantity, 0); // using reduce to calculate the total amount
        },
        wishlistQuantity(state): number {
            return state.wishlistedItems.length;
        }
    },
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
      const existingItem = this.items.find(
        item => item.id === product.id
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.items.push({
          ...product,
          quantity,
        });
      }

      this.openMiniCart();
    },
    updateQuantity(productId: number | string, quantity: number) {
      const item = this.items.find(item => item.id === productId);

      if (!item) return;

      if (quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        item.quantity = quantity;
      }
    },
    updateCart(productId: number | string, quantity: number) {
      this.updateQuantity(productId, quantity);
    },
        removeFromCart(productId: number | string) {
      this.items = this.items.filter(
        item => item.id !== productId
      );
    },

        clearCart(){
            this.items = [];
        },
        clearWishlistItems(){
            this.wishlistedItems = [];
            this.isWishlist = false;
        }
    },
    
})