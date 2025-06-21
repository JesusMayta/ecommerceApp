import { titleFont } from '@/config/fonts';
import { Metadata } from 'next';
import Link from 'next/link';
import { IoArrowForward } from 'react-icons/io5';
import { PlaceOrder } from './ui/PlaceOrder';
import { ProductsInCart } from './ui/ProductsInCart';

export const metadata: Metadata = {
    title: 'Carrito de compras',
    description: 'Este es el proceso de mi página web',
};

export default function CheckoutPage() {

    return (
        <div className="w-full mb-8 lg:mb-32 -mt-8 lg:mt-1">

            <div className="px-3 w-full lg:w-[95%] mx-auto flex flex-col lg:flex-row gap-10 lg:gap-4 py-12">

                {/* Cart */}
                <div className="w-full lg:w-1/2">
                    <h1 className={`${titleFont.className} font-semibold text-xl lg:text-2xl xl:text-3xl text-center lg:text-start`}>Verificar orden</h1>
                    <div className="flex items-center gap-2 mt-2">
                        <IoArrowForward size={15} />
                        <Link href="/cart" className="font-medium hover:underline hover:font-semibold duration-200">Editar carrito</Link>
                    </div>
                    <div className="mt-8 bg-white py-5 rounded-xl shadow-lg shadow-gray-300 px-4 border border-gray-300">
                        <ProductsInCart />
                    </div>
                </div>

                {/* Order */}
                <div className="w-full lg:w-1/2 flex justify-center">
                    <PlaceOrder />
                </div>
            </div>
        </div>
    );
};