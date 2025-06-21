'use client';

import { Product } from '@/interfaces';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface Props {
    product: Product;
};

export const ProductGridItem = ({ product }: Props) => {

    const [displayImage, setDisplayImage] = useState(product.images[0]);

    //TODO: Set gender

    return (
        <div className="rounded-lg overflow-hidden flex flex-col fade-in hover:shadow-lg hover:shadow-gray-500 hover:scale-105 duration-500">
            <Link href={`/product/${product.slug}`}>
                <Image
                    src={`/products/${displayImage}`}
                    alt={product.title}
                    className="w-full object-cover border border-gray-300 border-b-0 rounded-t-lg hover:border-0" width={500} height={500}
                    onMouseEnter={() => setDisplayImage(product.images[1])}
                    onMouseLeave={() => setDisplayImage(product.images[0])}
                />
            </Link>

            <div className="p-4 flex flex-col gap-y-3 bg-gray-950 text-white h-full">
                <Link href={`/product/${product.slug}`} className="text-xs md:text-base hover:text-blue-400 hover:font-semibold h-1/2">{product.title}</Link>
                <span className="text-xs md:text-base font-semibold">S/. {product.price.toFixed(2)}</span>
            </div>
        </div>
    );
};
