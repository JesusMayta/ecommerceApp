'use client';

import { MenuInCart, ProductImage, QuantitySelector } from '@/components';
import { titleFont } from '@/config/fonts';
import { useCartStore } from '@/store';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { PiEmpty } from 'react-icons/pi';


export const ProductsCart = () => {

    const updateProductQuantity = useCartStore(state => state.updateProductQuantity);
    const productsInCart = useCartStore(state => state.cart);
    const [loaded, setLoaded] = useState<boolean>(false);

    useEffect(() => {
        setLoaded(true)
    }, []);

    if (!loaded) {
        return <p className="text-lg font-semibold text-center duration-300 animate-pulse">Cargando...</p>
    };

    return (
        <>
            {(productsInCart.length > 0) ?
                <>
                    <h2 className="pb-3 text-xs lg:text-sm">Vendido por <span className="font-bold">Virtual Shop</span></h2>
                    {productsInCart.map(product => (
                        <div key={`${product.slug}-${product.size}`} className="pt-5 pb-3 border-t border-gray-300">
                            <div className="flex flex-row gap-2 justify-between items-start w-full">

                                <div className="flex flex-row gap-3 justify-start w-11/12">
                                    <ProductImage
                                        src={product.image}
                                        className="object-cover w-12 h-12 rounded-md border border-gray-300 lg:w-16 xl:w-24 lg:h-16 xl:h-24"
                                        width={70}
                                        height={70}
                                        alt={product.title}
                                    />
                                    <div className="flex flex-col justify-center text-xs lg:text-sm xl:text-base">
                                        <Link
                                            href={`/product/${product.slug}`}
                                            className={`${titleFont.className} font-semibold hover:underline`}>
                                            {product.title}
                                        </Link>
                                        <p className="text-sm">Talla: <span className="font-semibold">{product.size}</span></p>
                                    </div>
                                </div>

                                <MenuInCart
                                    product={product}
                                />

                            </div>

                            <div className="flex justify-between items-center px-1 mt-3 w-full lg:mt-5">
                                <p className="text-xs font-semibold lg:text-sm xl:text-base">S/. {product.price.toFixed(2)}</p>
                                <QuantitySelector
                                    quantity={product.quantity}
                                    onQuantityChanged={(quantity) => updateProductQuantity(product, quantity)} />
                            </div>
                        </div >
                    ))}
                </> :
                <div className="py-8 w-full lg:py-28">
                    <div className="flex flex-row justify-center items-center">
                        <PiEmpty className="w-8 h-8 lg:w-10 lg:h-10" />
                        <p className="ml-3 text-base font-semibold lg:text-2xl xl:text-3xl">Tu carrito esta vacío</p>
                    </div>
                    <div className="flex justify-center mt-4">
                        <Link
                            href="/"
                            className="px-4 py-2 text-sm font-semibold text-white rounded-md shadow-lg duration-300 bg-gray-950 shadow-gray-700 hover:shadow-gray-500"
                        >
                            Ver productos
                        </Link>
                    </div>
                </div>
            }
        </>
    );
};
