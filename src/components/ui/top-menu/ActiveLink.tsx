'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const categoriesLink = [
    { name: 'Hombres', href: 'men' },
    { name: 'Niños', href: 'kid' },
    { name: 'Mujeres', href: 'women' },
];

export const ActiveLink = () => {

    const pathName = usePathname();

    return (
        <>
            {
                categoriesLink.map(({ name, href }) => (
                    <div key={name} className="hover:scale-110 duration-300">
                        <Link href={`/gender/${href}`} className={clsx('m-2 px-2 py-1.5 transition-all', {
                            'border border-gray-400 rounded-lg': pathName === `/gender/${href}`
                        })}>{name}</Link>
                    </div>
                ))
            }
        </>
    );
};
