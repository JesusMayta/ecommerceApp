import Link from 'next/link';
import { IoLogoFacebook, IoLogoInstagram, IoLogoTiktok, IoLogoWhatsapp } from 'react-icons/io5';

const socialLinks = [
    { icon: <IoLogoFacebook size={25} className="text-blue-500" />, name: 'facebook', href: '#facebook' },
    { icon: <IoLogoWhatsapp size={25} className="text-green-400" />, name: 'whatsapp', href: '#whatsapp' },
    { icon: <IoLogoInstagram size={25} className="text-pink-500" />, name: 'instagram', href: '#instagram' },
    { icon: <IoLogoTiktok size={25} />, name: 'tik tok', href: '#tiktok' },
];

export const FooterLinks = () => {
    return (
        <div className="flex flex-row lg:flex-col gap-10 lg:gap-3 justify-center">
            {socialLinks.map(({ icon, name, href }) => (
                <Link key={href} href={href} className="flex flex-row items-center hover:scale-105 duration-500">
                    {icon}
                    <span className="hidden sm:block text-xs xl:text-sm ml-2 font-semibold">{name}</span>
                </Link>

            ))}
        </div>
    );
};
