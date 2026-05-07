import { Component, inject, Input } from '@angular/core';
import { ProductModel } from '@store/products/state/product.model';
import { CommonModule } from '@angular/common';
import { Pipe } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngxs/store';
import { AddToCart } from '@store/cart/state/cart.action';
import { CartItemModel } from '@store/cart/state/cart.mode,';
@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss',
})
export class ProductItemComponent {
  @Input() productsList: ProductModel[] = [];

  
}
