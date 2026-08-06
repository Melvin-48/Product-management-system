import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ProductService } from '../services/product';

export const productExistsGuard: CanActivateFn = (route, state) => {
  const productService = inject(ProductService);
  const router = inject(Router);

  const id = route.paramMap.get('id');
  const exists = productService.getProducts().some(p => p._id === id);

  if (exists) {
    return true;
  }

  router.navigate(['/']);
  return false;
};