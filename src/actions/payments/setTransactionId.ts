'use server';

import { auth } from "@/auth";
import prisma from "@/lib/prisma";


export const setTransactionId = async (transactionId: string, orderId: string) => {

    const session = await auth();

    if (!session?.user) {
        return {
            ok: false,
            message: 'Debe de estar autenticado',
        };
    };

    try {

        const order = await prisma.order.update({
            where: { id: orderId },
            data: { transactionId }
        });

        if (!order) {
            return {
                ok: false,
                message: `No se encontró una orden con el id: ${orderId}`
            };
        };

        return { ok: true }

    } catch (error) {
        return {
            ok: false,
            message: 'No se pudo actualizar el id de la transacción'
        };
    };
};