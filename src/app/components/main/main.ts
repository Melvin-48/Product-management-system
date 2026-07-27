import { Component, signal, computed, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product';
import { CartService } from '../../services/cart';
import { TimeAgo } from '../../pipes/time-ago-pipe';
import { Highlight } from '../../directives/highlight';

@Component({
  selector: 'app-main',
  imports: [FormsModule, CurrencyPipe, UpperCasePipe, RouterLink, TimeAgo, Highlight],
  templateUrl: './main.html',
  styleUrl: './main.css'
})
export class Main implements OnInit {
  searchTerm = signal('');
  posts: any[] = [];
  errorMessage = signal<string | null>(null);
  demoDate = new Date(Date.now() - 5 * 60 * 1000);

  constructor(
    private productService: ProductService,
    private cartService: CartService) {}

  filteredProducts = computed(() =>
    this.productService.products().filter(product =>
      product.name.toLowerCase().includes(this.searchTerm().toLowerCase())
    )
  );

  addToCart(product: any) {
    this.cartService.addToCart(product);
  }

  ngOnInit() {
    this.productService.getPosts().subscribe({
      next: (data) => {
        this.posts = data;
      },
      error: (err) => {
        this.errorMessage.set('Failed to load posts. Please try again later.');
        console.error('HTTP error:', err);
      }
    });
  }
}