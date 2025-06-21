import { HiShoppingBag } from 'react-icons/hi2';
import { IoLocation } from 'react-icons/io5';
import { titleFont } from '@/config/fonts';
import { FooterCategories } from './FooterCategories';
import { FooterLinks } from './FooterLinks';

export const Footer = () => {
    return (
        <footer className="w-full bg-gray-950 static bottom-0">

            <div className="flex flex-col lg:flex-row justify-between text-white px-20 py-12 w-full h-full">

                <div className="flex flex-row items-start justify-center hover:scale-110 duration-300 mb-12 xl:mb-0">
                    <HiShoppingBag size={40} />
                    <p className={`${titleFont.className} text-2xl sm:text-3xl xl:text-4xl font-semibold ml-3 mt-1`}> Virtual shop</p>
                </div>

                {/* Categories */}
                <div className="text-gray-300">

                    <p className="mb-8 lg:mb-6 font-medium text-sm xl:text-md underline text-center">Nuestras categorias</p>
                    <FooterCategories />
                </div>

                {/* Auth */}
                <div className="text-gray-300 mt-8 lg:mt-0">
                    <p className="font-medium text-sm xl:text-md underline mb-6 text-center">Nuestros locales de atención</p>

                    <ul className="flex flex-row lg:flex-col justify-between gap-5 px-0 sm:px-20">
                        <li>
                            <span className="font-semibold text-sm">Lima</span>
                            <div className="flex items-center mt-2">
                                <IoLocation size={20} />
                                <span className="ml-2 text-xs xl:text-sm">Miraflores San Juan N° 12</span>
                            </div>
                        </li>

                        <li>
                            <span className="font-semibold text-sm">Arequipa</span>
                            <div className="flex items-center mt-2">
                                <IoLocation size={20} />
                                <span className="ml-2 text-xs xl:text-sm">Calle Sucre N° 3</span>
                            </div>
                        </li>
                    </ul>

                </div>

                {/* {Links} */}
                <div className="text-gray-300 mt-8 lg:mt-0">
                    <p className="mb-6 font-medium text-sm xl:text-md underline text-center">Nuestras redes sociales</p>
                    <FooterLinks />
                </div>

            </div>

            <p className="text-center py-1 text-gray-500 text-xs">© Todos los derechos reservados - {new Date().getFullYear()}</p>
        </footer >
    );
};
