export const revalidate = 0;

import { getPaginatedProductsWithImages } from '@/actions';
import { Pagination, ProductImage, Title } from '@/components';
import { currencyFormat } from '@/utils';
import Link from 'next/link';

interface Props {
    searchParams: {
        page?: string;
    }
};

export default async function OrdersPage({ searchParams }: Props) {

    const page = searchParams.page ? parseInt(searchParams.page) : 1;
    const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({ page });

    return (
        <>
            <div className="ms-12">
                <Title title="Mantenimiento de productos" />
            </div>

            <div className="flex justify-end mb-8 me-12">
                <Link href="/admin/product/new" className=" px-6 bg-blue-700 py-2 rounded-md text-white shadow-lg shadow-blue-950 hover:shadow-md hover:shadow-blue-900 duration-300">
                    Nuevo producto
                </Link>
            </div>

            <div className="mb-10 mx-12">
                <table className="min-w-full">
                    <thead className="bg-gray-200 border-b">
                        <tr>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Imagen
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Título
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Precio
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Género
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Inventario
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                Tallas
                            </th>
                        </tr>
                    </thead>
                    <tbody>

                        {products.map(product => (
                            <tr
                                key={product.id}
                                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                            >
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    <Link
                                        href={`/product/${product.slug}`}
                                    >
                                        <ProductImage
                                            src={product.ProductImage[0]?.url}
                                            alt={product.title}
                                            width={80}
                                            height={80}
                                            className="w-20 h-20 object-cover rounded-md border border-gray-300"
                                        />
                                    </Link>
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    <Link
                                        href={`/admin/product/${product.slug}`}
                                        className="hover:underline"
                                    >
                                        {product.title}
                                    </Link>
                                </td>

                                <td className="text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                                    {currencyFormat(product.price)}
                                </td>

                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {product.gender}
                                </td>

                                <td className="text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                                    {product.inStock}
                                </td>

                                <td className="text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                                    {product.sizes.join(', ')}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <Pagination totalPages={totalPages} />
            </div>
        </>
    );
}