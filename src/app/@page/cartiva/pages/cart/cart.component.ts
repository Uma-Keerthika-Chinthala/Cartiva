import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { Store } from '@ngxs/store';
import { inject } from '@angular/core';
import { CartState } from '@store/cart/state/cart.state';
import { IncreaseQuantity, DecreaseQuantity, ClearCart, RemoveFromCart} from '@store/cart/state/cart.action';
import { JsonPipe } from '@angular/common';
import { Pipe } from '@angular/core';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  private store = inject(Store);

  cartItems = this.store.selectSignal(CartState.getCartItems);
  totalPrice = this.store.selectSignal(CartState.getTotalPrice);
  totalItems = this.store.selectSignal(CartState.getTotalItems);


  increase(id: number): void {
    this.store.dispatch(new IncreaseQuantity(id));
  }

  decrease(id: number): void {
    this.store.dispatch(new DecreaseQuantity(id));
  }

  remove(id: number): void {
    this.store.dispatch(new RemoveFromCart(id));
  }

  clearCart(): void {
    this.store.dispatch(new ClearCart());
  }

  ngOnInit(): void {
    console.log('🛒 Cart Items:', this.cartItems());
    console.log('💰 Total Price:', this.totalPrice());
    console.log('📦 Total Items:', this.totalItems());
  }

}


