import { titleFont } from "@/config/fonts";
import Image from "next/image";
import Link from "next/link";


export const PageNotFound = () => {
    return (
        <div className="flex flex-col-reverse md:flex-row h-[800px] w-full justify-center items-center align-middle">
            <div className="text-center mx-5 px-5">
                <h2 className={`${titleFont.className} antialiased text-9xl`}>404</h2>
                <p className="font-semibold text-xl mt-5">Whoops! Lo sentimos mucho.</p>
                <p className="font-light mt-5">
                    <span>Volver al </span>
                    <Link href="/" className="font-normal bg-gray-950 rounded-md ms-1 px-2 py-1 shadow-md shadow-gray-400 text-white transition-all hover:shadow-sm hover:shadow-gray-700">
                        inicio
                    </Link>
                </p>
            </div>

            <div className="px-5 mx-5">
                <Image src="/imgs/starman_750x750.png" alt="startman" className="p-5 sm:p-0" width={550} height={550} />
            </div>
        </div>
    );
};
