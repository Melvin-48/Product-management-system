import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { ProductService, Product } from '../../services/product';

@Component({
  selector: 'app-product-detail',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetail implements OnInit {
  product = signal<Product | undefined>(undefined);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

   ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.product.set(this.productService.getProducts().find(p => p._id === id));
    });
  }
  onDelete() {
    const current = this.product();
    if (current && confirm(`Delete "${current.name}"?`)) {
      this.productService.deleteProduct(current._id);
      this.router.navigate(['/']);
    }
  }
}