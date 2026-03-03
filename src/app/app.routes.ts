import { Routes } from '@angular/router';
import { LoginComponent } from './@page/auth/login/login.component';
import { HomeComponent } from './@page/cartiva/pages/home/home.component';

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
        path: '**',
        loadComponent: () => import('./@page/auth/components/notfound/notfound.component').then(m => m.NotfoundComponent)
    }
];
