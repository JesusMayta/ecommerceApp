import { titleFont } from '@/config/fonts';

interface Props {
    title: string;
    subtitle?: string;
    className?: string;
};

export const Title = ({ title, subtitle, className }: Props) => {
    return (
        <div className={`${className}`}>
            <h1 className={`${titleFont.className} text-center sm:text-start text-2xl sm:text-3xl font-semibold my-5 sm:my-8 antialiased`}>
                {title}
            </h1>

            {(subtitle)
                && (<h3 className="text-lg mb-5 font-semibold">{subtitle}</h3>)}

            <hr className="mb-8 border border-gray-200" />
        </div>
    );
};
