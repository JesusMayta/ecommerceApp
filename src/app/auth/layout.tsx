import { auth } from '@/auth.config';
import { redirect } from 'next/navigation';

interface Props {
    children: React.ReactNode
};

export default async function LoginLayout({ children }: Props) {

    const session = await auth();

    if (session?.user) {
        redirect('/');
    };

    return (
        <main className="h-screen w-screen">
            {children}
        </main>
    );
}; 