import Link from 'next/link';
import { IoBaseball, IoMan, IoWoman } from 'react-icons/io5';

const catgories = [
    { icon: <IoMan size={25} />, name: 'Hombres', href: '/category/men' },
    { icon: <IoWoman size={25} />, name: 'Mujeres', href: '/category/women' },
    { icon: <IoBaseball size={25} />, name: 'Niños', href: '/category/kids' },
];

export const FooterCategories = () => {
    return (
        <div className="flex flex-row lg:flex-col justify-center gap-8 lg:gap-5">
            {catgories.map(({ icon, name, href }) => (
                <Link
                    key={href}
                    href={href}
                    className="flex items-center"
                >
                    {icon}
                    <span className="font-semibold ml-2 hover:scale-105 duration-500 text-sm">{name}</span>
                </Link>
            ))}
        </div>
    );
};
