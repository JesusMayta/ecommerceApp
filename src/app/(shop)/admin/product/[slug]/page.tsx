import { getCategories, getProductBySlug } from "@/actions";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import { ProductForm } from "./ui/ProductForm";

interface Props {
    params: {
        slug: string
    }
};

export default async function ProductNewPage({ params }: Props) {

    const { slug } = params;

    const [
        product,
        categories
    ] = await Promise.all([
        getProductBySlug(slug),
        getCategories()
    ]);

    if (!product && slug !== 'new') {
        redirect('/admin/products');
    };

    const title = slug === 'new' ? 'Nuevo producto' : 'Editar producto';

    return (
        <>
            <div className="ms-12">
                <Title title={title} />
            </div>

            <ProductForm
                product={product ?? {}}
                categories={categories}
            />
        </>
    );
};