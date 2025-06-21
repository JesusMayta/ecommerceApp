'use client';

import { useCartStore } from '@/store';
import { useState, useEffect } from 'react';
import { currencyFormat } from '../../utils/currencyFormat';
import Link from 'next/link';
import { IoCardOutline } from 'react-icons/io5';

export const OrderSumary = () => {

    const [loaded, setLoaded] = useState<boolean>(false);
    const { subtotal, total, tax, itemsInCart } = useCartStore(state => state.getSumaryInformation());

    useEffect(() => {
        setLoaded(true);
    }, []);

    if (!loaded) {
        return <p className="text-lg font-semibold text-center duration-300 animate-pulse">Cargando...</p>
    };

    return (
        <div>
            <div className="flex justify-between py-4 text-xs border-b border-gray-300 lg:text-sm xl:text-base lg:gap-48">
                <p className="font-semibold xl:font-medium">N° Productos <span className="font-light">({itemsInCart})</span></p>
                <p className="font-medium xl:font-semibold">{itemsInCart} productos</p>
            </div>

            <div className="flex justify-between py-4 text-xs border-b border-gray-300 lg:text-sm xl:text-base">
                <p className="font-semibold xl:font-medium">Subtotal </p>
                <p className="font-medium xl:font-semibold">{currencyFormat(subtotal)}</p>
            </div>

            <div className="flex justify-between py-4 text-xs border-b border-gray-300 lg:text-sm xl:text-base">
                <p className="font-semibold xl:font-medium">Impuestos <span className="font-light">(18%)</span></p>
                <p className="font-medium xl:font-semibold">{currencyFormat(tax)}</p>
            </div>

            <div className="flex justify-between py-4 text-xs lg:text-sm xl:text-base">
                <p className="font-semibold xl:font-medium">Total:</p>
                <p className="font-medium xl:font-semibold">{currencyFormat(total)}</p>
            </div>


            <Link
                href="/checkout/address"
                className="flex justify-center items-center py-3 my-2 w-full text-white bg-blue-700 rounded-md shadow-lg duration-300 shadow-blue-900 hover:shadow-md hover:shadow-blue-900">
                <IoCardOutline size={22} />
                <span className="ml-2 text-sm font-semibold xl:text-base">Continuar compra</span>
            </Link>
        </div>
    )
}
