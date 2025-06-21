import { getOrderById } from '@/actions/order/getOrderById';
import { OrderStatus, PayPalButton } from '@/components';
import { titleFont } from '@/config/fonts';
import { currencyFormat } from '@/utils';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

interface Props {
    params: {
        id: string;
    }
};

export default async function OrderByIdPage({ params }: Props) {

    const { id } = params;

    const { order, ok } = await getOrderById(id);

    if (!ok) {
        redirect('/');
    }

    const address = order!.OrderAddress;

    return (
        <div className="w-full mb-8 lg:mb-32 -mt-8 lg:mt-2">

            <div className="px-3 w-full lg:w-[95%] mx-auto flex flex-col lg:flex-row gap-10 lg:gap-4 py-12">

                {/* Cart */}
                <div className="w-full lg:w-1/2">
                    <h1 className={`${titleFont.className} font-semibold text-xl lg:text-2xl xl:text-3xl text-center lg:text-start mb-4`}>Orden #{id.split('-').at(-1)}</h1>

                    <OrderStatus
                        isPaid={order?.isPaid ?? false}
                    />

                    <div className="bg-white py-5 rounded-xl shadow-lg shadow-gray-300 px-4 border border-gray-300">
                        <h2 className="text-xs lg:text-sm pb-3">Vendido por <span className="font-bold">Virtual Shop</span></h2>
                        {order?.OderItem.map(item => (
                            <div key={`${item.product.slug}-${item.size}`} className="pt-5 pb-3 border-t border-gray-300">
                                <div className="flex flex-row justify-between items-start gap-2 w-full">

                                    <div className="flex flex-row gap-3 justify-start w-11/12">
                                        <Image src={`/products/${item.product.ProductImage[0].url}`} className="object-cover rounded-lg w-12 lg:w-16 xl:w-24 h-12 lg:h-16 xl:h-24 border border-gray-300" width={70} height={70} alt={item.product.title} />
                                        <div className="flex flex-col justify-center text-xs lg:text-sm xl:text-base">
                                            <Link href={`/product/${item.product.slug}`} className={`${titleFont.className} font-semibold hover:underline`}>{item.product.title}</Link>
                                            <p className="mt-1">S/. {item.price.toFixed(2)} x {item.quantity}</p>
                                            <p className="text-xs lg:text-sm xl:text-base font-bold">Subtotal: <span className="ml-1 font-medium">
                                                {currencyFormat(item.price * item.quantity)}
                                            </span></p>
                                        </div>
                                    </div>

                                </div>
                            </div >
                        ))}
                    </div>
                </div>

                {/* Order */}
                <div className="w-full lg:w-1/2 flex flex-col items-center">
                    <h2 className={`${titleFont.className} font-bold text-xl lg:text-2xl xl:text-3xl`}>Resumen de la orden</h2>

                    <div className="bg-white w-full lg:w-fit mt-8 lg:mt-20 border border-gray-300 rounded-xl py-2.5 xl:py-5 px-4 xl:px-10 shadow-lg shadow-gray-300">

                        <h3 className="font-semibold text-lg">Datos de entrega</h3>
                        <p>{`${address?.firstName} ${address?.lastName}`}</p>
                        <p>{`${address?.address}`}</p>
                        <p>{`${address?.address2}`}</p>
                        <p>{address?.postalCode}</p>
                        <p>{address?.city}, {address?.country}</p>
                        <p className="border-b border-gray-300 pb-3">{address?.phone}</p>


                        <div className="flex justify-between border-b border-gray-300 py-4 text-xs lg:text-sm xl:text-base lg:gap-48">
                            <p className="font-semibold xl:font-medium">N° Productos <span className="font-light">({order?.itemsInOrder})</span></p>
                            <p className="font-medium xl:font-semibold">
                                {order?.itemsInOrder === 1 ? '1 producto' : `${order?.itemsInOrder} productos`}
                            </p>
                        </div>

                        <div className="flex justify-between border-b border-gray-300 py-4 text-xs lg:text-sm xl:text-base">
                            <p className="font-semibold xl:font-medium">Subtotal </p>
                            <p className="font-medium xl:font-semibold">{currencyFormat(order!.subTotal)}</p>
                        </div>

                        <div className="flex justify-between border-b border-gray-300 py-4 text-xs lg:text-sm xl:text-base">
                            <p className="font-semibold xl:font-medium">Impuestos <span className="font-light">(18%)</span></p>
                            <p className="font-medium xl:font-semibold">
                                {currencyFormat(order!.tax)}
                            </p>
                        </div>

                        <div className="flex justify-between py-4 text-xs lg:text-sm xl:text-base">
                            <p className="font-semibold xl:font-medium">Total:</p>
                            <p className="font-medium xl:font-semibold">{currencyFormat(order!.total)}</p>
                        </div>

                        {order?.isPaid ? (
                            <OrderStatus
                                isPaid={order?.isPaid ?? false}
                            />
                        ) : (
                            <PayPalButton
                                amount={order!.total}
                                orderId={order!.id}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
}