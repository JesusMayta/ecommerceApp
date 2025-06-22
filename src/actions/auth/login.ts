'use server';


import { signIn } from '@/auth';
import { sleep } from '@/utils';
import { AuthError } from 'next-auth';

export async function authenticate(prevState: string | undefined, formData: FormData) {

    try {
        await sleep(2);
        await signIn('credentials', {
            redirect: false,
            ...Object.fromEntries(formData)
        });

        return 'Success';

    } catch (error) {

        console.log({ error });

        // if ((error as any).type === 'CredentialsSignin') {
        return 'CredentialsSignin'
        // };

        // return 'UnknownError';
        // if ((error as Error).message.includes('CredentialsSignin')) {
        // }
        // throw error;
    };
};

export const login = async (email: string, password: string) => {

    try {
        await signIn('credentials', {
            email,
            password,
            redirect: false,
        });

        return {
            ok: true
        };
    } catch (error) {
        return {
            ok: false,
            message: "No se pudo iniciar sesión"
        };
    };
};