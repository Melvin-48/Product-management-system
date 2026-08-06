import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

export interface Product {
  _id: string;
  name: string;
  price: number;
  description?: string;
  imageUrl?: string;
  category?: string;
  stock: number;
  sku?: string;
  isActive?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/products`;

  products = signal<Product[]>([]);

  constructor(private http: HttpClient) {
    this.fetchProducts();
  }

  private getAuthHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${environment.tempAuthToken}`
    });
  }

  fetchProducts() {
    this.http.get<Product[]>(this.apiUrl).subscribe({
      next: (data) => this.products.set(data),
      error: (err) => console.error('Failed to fetch products', err)
    });
  }

  getProducts(): Product[] {
    return this.products();
  }

  addProduct(name: string, price: number) {
    const newProduct = { name, price, stock: 0 };
    this.http.post<Product>(this.apiUrl, newProduct, { headers: this.getAuthHeaders() }).subscribe({
      next: (created) => {
        this.products.set([...this.products(), created]);
      },
      error: (err) => console.error('Failed to add product', err)
    });
  }

  updateProduct(id: string, name: string, price: number) {
    this.http.patch<Product>(`${this.apiUrl}/${id}`, { name, price }, { headers: this.getAuthHeaders() }).subscribe({
      next: (updated) => {
        this.products.set(this.products().map(p => (p._id === id ? updated : p)));
      },
      error: (err) => console.error('Failed to update product', err)
    });
  }

  deleteProduct(id: string) {
    this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() }).subscribe({
      next: () => {
        this.products.set(this.products().filter(p => p._id !== id));
      },
      error: (err) => console.error('Failed to delete product', err)
    });
  }
}