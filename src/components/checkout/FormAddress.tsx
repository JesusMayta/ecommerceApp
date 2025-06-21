'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { IoCardOutline } from 'react-icons/io5';
import ReactFlagsSelect from 'react-flags-select';
import clsx from 'clsx';
import { useAddressStore } from '@/store';
import { deleteUserAddress, setUserAddress } from '@/actions';
import { useSession } from 'next-auth/react';
import { Address } from '@/interfaces';

type FormInputs = {
    firstName: string;
    lastName: string;
    address: string;
    address2?: string;
    postalCode: string;
    city: string;
    country: string;
    phone: string;
    rememberAddress: boolean;
};

interface Props {
    userStoredAddress?: Partial<Address>;
};

export const FormAddress = ({ userStoredAddress = {} }: Props) => {

    const router = useRouter();

    const [countrySelected, setCountrySelected] = useState<string>('');

    const { handleSubmit, register, formState: { isValid }, reset } = useForm<FormInputs>({
        defaultValues: {
            ...(userStoredAddress as any),
            rememberAddress: false
        }
    });

    const { data: session } = useSession({
        required: true
    });

    const setAddress = useAddressStore(state => state.setAddress);
    const address = useAddressStore(state => state.address);

    useEffect(() => {
        if (address.firstName) {
            reset(address);
            setCountrySelected(address.country);
        }
    }, [address, reset]);

    const onSubmit = async (data: FormInputs) => {
        const formData = { ...data, country: countrySelected };

        const { rememberAddress, ...restAddress } = formData;

        setAddress(restAddress);

        if (rememberAddress) {
            await setUserAddress(restAddress, session!.user.id);
        } else {
            await deleteUserAddress(session!.user.id);
        }
        router.push('/checkout')
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            <div className="flex flex-col md:flex-row md:gap-6 w-full">

                <div className="flex flex-col md:w-1/2">
                    <label htmlFor="firstName" className="font-medium">Nombres:</label>
                    <input
                        type="text"
                        id="firstName"
                        className="p-2 bg-gray-200 focus:outline-none rounded-lg mt-1.5 border border-gray-300"
                        {...register('firstName', { required: true })}
                    />
                </div>

                <div className="flex flex-col mt-6 md:mt-0 md:w-1/2">
                    <label htmlFor="lastName" className="font-medium">Apellidos:</label>
                    <input
                        type="text"
                        id="lastName"
                        className="p-2 bg-gray-200 focus:outline-none rounded-lg mt-1.5 border border-gray-300"
                        {...register('lastName', { required: true })}
                    />
                </div>

            </div>

            <div className="flex flex-col md:flex-row md:gap-6 mt-6">

                <div className="flex flex-col md:w-1/2">
                    <label htmlFor="address" className="font-medium">Dirección:</label>
                    <input
                        type="text"
                        id="address"
                        className="p-2 bg-gray-200 focus:outline-none rounded-lg mt-1.5 border border-gray-300"
                        {...register('address', { required: true })}
                    />
                </div>

                <div className="flex flex-col mt-6 md:mt-0 md:w-1/2">
                    <label htmlFor="address2" className="font-medium">Dirección 2 (Opcional):</label>
                    <input
                        type="text"
                        id="address2"
                        className="p-2 bg-gray-200 focus:outline-none rounded-lg mt-1.5 border border-gray-300"
                        {...register('address2', { required: true })}
                    />
                </div>

            </div>

            <div className="flex flex-col md:flex-row md:gap-6 mt-6">

                <div className="flex flex-col md:w-1/2">
                    <label htmlFor="postalCode" className="font-medium">Código postal:</label>
                    <input
                        type="text"
                        id="postalCode"
                        className="p-2 bg-gray-200 focus:outline-none rounded-lg mt-1.5 border border-gray-300"
                        {...register('postalCode', { required: true })}
                    />
                </div>

                <div className="flex flex-col mt-6 md:mt-0 md:w-1/2">
                    <label htmlFor="city" className="font-medium">Ciudad:</label>
                    <input
                        type="text"
                        id="city"
                        className="p-2 bg-gray-200 focus:outline-none rounded-lg mt-1.5 border border-gray-300"
                        {...register('city', { required: true })}
                    />
                </div>

            </div>

            <div className="flex flex-col md:flex-row md:gap-6 mt-6">

                <div className="flex flex-col md:w-1/2">
                    <label htmlFor="names" className="font-medium">País:</label>
                    <ReactFlagsSelect
                        className="mt-1.5 bg-gray-200 focus:outline-none border-0"
                        placeholder="Selecciona tu país"
                        searchPlaceholder="Buscar país"
                        selected={countrySelected}
                        onSelect={(code) => setCountrySelected(code)}
                        searchable
                    />
                </div>

                <div className="flex flex-col mt-6 md:mt-0 md:w-1/2">
                    <label htmlFor="phone" className="font-medium">Teléfono:</label>
                    <input
                        type="text"
                        id="phone"
                        className="p-2 bg-gray-200 focus:outline-none rounded-lg mt-1.5 border border-gray-300"
                        {...register('phone', { required: true })}
                    />
                </div>

            </div>

            <div className="inline-flex items-center mt-2">
                <label
                    className="relative flex cursor-pointer items-center rounded-full p-3"
                    htmlFor="rememberAddress"
                >
                    <input
                        type="checkbox"
                        className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-500 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-blue-700 checked:bg-blue-700 checked:before:bg-blue-700 hover:before:opacity-10"
                        id="rememberAddress"
                        {...register('rememberAddress')}
                    />
                    <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="1"
                        >
                            <path
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            ></path>
                        </svg>
                    </div>
                </label>

                <span>¿Recordar dirección?</span>
            </div>

            <div className="w-full flex justify-center mt-10 xl:mt-16">

                <button
                    type="submit"
                    disabled={!isValid}
                    className={clsx(
                        'flex justify-center items-center  text-center py-2.5 rounded-lg text-white font-semibold w-full md:w-1/2', {
                        'bg-blue-700 shadow-lg shadow-blue-800 hover:shadow-md hover:shadow-blue-900 duration-300': isValid,
                        'bg-blue-700/60 cursor-not-allowed': !isValid,
                    }
                    )}>
                    <IoCardOutline size={20} />
                    <span className="ml-2">Siguiente paso</span>
                </button>
            </div>

        </form>
    )
}
