import Image from 'next/image';
import { LinkHome } from '../components';
import { RegisterForm } from '../components/form/RegisterForm';
import { titleFont } from '@/config/fonts';

export default function RegisterPage() {
    return (
        <div className="flex flex-row w-full h-full">

            <figure className="w-[60%] h-full">
                <Image
                    src="/auth/register.jpg"
                    alt="Register image"
                    width={1000}
                    height={1000}
                    className="object-cover w-full h-full shadow-xl shadow-gray-500"
                />
            </figure>

            <div className="w-[40%] flex flex-col justify-between pt-6">

                <div className="h-1/6">
                    <LinkHome />
                </div>
                <div className="h-5/6">
                    <div className="h-full flex flex-col justify-start pt-12 items-center">
                        <Image src="/svg/logo.svg" alt="Logo img" width={85} height={85} className="object-cover mb-4 w-16 h-16 md:h-20 md:w-20 xl:h-24 xl:w-24" />
                        <h1 className={`${titleFont.className} font-bold text-2xl md:text-3xl xl:text-4xl`}>Nueva cuenta</h1>
                        <RegisterForm />
                    </div>
                </div>
            </div>

        </div>
    );
};