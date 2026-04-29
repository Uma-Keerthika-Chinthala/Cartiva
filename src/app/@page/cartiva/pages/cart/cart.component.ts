import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

}
