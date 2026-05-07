import { CartItemModel } from "./cart.mode,";

enum CartActions {
    ADD_TO_CART = '[Cart] Add To Cart',
    REMOVE_FROM_CART = '[Cart] Remove From Cart',
    INCREASE_QUANTITY = '[Cart] Increase Quantity',
    DECREASE_QUANTITY = '[Cart] Decrease Quantity',
    CLEAR_CART = '[Cart] Clear Cart'
}

export class AddToCart {
    static readonly type: CartActions = CartActions.ADD_TO_CART;
    constructor(public payload:CartItemModel){}
}

export class RemoveFromCart {
    static readonly type: CartActions = CartActions.REMOVE_FROM_CART;
    constructor(public id:number){}
}

export class IncreaseQuantity {
    static readonly type: CartActions = CartActions.INCREASE_QUANTITY;
    constructor(public id:number){}
}

export class DecreaseQuantity {
    static readonly type: CartActions = CartActions.DECREASE_QUANTITY;
    constructor(public id:number){}
}

export class ClearCart {
    static readonly type: CartActions = CartActions.CLEAR_CART;
}