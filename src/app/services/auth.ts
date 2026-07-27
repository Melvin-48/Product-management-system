import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = signal(false);
  returnUrl = signal<string | null>(null);

  login() {
    this.isLoggedIn.set(true);
  }

  logout() {
    this.isLoggedIn.set(false);
  }

  setReturnUrl(url: string) {
    this.returnUrl.set(url);
  }

  consumeReturnUrl(): string {
    const url = this.returnUrl() ?? '/products';
    this.returnUrl.set(null);
    return url;
  }
}