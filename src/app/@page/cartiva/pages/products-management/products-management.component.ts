import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { HeaderComponent } from '../../components/header/header.component';
@Component({
  selector: 'app-products-management',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './products-management.component.html',
  styleUrl: './products-management.component.scss'
})
export class ProductsManagementComponent {
  
}
