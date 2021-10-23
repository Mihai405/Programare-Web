import {CartItemDetail} from './CartItemDetail';

export function CartList( {cartItems} ){  
    return(
        <>
        {cartItems.map((cartItem) => (
            <CartItemDetail key={cartItem.id} {...cartItem}/>
        ))}
        </>
    );
}