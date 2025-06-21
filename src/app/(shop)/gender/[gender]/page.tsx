export const revalidate = 60;

import { redirect } from 'next/navigation';
import { getPaginatedProductsWithImages } from '@/actions';
import { Pagination, ProductGrid, Title } from '@/components';
import { Gender } from '@prisma/client';

interface Props {
    params: {
        gender: string;
    },
    searchParams: {
        page?: string;
    }
};

export default async function GenderPage({ params, searchParams }: Props) {

    const { gender } = params;

    const page = searchParams.page ? parseInt(searchParams.page) : 1;

    const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({ page, gender: gender as Gender });

    if (products.length === 0) {
        redirect(`/gender/${gender}`);
    }

    const labels: Record<string, string[]> = {
        'men': ['Hombres', 'Productos para ellos'],
        'women': ['Mujeres', 'Lo mejor para ellas'],
        'kid': ['Niños', 'Para los engreidos del hogar'],
        'unisex': ['Todos', 'Sientete libre de elegir'],
    };

    return (
        <>
            <Title
                title={`Articulos para ${labels[gender][0]}`}
                subtitle={labels[gender][1]}
                className="px-4 sm:px-10 mb-2"
            />

            <ProductGrid products={products} />

            <Pagination totalPages={totalPages} />


        </>
    );
};