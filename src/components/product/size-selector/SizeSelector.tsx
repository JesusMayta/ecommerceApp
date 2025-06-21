import type { Size } from '@/interfaces';
import clsx from 'clsx';

interface Props {
    selectedSize?: Size;
    availableSizes: Size[];

    onSizeChanged: (size: Size) => void;
};


export const SizeSelector = ({ selectedSize, availableSizes, onSizeChanged }: Props) => {

    return (
        <div className="my-5">
            <h3 className="font-bold mb-4">Tallas disponibles:</h3>

            <div className="flex">
                {availableSizes.map(size => (
                    <button key={size}
                        onClick={() => onSizeChanged(size)}
                        className={
                            clsx("mx-2 hover: text-md rounded-full px-2 py-0.5 hover:bg-gray-950 hover:text-white hover:font-semibold hover:shadow-md hover:shadow-gray-700", { 'bg-gray-950 text-white font-semibold shadow-md shadow-gray-700': size === selectedSize })
                        }>
                        {size}
                    </button>
                ))}
            </div>

        </div>
    );
};
