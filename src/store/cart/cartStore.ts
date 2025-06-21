import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartProduct } from '@/interfaces';

interface State {
    cart: CartProduct[];

    getTotalItems: () => number;
    getSumaryInformation: () => {
        subtotal: number;
        tax: number;
        total: number;
        itemsInCart: number;
    };

    addProductToCart: (product: CartProduct) => void;
    updateProductQuantity: (product: CartProduct, quantity: number) => void;
    removeProductFromCart: (product: CartProduct) => void;
    clearCart: () => void;
};

export const useCartStore = create<State>()(

    persist(
        (set, get) => ({
            cart: [],

            getTotalItems: () => {
                const { cart } = get();
                return cart.reduce((total, item) => total + item.quantity, 0);
            },
            //
            getSumaryInformation: () => {

                const { cart } = get();

                const subtotal = cart.reduce((subtotal, product) => (product.price * product.quantity) + subtotal, 0);

                const tax = subtotal * 0.18;

                const total = subtotal + tax;

                const itemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

                return {
                    subtotal, tax, total, itemsInCart
                };
            },
            addProductToCart: (product: CartProduct) => {

                const { cart } = get();

                //* 1. Revisar si el producto existe en el carrito con la talla seleccionada
                const productInCart = cart.some(
                    (item) => (item.id === product.id && item.size === product.size)
                );

                if (!productInCart) {
                    set({ cart: [...cart, product] });
                    return;
                };

                //* 2. Se que el producto existe por talla, tengo que incrementarlo
                const updatedCartProducts = cart.map((item) => {
                    if (item.id === product.id && item.size === product.size) {
                        return { ...item, quantity: item.quantity + product.quantity };
                    };
                    return item;
                });
                set({ cart: updatedCartProducts });
            },

            updateProductQuantity: (product: CartProduct, quantity: number) => {

                const { cart } = get();

                const updateQuantityProducts = cart.map((item) => {

                    if (product.id === item.id && item.size === product.size) {
                        return { ...item, quantity };
                    };

                    return item;
                });

                set({ cart: updateQuantityProducts });
            },
            removeProductFromCart: (product: CartProduct) => {

                const { cart } = get();

                const updateProductsInCart = cart.filter((item) => item.id !== product.id || item.size !== product.size);

                set({ cart: updateProductsInCart });

            },
            clearCart: () => {
                set({ cart: [] })
            }
        })
        , {
            name: 'shopping-cart',
        }
    ),
);