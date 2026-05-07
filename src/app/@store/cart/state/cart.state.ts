import { Injectable } from "@angular/core";
import {CartStateModel, CartItemModel } from "./cart.mode,";
import { AddToCart, RemoveFromCart, IncreaseQuantity, DecreaseQuantity, ClearCart} from "./cart.action";
import { State, Action, StateContext, Selector } from "@ngxs/store";


@State<CartStateModel>({
    name: 'cart',
    defaults: {
        items: []
    }
})
@Injectable()
export class CartState {

   @Selector()
    static getCartItems(state: CartStateModel): CartItemModel[]{
        return state.items;
    }

    @Selector()
    static getTotalPrice(state: CartStateModel): number {
        return state.items.reduce((total, item) => total + item.price * item.quantity, 0)
    }

    @Selector()
    static getTotalItems(state: CartStateModel): number {
        return state.items.reduce((count, item) => count + item.quantity, 0)
    }

    @Action(AddToCart)
    addToCart(ctx: StateContext<CartStateModel>, {payload}:AddToCart){
        const state = ctx.getState();
        const existing = state.items.find(i => i.id === payload.id);
        if (existing){
            ctx.setState({
                items: state.items.map(i => 
                    i.id === payload.id ? {...i, quantity: i.quantity + 1} : i
                )
            })
        }
        else {
            ctx.setState({
                items: [...state.items, {...payload, quantity: 1}]
            })
        }
    }


    @Action(RemoveFromCart)
    removeFromCart(ctx: StateContext<CartStateModel>, {id}:RemoveFromCart){
        const state = ctx.getState();
        ctx.setState({
            items: state.items.filter(i => i.id !== id)
        })
    } 

    @Action(IncreaseQuantity)
    increaseQuantity(ctx: StateContext<CartStateModel>, {id}:IncreaseQuantity){
        const state = ctx.getState();
        ctx.setState({
            items: state.items.map(i => 
                i.id === id ? {...i, quantity:i.quantity+1}: i
            )
        })
    }

    @Action(DecreaseQuantity)
    deceaseQuantity(ctx: StateContext<CartStateModel>, {id}:DecreaseQuantity){
        const state = ctx.getState();
        ctx.setState({
            items: state.items.map(i => 
                i.id === id ? {...i, quantity: i.quantity -1} : i
            ).filter(i => i.quantity > 0)
        })
    }

    @Action(ClearCart)
    clearCart(ctx: StateContext<CartStateModel>){
        ctx.setState({
            items: []
        })
    }




}