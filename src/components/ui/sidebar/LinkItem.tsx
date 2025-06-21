'use client';

import { logout } from '@/actions';
import { useUiStore } from '@/store';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoShirtOutline, IoTicketOutline } from 'react-icons/io5';


const PrincipalLinks = [
    { icon: <IoPersonOutline size={20} />, name: 'Perfil', href: '/profile' },
    { icon: <IoTicketOutline size={20} />, name: 'Ordenes', href: '/orders' },
];

const adminLinks = [
    { icon: <IoShirtOutline size={20} />, name: 'Productos', href: '/admin/products' },
    { icon: <IoTicketOutline size={20} />, name: 'Ordenes', href: '/admin/orders' },
    { icon: <IoPeopleOutline size={20} />, name: 'Usuarios', href: '/admin/users' },
];

export const LinkItem = () => {

    const closeSideMenu = useUiStore(state => state.closeSideMenu);

    const { data: session } = useSession();

    const isAuthenticated = !!session?.user;
    const isAdmin = (session?.user.role === 'admin');

    const logoutSession = () => {
        window.location.replace('/');
        closeSideMenu();
        logout();
    };

    return (
        <>
            {PrincipalLinks.map(({ href, icon, name }) => (
                <Link
                    key={name}
                    href={href}
                    onClick={closeSideMenu}
                    className="flex items-center mt-3 sm:mt-4 p-2 hover:bg-gray-950 hover:text-white rounded-md transition-all"
                >
                    {icon}
                    <span className="ml-3 text-sm sm:text-md font-semibold">{name}</span>
                </Link>
            ))}

            {
                isAuthenticated ? (
                    <button
                        onClick={logoutSession}
                        className="flex items-center mt-3 sm:mt-4 p-2 hover:bg-gray-950 hover:text-white rounded-md transition-all w-full">
                        <IoLogOutOutline />
                        <span className="ml-3 text-sm sm:text-md font-semibold">Cerrar Sesión</span>
                    </button>
                ) : (
                    <Link
                        href="/auth/login"
                        onClick={closeSideMenu}
                        className="flex items-center mt-3 sm:mt-4 p-2 hover:bg-gray-950 hover:text-white rounded-md transition-all"
                    >
                        <IoLogInOutline size={20} />
                        <span className="ml-3 text-sm sm:text-md font-semibold">Iniciar sesión</span>
                    </Link>
                )
            }

            <div className="w-full h-px bg-gray-200 my-10" />

            {
                isAdmin && (
                    <>
                        {
                            adminLinks.map(({ name, href, icon }) => (
                                <Link
                                    key={name}
                                    href={href}
                                    onClick={closeSideMenu}
                                    className="flex items-center mt-3 sm:mt-4 p-2 hover:bg-gray-950 hover:text-white rounded-md transition-all"
                                >
                                    {icon}
                                    <span className="ml-3 text-sm sm:text-md font-semibold">{name}</span>
                                </Link>
                            ))
                        }
                    </>
                )
            }
        </>
    );
};
