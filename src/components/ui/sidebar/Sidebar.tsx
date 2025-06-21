'use client';

import { useUiStore } from '@/store';
import clsx from 'clsx';
import { IoCloseOutline, IoSearchOutline } from 'react-icons/io5';
import { LinkItem } from './LinkItem';
import { UserInfo } from './UserInfo';

export const Sidebar = () => {

    const isSideMenuOpen = useUiStore(state => state.isSideMenuOpen);
    const closeSideMenu = useUiStore(state => state.closeSideMenu);

    return (
        <div>
            {/* Backgorund black */}
            {(isSideMenuOpen && (
                <div className="fixed top-0 left-0 w-screen h-screen z-20 bg-black/70 backdrop-filter backdrop-blur-sm" onClick={closeSideMenu} />
            ))}

            {/* Sidemenu */}
            <aside className={
                clsx("fixed p-5 right-0 top-0 w-[300px] h-screen bg-white z-20 shadow-2xl transform transition-all fade-in duration-300 shadow-gray-950",
                    { "translate-x-full": !isSideMenuOpen }
                )
            }>

                <IoCloseOutline
                    size={35}
                    className="absolute top-5 right-5 cursor-pointer bg-gray-950 rounded-full text-white py-1"
                    onClick={closeSideMenu}
                />

                {/* Input search */}
                <div className="relative mt-16 mb-12 text-white">
                    <IoSearchOutline size={20} className="absolute top-2.5 left-2 " />
                    <input
                        type="text"
                        placeholder="Buscar..."
                        className="w-full bg-gray-950 rounded-md pl-10 py-2 pr-10 text-md focus:outline-none font-light shadow-md shadow-gray-600 placeholder:text-sm"
                    />
                </div>

                {/* Menu */}
                <LinkItem />

                <UserInfo />

            </aside>

        </div >
    )
}
