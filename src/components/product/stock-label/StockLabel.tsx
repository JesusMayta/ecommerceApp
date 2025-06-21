'use client';

import { useEffect, useState } from 'react';
import { getStockBySlug } from '@/actions/products/getStockBySlug';
import { titleFont } from '@/config/fonts';
import clsx from 'clsx';

interface Props {
    slug: string;
};

export const StockLabel = ({ slug }: Props) => {

    const [stock, setStock] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        getStock();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getStock = async () => {
        const inStock = await getStockBySlug(slug);
        setStock(inStock);
        setIsLoading(false);
    };

    return (
        <p className={
            clsx(`${titleFont.className} mt-3 antialiased font-bold text-md`, {
                'bg-gray-200 w-fit px-1 rounded-lg animate-pulse text-gray-200': isLoading
            })
        }>
            Stock:
            <span className="ml-2 font-extralight">
                {stock}
            </span>
        </p>
    );
};
