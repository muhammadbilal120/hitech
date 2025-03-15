import { useContext } from "react"
import { ShopContext } from "../Context/ShopContext"
import Title from "./Title"


const CartTotal = () => {

    const { currency, delivery_fee, getCartAmount } = useContext(ShopContext)
    // console.log(getCartAmount)
    return (
        <div className="w-full max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-lg">
            <div className="text-2xl font-semibold text-center text-gray-800">
                <Title text1={'CART'} text2={'TOTALS'} />
            </div>
            <div className="flex flex-col gap-4 mt-6 text-sm text-gray-700">
                <div className="flex flex-col sm:flex-row justify-between items-center sm:items-center gap-2 sm:gap-1">
                    <p className="font-medium text-center sm:text-left">Subtotal</p>
                    <p className="font-medium text-center sm:text-right">{currency}{getCartAmount()}.00</p>
                </div>
                <hr className="border-t border-gray-300" />
                <div className="flex flex-col sm:flex-row justify-between items-center sm:items-center gap-2 sm:gap-1">
                    <p className="font-medium text-center sm:text-left">Shipping Fee</p>
                    <p className="font-medium text-center sm:text-right">{currency}{delivery_fee}</p>
                </div>
                <hr className="border-t border-gray-300" />
                <div className="flex justify-around items-center md:justify-between">
    <b className="text-lg">Total</b>
    <b className="text-lg">{currency}{getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}</b>
</div>

            </div>
        </div>
    );

}

export default CartTotal