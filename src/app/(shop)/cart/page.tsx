import { OrderSumary, ProductsCart } from '@/components';
import { titleFont } from '@/config/fonts';
import { Metadata } from 'next';
import Link from 'next/link';
import { BiArrowBack } from 'react-icons/bi';


export const metadata: Metadata = {
    title: 'Carrito de compras',
    description: 'Este es el proceso de mi página web',
};

export default function CartPage() {

    return (
        <div className="-mt-8 mb-8 w-full">

            <div className="px-3 w-full lg:w-[95%] mx-auto flex flex-col lg:flex-row gap-10 lg:gap-4 py-12">

                {/* Cart */}
                <div className="w-full lg:w-1/2">
                    <h1 className={`${titleFont.className} font-semibold text-xl lg:text-2xl xl:text-3xl text-center`}>
                        Carrito <span className="font-light">({(4)} productos)</span>
                    </h1>

                    <Link
                        href="/"
                        className="flex gap-x-2 items-center mt-3 hover:underline"
                    >
                        <BiArrowBack />
                        Continuar comprando
                    </Link>
                    <div className="px-4 py-5 mt-8 bg-white rounded-md border border-gray-300 shadow-lg shadow-gray-300">
                        <ProductsCart />
                    </div>
                </div>

                {/* Order */}
                <div className="flex flex-col items-center w-full lg:w-1/2">
                    <h2 className={`${titleFont.className} font-bold text-xl lg:text-2xl xl:text-3xl`}>Resumen de la orden</h2>

                    <div
                        className="bg-white w-full lg:w-fit mt-8 border border-gray-300 rounded-md py-2.5 xl:py-5 px-4 xl:px-10 shadow-lg shadow-gray-300"
                    >
                        <OrderSumary />
                    </div>
                </div>
            </div>
        </div>
    );
};