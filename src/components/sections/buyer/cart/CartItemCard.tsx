import { CartItem } from '@/global';
import React from 'react';



interface CartItemProps {
    cartItem: CartItem;
}

const CartItemCard: React.FC<CartItemProps> = ({
    cartItem,
}) => {


    return (
        <div className="flex items-center justify-between p-4 border rounded-lg mb-4 shadow-sm">
            <div className="flex items-center space-x-4">
                <div className="relative w-20 h-20">
                    <img
                        src={""}
                        alt={""}
                        width={80}
                        height={80}
                        className="rounded-md object-cover"
                    />
                </div>
                <div>
                    <h3 className="font-semibold text-lg">name</h3>
                    <p className="text-green-600 font-medium">price</p>
                </div>
            </div>

            <div className="flex items-center space-x-4">
                <div className="flex items-center border rounded-md">
                    <button
                        // onClick={() => handleQuantityChange(-1)}
                        className="px-3 py-1 hover:bg-gray-100"
                    >
                        -
                    </button>
                    <span className="px-3 py-1">quantity</span>
                    <button
                        // onClick={() => handleQuantityChange(1)}
                        className="px-3 py-1 hover:bg-gray-100"
                    >
                        +
                    </button>
                </div>
                <p className="font-semibold">
                    Total: GH₵ totalPrice
                </p>
                <button
                    // onClick={() => onRemove(id)}
                    className="text-red-500 hover:text-red-700"
                >
                    Remove
                </button>
            </div>
        </div>
    );
};

export default CartItemCard;