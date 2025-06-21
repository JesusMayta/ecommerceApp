import { titleFont } from '@/config/fonts';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { LinkHome, LoginForm } from '../components';


export const metadata: Metadata = {
  title: 'Iniciar sesión',
  description: 'Autenticación para comprar en el aplicativo web',
};

export default function Login() {
  return (
    <div className="flex justify-center w-full h-full">

      <div className="w-full lg:w-1/2 xl:w-[40%] h-full flex flex-col justify-between pt-6 pb-2 overflow-y-auto">

        <LinkHome />

        <div className="flex flex-col justify-start items-center py-12 w-full lg:py-0">

          <Image src="/svg/logo.svg" alt="Logo img" width={85} height={85} className="object-cover mb-4 w-16 h-16 md:h-20 md:w-20 xl:h-24 xl:w-24" />
          <h1 className={`${titleFont.className} font-bold text-2xl md:text-3xl xl:text-4xl`}>Iniciar Sesión</h1>
          <p className="mt-3 text-xs text-gray-500 md:text-sm">¿No tienes una cuenta?<Link href="/auth/register" className="font-semibold text-blue-600 ml-1.5 underline">Registrate</Link></p>
          <LoginForm />
        </div>

        <p className="text-xs text-center text-gray-400 md:text-sm">Virtual shop © {new Date().getFullYear()}</p>
      </div >
      {/* <LoginForm /> */}

      <figure className="hidden lg:block w-1/2 xl:w-[60%] relative h-full bg-blue-600">
        <p className={`${titleFont.className} absolute top-8 right-7 text-4xl font-semibold`}>VirTual Shop</p>
        <Image
          src="/auth/login.jpg"
          alt="Login image"
          width={1000}
          height={1000}
          className="object-cover w-full h-full shadow-xl shadow-gray-800"
        />
      </figure>

    </div >
  );
}
