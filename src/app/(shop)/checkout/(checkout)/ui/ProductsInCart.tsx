'use client';

import { ProductImage } from '@/components';
import { titleFont } from '@/config/fonts';
import { useCartStore } from '@/store';
import { currencyFormat } from '@/utils';
import { useEffect, useState } from 'react';

export const ProductsInCart = () => {

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
                                <span
                                    className={`${titleFont.className} font-semibold`}>
                                    {product.size} - {product.title} ({product.quantity})
                                </span>
                                <p className="font-semibold">{currencyFormat(product.price * product.quantity)}</p>
                            </div>
                        </div>
                    </div>
                </div >
            ))}
        </>
    );
};
