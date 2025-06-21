
'use server';

import { auth } from "@/auth.config";
import { Address, Size } from "@/interfaces";
import prisma from "@/lib/prisma";

interface ProductToOrder {
    productId: string;
    quantity: number;
    size: Size
};

export const placeOrder = async (productIds: ProductToOrder[], address: Address) => {

    const session = await auth();

    const userId = session?.user.id;

    if (!userId) {
        return {
            ok: false,
            message: 'No hay sesión de usuario'
        };
    };

    const products = await prisma.product.findMany({
        where: {
            id: {
                in: productIds.map(p => p.productId)
            }
        }
    });

    // Calcular montos
    const itemsInOrder = productIds.reduce((count, p) => count + p.quantity, 0);
    // Los totales de tax, subtotal y total
    const { subTotal, tax, total } = productIds.reduce((totals, item) => {

        const productQuantity = item.quantity;
        const product = products.find(product => product.id === item.productId);

        if (!product) throw new Error(`${item.productId} no existe - 500`);

        const subTotal = product.price * productQuantity;
        totals.subTotal += subTotal;
        totals.tax += subTotal * 0.18;
        totals.total += subTotal * 1.18;
        return totals;
    }, { subTotal: 0, tax: 0, total: 0 });


    // Crear la transacción en Db
    try {
        const prismaTx = await prisma.$transaction(async (tx) => {
            //1. Actualizar stock de los productos
            const updatedProductsPromises = products.map(async (product) => {

                // Acumular los valores
                const productQuantity = productIds.filter(p => p.productId === product.id).reduce((acc, item) => acc + item.quantity, 0);

                if (productQuantity === 0) {
                    throw new Error(`${product.id} no tiene cantidad definida`);
                }

                return tx.product.update({
                    where: { id: product.id },
                    data: {
                        // inStock: product.inStock - productQuantity No hacer
                        inStock: {
                            decrement: productQuantity
                        }
                    }
                });
            });

            const updatedProducts = await Promise.all(updatedProductsPromises);

            //Verificar valores negativos en las existencias - no hay stock
            updatedProducts.forEach(product => {
                if (product.inStock < 0) throw new Error(`${product.title} no tiene inventario suficiente`);
            });

            //2. Crear la order - ENCABEZADO - Detalles
            const order = await tx.order.create({
                data: {
                    userId,
                    itemsInOrder,
                    subTotal,
                    tax,
                    total,
                    OderItem: {
                        createMany: {
                            data: productIds.map(p => ({
                                quantity: p.quantity,
                                size: p.size,
                                productId: p.productId,
                                price: products.find(product => product.id === p.productId)?.price ?? 0
                            }))
                        }
                    }
                }
            });

            // Validar si el price es cero, entonces, lanzar un error 

            //3. Crear la dirección de la orden
            const orderAddress = await tx.orderAddress.create({
                data: {
                    ...address,
                    orderId: order.id
                }
            });

            return {
                order,
                orderAddress,
                updatedProducts
            };
        });

        return {
            ok: true,
            order: prismaTx.order,
            prismaTx
        };
    } catch (error: any) {
        return {
            ok: false,
            message: error?.message
        };
    };
};