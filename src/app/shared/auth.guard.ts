import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  private auth = inject(AuthService);
  private router = inject(Router);

  canActivate(): boolean {
    const token = this.auth.getToken();
    if (token && !this.isExpired(token)) return true;
    // Token missing or expired — clear stale data and redirect
    this.auth.logout();
    this.router.navigate(['/login']);
    return false;
  }

  private isExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      // exp is in seconds; Date.now() is in ms
      return payload.exp * 1000 < Date.now();
    } catch {
      return true; // malformed token → treat as expired
    }
  }
}
