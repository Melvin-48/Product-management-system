import { Component, Input, computed } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProductService } from '../../services/product';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  @Input() appTitle: string = '';

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  productCount = computed(() => this.productService.products().length);

  cartItemCount = computed(() =>
    this.cartService.items().reduce((sum, item) => sum + item.quantity, 0)
  );
}