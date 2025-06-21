'use client';

import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import Link from 'next/link';
import { redirect, usePathname, useSearchParams } from 'next/navigation';
import clsx from 'clsx';
import { generatePagination } from '@/utils';

interface Props {
    totalPages: number;
};

export const Pagination = ({ totalPages }: Props) => {

    const pathName = usePathname();
    const searchParams = useSearchParams();

    const pageString = searchParams.get('page') ?? 1;
    const currentPage = isNaN(+pageString) ? 1 : +pageString;

    if (currentPage < 1 || isNaN(+pageString)) {
        redirect(pathName);
    };

    const allPages = generatePagination(currentPage, totalPages);

    const createPageUrl = (pageNumber: number | string) => {

        const params = new URLSearchParams(searchParams);

        if (pageNumber === '...') {
            return `${pathName}?${params.toString()}`
        };

        if (+pageNumber <= 0) {
            return `${pathName}`
        };

        if (+pageNumber > totalPages) {
            return `${pathName}?${params.toString()}`
        };

        params.set('page', pageNumber.toString());
        return `${pathName}?${params.toString()}`;
    };

    return (
        <div className="flex text-center justify-center mt-16 mb-20">
            <nav>
                <ul className="flex list-style-none">
                    <li>
                        <Link
                            className="relative block py-1.5 px-3 border-0 outline-none transition-all duration-500 text-gray-800 hover:text-gray-800 hover:scale-110 focus:shadow-none"
                            href={createPageUrl(currentPage - 1)}>
                            <IoChevronBackOutline size={30} />
                        </Link>
                    </li>

                    {allPages.map((page, index) => (
                        <li className="page-item" key={page + '-' + index}>
                            <Link
                                className={
                                    clsx("relative block py-1.5 px-3 border-0 outline-none transition-all duration-300 rounded-lg ", {
                                        "bg-blue-600 text-white shadow-md shadow-blue-800 hover:bg-blue-700 hover:text-white": page === currentPage
                                    })}
                                href={createPageUrl(page)}>
                                {page}
                            </Link>
                        </li>
                    ))}
                    <li>
                        <Link
                            className="relative block py-1.5 px-3 border-0 outline-none transition-all duration-500 text-gray-800 hover:text-gray-800 hover:scale-110 focus:shadow-none"
                            href={createPageUrl(currentPage + 1)}>
                            <IoChevronForwardOutline size={30} />
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};
