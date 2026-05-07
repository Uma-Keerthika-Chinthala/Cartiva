import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { signal } from '@angular/core';
import { Store } from '@ngxs/store';
import { inject } from '@angular/core';
import { CartState } from '@store/cart/state/cart.state';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private store = inject(Store);
  isMenuOpen = signal<boolean>(false);


  toggleMenu(): void {
    this.isMenuOpen.update(value => !value); // ✅ Toggle signal
    console.log('Menu open:', this.isMenuOpen());
  }


  totalItems = this.store.selectSignal(CartState.getTotalItems)
}
