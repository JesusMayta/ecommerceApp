import { Metadata } from 'next';
import { FormAddress, Title } from '@/components';
import { redirect } from 'next/navigation';
import { getUserAddress } from '@/actions';
import { auth } from '@/auth';

export const metadata: Metadata = {
    title: 'Complete your Address ',
    description: 'Address Page',
};

export default async function AddressPage() {

    const session = await auth();

    if (!session?.user) {
        redirect('/auth/login');
    }

    const userAddress = await getUserAddress(session.user.id) ?? undefined;

    return (
        <div className="w-full lg:w-[90%] xl:w-[70%] lg:mx-auto py-4 flex flex-col mb-20 lg:mb-32 px-7 lg:px-12">

            <Title title="Dirección" subtitle="Datos de entrega" />

            <div className="flex flex-col">
                <FormAddress
                    userStoredAddress={userAddress}
                />
            </div>

        </div>
    );
};