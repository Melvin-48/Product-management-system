import { Injectable, signal, computed } from '@angular/core';
import { Product } from './product';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items = signal<CartItem[]>([]);

  total = computed(() =>
    this.items().reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  );

  addToCart(product: Product) {
    const current = this.items();
    const existing = current.find(item => item.product._id === product._id);

    if (existing) {
      this.items.set(
        current.map(item =>
          item.product._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      this.items.set([...current, { product, quantity: 1 }]);
    }
  }

  removeFromCart(productId: string) {
    this.items.set(this.items().filter(item => item.product._id !== productId));
  }
}