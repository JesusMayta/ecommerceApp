'use client';

import { HiMinus, HiPlus } from 'react-icons/hi2';

interface Props {
    quantity: number;

    onQuantityChanged: (value: number) => void;
};

export const QuantitySelector = ({ quantity, onQuantityChanged }: Props) => {

    const onValueChanged = (value: number) => {
        if (quantity + value < 1) return;
        onQuantityChanged(quantity + value);
    };

    return (

        <div>
            <div className="flex gap-1.5 lg:gap-3 items-center">

                <button onClick={() => onValueChanged(-1)} className="focus:outline-none bg-gray-950 text-white rounded-md p-[2px] lg:p-1 shadow-md shadow-gray-700">
                    <HiMinus size={17} />
                </button>

                <span className="py-1 w-14 text-center border-b border-gray-300">{quantity}</span>

                <button onClick={() => onValueChanged(+1)} className="focus:outline-none bg-gray-950 text-white rounded-md p-[2px] lg:p-1 shadow-md shadow-gray-700">
                    <HiPlus size={17} />
                </button>
            </div>
        </div>
    )
}
