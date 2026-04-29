import { Routes } from '@angular/router';
import { ProductsManagementComponent } from './@page/cartiva/pages/products-management/products-management.component';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./@page/auth/login/login.component').then(m => m.LoginComponent)
    }, 
    {
        path: 'home', 
        loadComponent: () => import('./@page/cartiva/pages/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'products',
        loadComponent: () => import('./@page/cartiva/pages/products/products.component').then(m => m.ProductsComponent)
    },
    {
        path: 'product/:id',
        loadComponent: () => import('./@page/cartiva/components/product-item-details/product-item-details.component').then(m => m.ProductItemDetailsComponent)
    },
    {
        path: 'cart',
        loadComponent: () => import('./@page/cartiva/pages/cart/cart.component').then(m => m.CartComponent)
    },
    {
        path: 'productmanagement',
        loadComponent: () => import('./@page/cartiva/pages/products-management/products-management.component').then(m => m.ProductsManagementComponent)    
    },
    {
        path: '**',
        loadComponent: () => import('./@page/auth/components/notfound/notfound.component').then(m => m.NotfoundComponent)
    }
];
