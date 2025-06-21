
import { SlOptionsVertical, SlTrash } from 'react-icons/sl';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { CartProduct } from '@/interfaces';
import { useCartStore } from '@/store';


interface Props {
    product: CartProduct,
};

export const MenuInCart = ({ product }: Props) => {

    const removeProductFromCart = useCartStore(state => state.removeProductFromCart);

    return (
        <Menu>
            <MenuButton className="p-1.5 lg:p-2 rounded-full hover:bg-gray-950 hover:text-white focus:outline-none">
                <SlOptionsVertical size={15} />
            </MenuButton>
            <Transition
                enter="transition ease-out duration-75"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <MenuItems anchor="bottom end"
                    className="p-1 mt-1 w-40 text-white bg-black rounded-lg shadow-lg origin-top-right lg:-mt-1 focus:outline-none shadow-gray-950"
                >
                    <MenuItem>
                        <button
                            onClick={() => removeProductFromCart(product)}
                            className="flex gap-2 items-center px-3 py-2 w-full rounded-lg hover:bg-gray-900">
                            <SlTrash size={16} />
                            <span className="text-xs font-semibold lg:text-sm">Eliminar</span>
                        </button>
                    </MenuItem>
                </MenuItems>
            </Transition>
        </Menu>
    );
};
