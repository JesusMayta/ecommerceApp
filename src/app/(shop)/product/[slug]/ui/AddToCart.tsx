'use client';

import { useState } from 'react';
import { IoAlertCircle, IoCart } from 'react-icons/io5';
import { SizeSelector, QuantitySelector } from '@/components';
import type { CartProduct, Product, Size } from '@/interfaces';
import { useCartStore } from '@/store';

interface Props {
    product: Product;
};

export const AddToCart = ({ product }: Props) => {

    const addProductToCart = useCartStore(state => state.addProductToCart);

    const [size, setSize] = useState<Size | undefined>();
    const [quantity, setQuantity] = useState<number>(1);
    const [posted, setPosted] = useState<boolean>(false);

    const addToCart = () => {

        setPosted(true);

        if (!size) return;

        const cartProduct: CartProduct = {
            id: product.id,
            slug: product.slug,
            title: product.title,
            price: product.price,
            quantity,
            size,
            image: product.images[0]
        };

        addProductToCart(cartProduct);
        setPosted(false);
        setQuantity(1);
        setSize(undefined);
    };

    return (
        <>
            {/* Selector de tallas */}
            <SizeSelector
                selectedSize={size}
                availableSizes={product.sizes}
                onSizeChanged={setSize}
            />

            {posted && !size && (
                <p className="flex gap-1 items-center mb-4 text-sm font-medium text-red-500 fade-in">
                    <IoAlertCircle size={17} />
                    <span>Debe seleccionar una talla</span>
                </p>
            )}

            {/* Selector de cantidad */}
            <h3 className="mb-4 font-bold">Cantidad:</h3>
            <QuantitySelector
                quantity={quantity}
                onQuantityChanged={setQuantity}
            />

            <button
                onClick={addToCart}
                className="flex px-8 py-2 my-7 text-white bg-blue-600 rounded-lg shadow-lg duration-300 shadow-blue-800 hover:shadow-md hover:shadow-blue-950">
                <IoCart size={20} />
                <span className="ml-2 text-sm font-semibold">Agregar al carrito</span>
            </button>
        </>
    )
}
