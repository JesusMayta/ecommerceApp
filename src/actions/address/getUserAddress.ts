import prisma from '@/lib/prisma';

export const getUserAddress = async (userId: string) => {

    try {
        const address = await prisma.userAddress.findUnique({
            where: { userId }
        });

        if (!address) return null;

        const { address2, ...restData } = address;

        return {
            ...restData,
            address2: address2 ? address2 : ''
        };
    } catch (error) {
        return null;
    };
};