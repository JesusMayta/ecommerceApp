import prisma from '../lib/prisma';
import { initialData } from './seed';


async function main() {

    //! Borrar registros previos
    // await Promise.all([

    await prisma.orderAddress.deleteMany();
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();

    await prisma.userAddress.deleteMany();
    await prisma.user.deleteMany();

    await prisma.productImage.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    // ]);

    const { categories, products, users } = initialData;

    await prisma.user.createMany({ data: users });

    //* Categorias
    const categoriesData = categories.map((name) => ({ name }));

    await prisma.category.createMany({ data: categoriesData });

    const categoriesDb = await prisma.category.findMany();

    // console.log(categoriesDb);

    const categoriesMap = categoriesDb.reduce((map, category) => {
        map[category.name.toLowerCase()] = category.id;
        return map;
    }, {} as Record<string, string>);

    //* Products

    products.forEach(async ({ type, images, ...rest }) => {

        await prisma.product.create({
            data: {
                ...rest,
                categoryId: categoriesMap[type],
                ProductImage: {
                    createMany: {
                        data: images.map(img => ({ url: img }))
                    }
                }
            }
        });

        //* Images
        // const imagesData = images.map(image => ({
        //     url: image,
        //     productId: dbProduct.id
        // }));

        // await prisma.productImage.createMany({
        //     data: imagesData
        // });

    });


    console.log('Seed ejecutado!');
};

(() => {
    if (process.env.NODE_ENV === 'production') return;
    main();
})();