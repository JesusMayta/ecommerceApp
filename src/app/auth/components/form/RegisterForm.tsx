'use client';

import { login, registerUser } from '@/actions';
import { titleFont } from '@/config/fonts';
import clsx from 'clsx';
import Link from 'next/link';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type FormInputs = {
    name: string,
    email: string,
    password: string,
};

export const RegisterForm = () => {

    const [errorMessage, setErrorMessage] = useState<string>('');

    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        setErrorMessage('');
        const { email, name, password } = data;
        const resp = await registerUser(name, email, password);

        if (!resp.ok) {
            setErrorMessage(resp.message);
            return;
        }
        await login(email.toLowerCase(), password);
        window.location.replace('/');
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-8 mt-10 w-full transition-all sm:px-16 md:px-28 lg:px-16 2xl:px-32"
        >
            <div>
                <label htmlFor="name" className={`${titleFont.className} font-medium text-sm md:text-base`}>Nombre completo:</label>
                <input
                    id="name"
                    type="text"
                    autoFocus
                    className={clsx('w-full mt-1.5 px-3 py-1.5 md:py-2 rounded-md bg-gray-300 border focus:outline-none', {
                        "border-red-500": errors?.name,
                        "border-gray-400": !errors?.name,
                    })}
                    {...register('name', { required: true })}
                />
                {errors?.name && <p className="text-red-500 text-sm mt-1">El nombre es requerido</p>}
            </div>

            <div className="mt-8">
                <label htmlFor="email" className={`${titleFont.className} font-medium text-sm md:text-base`}>Correo electrónico:</label>
                <input
                    id="email"
                    type="email"
                    autoFocus
                    className={clsx('w-full mt-1.5 px-3 py-1.5 md:py-2 rounded-md bg-gray-300 border focus:outline-none', {
                        "border-red-500": errors?.email,
                        "border-gray-400": !errors?.email,
                    })}
                    {...register('email', { required: true })}
                />
                {errors?.email && <p className="text-red-500 text-sm mt-1">El correo es requerido</p>}
            </div>

            <div className="mt-8">
                <div className="flex justify-between items-center w-full">
                    <label htmlFor="password" className={`${titleFont.className} font-medium text-sm md:text-base`}>Contraseña:</label>
                </div>
                <input
                    type="password"
                    id="password"
                    autoFocus
                    className={clsx('w-full mt-1.5 px-3 py-1.5 md:py-2 rounded-md bg-gray-300 border focus:outline-none', {
                        "border-red-500": errors?.password,
                        "border-gray-400": !errors?.password,
                    })}
                    {...register('password', { required: true, minLength: 6 })}
                />
                {errors?.password && <p className="text-red-500 text-sm mt-1">La contraseña es requerida</p>}
            </div>

            <div className="mt-11">

                {errorMessage !== '' && (<span className="text-sm text-red-500">{errorMessage}</span>)}
                <button
                    className="w-full p-1.5 md:p-2 rounded-md focus:outlie-none shadow-lg shadow-blue-900  duration-300 focus:outline-none bg-blue-600 hover:shadow-md hover:shadow-blue-800 text-white font-semibold"
                >
                    Crear cuenta
                </button>
            </div>

            <p className="mt-12 text-sm text-gray-700 text-end">
                ¿Ya tienes una cuenta?
                <Link
                    href="/auth/login"
                    className="underline text-blue-600 font-medium ms-1 hover:font-semibold transition-all duration-300"
                >
                    Inicia sesión
                </Link>
            </p>
        </form>
    )
}
