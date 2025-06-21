export const revalidate = 0;

import { getPaginatedUsers } from '@/actions';
import { Pagination, Title } from '@/components';
import { redirect } from 'next/navigation';
import { UsersTable } from './ui/UsersTable';

export default async function OrdersPage() {

    const { ok, users = [] } = await getPaginatedUsers();

    if (!ok) {
        redirect('/auth/login');
    }

    return (
        <>
            <div className="ms-12">
                <Title title="Mantenimiento de usuarios" />
            </div>

            <div className="mx-12 mb-10">
                <UsersTable
                    users={users}
                />

                <Pagination
                    totalPages={1}
                />
            </div>
        </>
    );
}