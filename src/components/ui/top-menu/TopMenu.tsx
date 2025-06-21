'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { HiBars3 } from 'react-icons/hi2';
import { IoCartOutline, IoSearchOutline } from 'react-icons/io5';

import { titleFont } from '@/config/fonts';
import { useCartStore, useUiStore } from '@/store';
import { ActiveLink } from './ActiveLink';

export const TopMenu = () => {

    const totalItemsInCart = useCartStore(state => state.getTotalItems());
    const openSideMenu = useUiStore(state => state.openSideMenu);
    const [scroll, setscroll] = useState<number>(0);

    const [loaded, setLoaded] = useState<boolean>(false);

    useEffect(() => {
        setLoaded(true);
        window.addEventListener('scroll', () => setscroll(window.scrollY));
    }, []);

    return (
        <nav className={`fixed top-0 z-10 flex px-6 py-4 justify-between items-center w-full transition-all duration-500 ${(scroll > 0) ? 'bg-gray-950 text-white shadow-lg shadow-gray-500' : 'bg-white border-b border-gray-200'}`}>

            <div className="duration-500 hover:scale-110">
                <Link href="/">
                    <span className={`${titleFont.className} antialiased font-bold text-lg`}>Virtual Shop</span>
                </Link>
            </div>

            {/* Links */}
            <div className="hidden font-semibold sm:flex">
                <ActiveLink />
            </div>

            {/* Shearch, cart, menu */}
            <div className="flex items-center">

                <Link href="/search" className="mx-2">
                    <IoSearchOutline className="w-5 h-5" />
                </Link>

                <Link href="/cart" className="mx-2">
                    <div className="relative mx-2" >
                        {
                            (loaded && totalItemsInCart > 0) && (
                                <span className="absolute -top-2 -right-2 px-1 text-xs font-bold text-white bg-blue-700 rounded-full fade-in">{totalItemsInCart}</span>
                            )
                        }
                        <IoCartOutline className="w-5 h-5" />
                    </div>
                </Link>

                <button
                    onClick={openSideMenu}
                    className={`m-2 px-2 py-1.5 rounded-md transition-all duration-700 shadow-md hover:scale-105 ${(scroll > 0) ? 'bg-white text-black font-semibold' : 'bg-gray-950 shadow-gray-500 text-white font-medium'} text-sm`}>
                    <HiBars3 size={22} />
                </button>

            </div>

        </nav >
    );
};
