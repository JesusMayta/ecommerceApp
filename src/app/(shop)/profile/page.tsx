import { auth } from '@/auth.config';
import { Title } from '@/components';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {

    const session = await auth();

    if (!session?.user) {
        redirect('/');
    };

    return (
        <div>
            <Title title="Mi Perfil" className="px-4 sm:px-10 mb-2" />

            <div className="ms-12">
                <pre className="ms-4">{JSON.stringify(session.user, null, 2)}</pre>
                <h3 className="mb-10 mt-4 text-2xl">{session.user.role}</h3>
            </div>
        </div>
    );
}