export const revalidate = 604800; //* 7 dias

import { IoHeadsetOutline } from 'react-icons/io5';
import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/actions';
import { ProductMobileSlideShow, ProductSlideShow, StockLabel } from '@/components';
import { AddToCart } from './ui/AddToCart';
import { titleFont } from '@/config/fonts';

interface Props {
    params: {
        slug: string;
    };
};

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {

    const slug = params.slug;

    const product = await getProductBySlug(slug);

    return {
        title: product?.title ?? 'Product not found',
        description: product?.description ?? '',
        openGraph: {
            title: product?.title ?? 'Product not found',
            description: product?.description ?? '',
            images: [`/products/${product?.images[1]}`]
        }
    };
};

export default async function ProductPage({ params }: Props) {

    const { slug } = params;

    const product = await getProductBySlug(slug);

    if (!product) {
        notFound();
    };

    return (
        <div>
            {/* 
            <div className="flex my-2" >
                <Link href="/" className="ps-[166px]">Home</Link>
                <IoMdArrowDropleft />
            </div > */}

            <div className="flex flex-col gap-8 py-2 mb-2 w-full md:flex-row md:gap-2">

                {/* SlideShow */}
                <div className="w-full md:w-[48%] lg:w-[55%] xl:w-1/2">

                    {/* Mobile slideshow */}
                    <ProductMobileSlideShow images={product.images} title={product.title} className="block md:hidden" />

                    {/* Desktop slideshow */}
                    <ProductSlideShow images={product.images} title={product.title} className="hidden md:block" />

                </div>

                {/* Details */}
                <div className="w-full md:w-[52%] lg:w-[45%] xl:w-1/2 px-4 md:px-6 lg:px-8 2xl:pe-36">
                    <small className="font-light border-b-[1px] border-gray-700">Producto</small>

                    <StockLabel slug={product.slug} />

                    <h1 className={`${titleFont.className} mt-1 antialiased font-bold text-xl`}>{product.title}</h1>

                    <p className="mt-4 text-lg font-semibold">S/. {product.price.toFixed(2)}</p>

                    <AddToCart product={product} />

                    <h3 className="mt-10 font-bold text-md">Descripción</h3>

                    <hr className="my-3 border border-gray-400" />

                    <p className="py-3 text-sm font-light text-justify">{product.description}</p>
                </div>

            </div>

            <div className="flex justify-center items-center mx-auto mb-12 w-full">
                <IoHeadsetOutline size={25} />
                <p className="ml-3 text-sm">¿Necesitas ayuda? Llámanos al <strong>012032276</strong></p>
            </div>

        </div >
    );
};