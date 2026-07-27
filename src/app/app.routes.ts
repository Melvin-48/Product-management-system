import { Routes } from '@angular/router';
import { productExistsGuard } from './guards/product-exists-guard';
import { authGuard } from './guards/auth-guard-guard';

export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },

  {
    path: 'products',
    loadComponent: () => import('./components/main/main').then(m => m.Main)
  },
  {
    path: 'products/:id',
    loadComponent: () => import('./components/product-detail/product-detail').then(m => m.ProductDetail),
    canActivate: [productExistsGuard]
  },
  {
    path: 'products/:id/edit',
    loadComponent: () => import('./components/product-form/product-form').then(m => m.ProductForm),
    canActivate: [productExistsGuard]
  },

  {
    path: 'cart',
    loadComponent: () => import('./components/cart/cart').then(m => m.Cart)
  },

  {
    path: 'login',
    loadComponent: () => import('./components/login/login').then(m => m.Login)
  },
  {
    path: 'register',
    loadComponent: () => import('./components/register/register').then(m => m.Register)
  },

  {
    path: 'checkout',
    loadComponent: () => import('./components/checkout-wizard/checkout-wizard').then(m => m.CheckoutWizard),
    canActivate: [authGuard]
  }
];