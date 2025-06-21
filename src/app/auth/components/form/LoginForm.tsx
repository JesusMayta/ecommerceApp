'use client';

import { authenticate } from '@/actions';
import { titleFont } from '@/config/fonts';
import clsx from 'clsx';
import Link from 'next/link';
import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { IoAlertCircle } from 'react-icons/io5';

export const LoginForm = () => {

    const [state, dispatch] = useFormState(authenticate, undefined);

    // const router = useRouter();

    useEffect(() => {

        if (state === 'Success') {
            // router.replace('/');
            window.location.replace('/');
        };

    }, [state])

    return (
        <form
            action={dispatch}
            className="px-8 mt-10 w-full transition-all sm:px-16 md:px-28 lg:px-16 2xl:px-32"
        >
            <div>
                <label htmlFor="email" className={`${titleFont.className} font-medium text-sm md:text-base`}>Correo electrónico:</label>
                <input
                    type="email"
                    name="email"
                    className="w-full mt-1.5 px-3 py-1.5 md:py-2 rounded-md bg-gray-300 border border-gray-400 focus:outline-none"
                />
            </div>

            <div className="mt-8">
                <div className="flex justify-between items-center w-full">
                    <label htmlFor="password" className={`${titleFont.className} font-medium text-sm md:text-base`}>Contraseña:</label>
                    <Link href="/forgot" className="text-xs font-semibold text-blue-600 md:text-sm hover:underline">¿Olvidaste tu contraseña?</Link>
                </div>
                <input type="password" id="password" name="password" className="w-full mt-1.5 px-3 py-1.5 md:py-2 rounded-md bg-gray-300 border border-gray-400 focus:outline-none" />
            </div>

            <div className="mt-11 w-full">
                {state === 'CredentialsSignin' && (
                    <div className="flex gap-1 justify-center items-center mt-1 mb-4 text-red-600">
                        <IoAlertCircle size={15} />
                        <p className="text-xs font-semibold">Credenciales incorrectas</p>
                    </div>
                )}

                <LoginButton />
            </div>

            {/* <div className="flex gap-3 justify-center items-center mt-8 w-full">
                <div className="h-[1px] w-1/2 bg-gray-400" />
                <span className="text-center text-gray-400">ó</span>
                <div className="h-[1px] w-1/2 bg-gray-400" />
            </div>

            <div className="flex gap-8 justify-center mt-6 w-full font-medium">
                <button
                    className="flex justify-center items-center px-3 py-2 w-32 rounded-lg border border-gray-400 outline-none hover:bg-gray-950 hover:text-white hover:shadow-lg hover:shadow-gray-900 hover:border-0">
                    <FcGoogle size={25} />
                    <span className="ml-1.5 text-sm md:text-base">Google</span>
                </button>

                <button className="flex justify-center items-center px-3 py-2 w-32 rounded-lg border border-gray-400 outline-none group hover:bg-gray-950 hover:shadow-lg hover:shadow-gray-900 hover:border-0">
                    <SiFacebook size={25} className="text-blue-700 group-hover:text-white" />
                    <span className="ml-1.5 text-sm md:text-base group-hover:text-white">Facebook</span>
                </button>
            </div> */}

        </form>
    );
};

function LoginButton() {

    const { pending } = useFormStatus();

    return (
        <button
            disabled={pending}
            type="submit" className={clsx('w-full p-1.5 md:p-2 rounded-md focus:outlie-none shadow-lg shadow-blue-900  duration-300 focus:outline-none', {
                'bg-blue-600/80': pending,
                'bg-blue-600 hover:shadow-md hover:shadow-blue-800': !pending
            }
            )}>
            {
                pending
                    ? (
                        <div className="flex justify-center items-center h-full text-white" >
                            <div className="w-5 h-5 rounded-full border-4 border-gray-50 animate-spin border-t-transparent" />
                            <p className={` ${titleFont.className} ml-2 font-semibold text-sm`}>Cargando...</p>
                        </div>
                    ) : (<span className={`${titleFont.className} font-semibold ml-2 text-white text-sm md:text-sm`}>Ingresar</span>)}
        </button >
    );
};
