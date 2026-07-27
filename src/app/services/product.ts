import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  price: number;
}

interface Post {
  id: number;
  title: string;
  body: string;
}

@Injectable({
  providedIn: 'root'
 })
export class ProductService {
  products = signal<Product[]>([
    { id: 1, name: "Airpods", price: 2500 },
    { id: 2, name: "Wireless keyboard", price: 4500 },
    { id: 3, name: "HP monitor", price: 17500 },
    { id: 4, name: "Samsung Galaxy S23 ultra", price: 55900 },
    { id: 5, name: 'LOGITECH MX MASTER 3S MOUSE', price: 16500.00 },
    { id: 6, name: 'APPLE MACBOOK PRO 14" M3', price: 315000.00 },
    { id: 7, name: 'SONY WH-1000XM5 HEADPHONES', price: 48500.00 },
    { id: 8, name: 'SAMSUNG 1TB PORTABLE SSD', price: 14500.00 },
    { id: 9, name: 'DELL XPS 15 LAPTOP', price: 285000.00 },
    { id: 10, name: 'ANKER 20000MAH POWERBANK', price: 6500.00 },
    { id: 11, name: 'PLAYSTATION 5 CONSOLE', price: 85000.00 },
    { id: 12, name: 'NINTENDO SWITCH OLED', price: 52000.00 },
    { id: 13, name: 'LG 65" 4K SMART TV', price: 110000.00 },
    { id: 14, name: 'JBL FLIP 6 BLUETOOTH SPEAKER', price: 15500.00 },
    { id: 15, name: 'APPLE WATCH SERIES 9', price: 65000.00 },
    { id: 16, name: 'ASUS ROG GAMING ROUTER', price: 32000.00 },
    { id: 17, name: 'KINDLE PAPERWHITE 11TH GEN', price: 22000.00 },
    { id: 18, name: 'LOGITECH C920 WEBCAM', price: 11500.00 },
    { id: 19, name: 'SANDISK 128GB MICROSD CARD', price: 2500.00 },
    { id: 20, name: 'UGREEN 65W GAN CHARGER', price: 4800.00 }
  ]);

  constructor(private http: HttpClient) {}

  getProducts(): Product[] {
    return this.products();
  }

  addProduct(name: string, price: number) {
    const current = this.products();
    const newId = current.length > 0
      ? Math.max(...current.map(p => p.id)) + 1
      : 1;

    this.products.set([...current, { id: newId, name, price }]);
  }
  updateProduct(id: number, name: string, price: number) {
  const current = this.products();
  const updated = current.map(p =>
    p.id === id ? { ...p, name, price } : p
  );
  this.products.set(updated);
  }

  deleteProduct(id: number) {
  const current = this.products();
  this.products.set(current.filter(p => p.id !== id));
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
  }
}