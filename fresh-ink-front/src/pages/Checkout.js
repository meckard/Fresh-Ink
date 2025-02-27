import { CartContext } from "../Components/cartContext";
import { useContext } from "react";

export default function Checkout () {
    const {cart, setCart} = useContext(CartContext)

    return (
        <p>a cart page</p>
    )
}