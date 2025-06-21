import { Product } from '@/interfaces';
import { ProductGridItem } from './ProductGridItem';

interface Props {
    products: Product[];
};

export const ProductGrid = ({ products }: Props) => {
    return (
        <div className="px-3 sm:px-10 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-10 mt-12 mb-20">
            {products.map(product => (
                <ProductGridItem key={product.slug} product={product} />
            ))}
        </div>
    );
};
