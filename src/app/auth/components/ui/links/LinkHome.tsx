import Link from 'next/link';
import { IoArrowBackCircleOutline } from 'react-icons/io5';

export const LinkHome = () => {
    return (
        <Link href="/" className="flex items-center w-full  ps-6">
            <IoArrowBackCircleOutline size={25} />
            <span className="font-semibold text-sm ml-1.5 hover:scale-105 duration-300">Volver al inicio</span>
        </Link>
    );
};
