import { getCart } from "@/lib/db/cart"
import CartEntity from "./CartEntity"
import setProductQuantity from "./action"
import { formatPrice } from "@/lib/format"

export const metadata = {
    title: "Your Cart - Ecommerce"
}

export default async function CartPage() {
    const cart = await getCart()
    return (
        <div>
            <h1 className="mb-6 text-3xl font-bold">Shopping Cart</h1>
            <div className="my-4 grid grid-cols-1 gap-4 items-baseline md:grid-cols-2 xl:grid-cols-4">
                {cart?.items.map(cartItem => (
                    <CartEntity cartItem={cartItem} key={cartItem.id} setProductQuantity={setProductQuantity} />
                ))}
                {!cart?.items.length && <p>Your Cart is Empty.</p>}
            </div>
            <div className="flex flex-col items-end sm:items-center">
                <p className="mb-3 font-bold">
                    Total: {formatPrice(cart?.subtotal || 0)}
                </p>
                <button className="btn btn-primary sm:w-[200px]">Checkout</button>
            </div>
        </div>
    )
}