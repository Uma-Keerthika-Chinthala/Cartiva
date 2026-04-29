import { Component, Input } from '@angular/core';
import { ProductModel } from '@store/products/state/product.model';
import { CommonModule } from '@angular/common';
import { Pipe } from '@angular/core';
import { RouterLink } from "@angular/router";
@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent {
  @Input() productsList: ProductModel[] = [];
}
