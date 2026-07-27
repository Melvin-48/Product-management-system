import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product';
import { duplicateNameValidator } from './duplicate-name.validator';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css'
})
export class ProductForm implements OnInit {
  productForm: FormGroup;
  editingId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, duplicateNameValidator(this.productService)]],
      price: [0, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.editingId = Number(idParam);
      const existing = this.productService.getProducts().find(p => p.id === this.editingId);
      if (existing) {
        this.productForm.patchValue({ name: existing.name, price: existing.price });
      }
    }
  }

  onSubmit() {
    if (this.productForm.valid) {
      const { name, price } = this.productForm.value;

      if (this.editingId !== null) {
        this.productService.updateProduct(this.editingId, name, price);
        this.router.navigate(['/products', this.editingId]);
      } else {
        this.productService.addProduct(name, price);
        this.productForm.reset({ name: '', price: 0 });
      }
    }
  }
}