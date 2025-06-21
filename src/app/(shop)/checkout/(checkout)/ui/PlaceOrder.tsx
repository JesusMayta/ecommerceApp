'use client';

import { useEffect, useState } from 'react';
import { IoCardOutline } from 'react-icons/io5';
import { useAddressStore, useCartStore } from '@/store';
import { titleFont } from '@/config/fonts';
import { currencyFormat } from '../../../../../utils/currencyFormat';
import clsx from 'clsx';
import { placeOrder } from '@/actions';
import { useRouter } from 'next/navigation';

export const PlaceOrder = () => {

    const router = useRouter();
    const [loaded, setLoaded] = useState<boolean>(false);
    const [isPlacingOrder, setIsPlacingOrder] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<String>('');

    const address = useAddressStore(state => state.address);
    const { itemsInCart, subtotal, tax, total } = useCartStore(state => state.getSumaryInformation());
    const clearCart = useCartStore(state => state.clearCart);
    const cart = useCartStore(state => state.cart);

    useEffect(() => {
        setLoaded(true);
    }, []);

    const onPLaceOrder = async () => {
        setIsPlacingOrder(true);

        const productsToOrder = cart.map(product => ({
            productId: product.id,
            quantity: product.quantity,
            size: product.size,
        }));

        const resp = await placeOrder(productsToOrder, address);

        if (!resp.ok) {
            setIsPlacingOrder(false);
            setErrorMessage(resp.message);
            return;
        }

        setIsPlacingOrder(false);
        clearCart();
        router.replace('/orders/' + resp.order!.id);
    };

    if (!loaded) {
        return <p className="font-bold">
            Cargando...
        </p>
    };

    return (
        <div className="w-full lg:w-1/2 flex flex-col items-center">
            <h2 className={`${titleFont.className} font-bold text-xl lg:text-2xl xl:text-3xl`}>Resumen de la orden</h2>

            <div className="bg-white w-full lg:w-fit mt-8 lg:mt-16 border border-gray-300 rounded-xl py-2.5 xl:py-5 px-4 xl:px-10 shadow-lg shadow-gray-300">

                <h3 className="font-semibold text-lg pb-2">Datos de entrega</h3>
                <p>{address.firstName} {address.lastName}</p>
                <p className="pb-1">{address.address}</p>
                <p className="pb-1">{address.address2}</p>
                <p className="pb-1">{address.postalCode}</p>
                <p className="pb-1">{address.city}, {address.country}</p>
                <p className="border-b border-gray-300 pb-2">{address.phone}</p>

                <div className="flex justify-between border-b border-gray-300 py-4 text-xs lg:text-sm xl:text-base lg:gap-48">
                    <p className="font-semibold xl:font-medium">N° Productos <span className="font-light">({itemsInCart})</span></p>
                    <p className="font-medium xl:font-semibold">
                        {itemsInCart === 1 ? '1 producto' : `${itemsInCart} productos`}
                    </p>
                </div>

                <div className="flex justify-between border-b border-gray-300 py-4 text-xs lg:text-sm xl:text-base">
                    <p className="font-semibold xl:font-medium">Subtotal </p>
                    <p className="font-medium xl:font-semibold">{currencyFormat(subtotal)}</p>
                </div>

                <div className="flex justify-between border-b border-gray-300 py-4 text-xs lg:text-sm xl:text-base">
                    <p className="font-semibold xl:font-medium">Impuestos <span className="font-light">(18%)</span></p>
                    <p className="font-medium xl:font-semibold">{currencyFormat(tax)}0</p>
                </div>

                <div className="flex justify-between py-4 text-xs lg:text-sm xl:text-base">
                    <p className="font-semibold xl:font-medium">Total:</p>
                    <p className="font-medium xl:font-semibold">{currencyFormat(total)}</p>
                </div>

                <p className="pb-2 text-sm">
                    {'Al hacer click en "Colocar orden", aceptas nuestros'}
                    <a className="underline cursor-pointer"> terminos y condiciones.</a>
                </p>

                <p className="text-red-500">{errorMessage}</p>
                <button
                    // href=""
                    onClick={onPLaceOrder}
                    className={clsx('w-full flex justify-center items-center py-3 my-2 rounded-md text-white duration-300', {
                        ' shadow-lg shadow-blue-900 hover:shadow-md hover:shadow-blue-900 bg-blue-700': !isPlacingOrder,
                        'bg-blue-500 cursor-not-allowed': isPlacingOrder,
                    })}>
                    <IoCardOutline size={22} />
                    <span className="text-sm xl:text-base ml-2 font-semibold">Colocar orden</span>
                </button>
            </div>
        </div>
    );
};
