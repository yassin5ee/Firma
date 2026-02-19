import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Don't attach Authorization for public products listing to avoid unnecessary preflight
    if (req.method === 'GET' && req.url && req.url.includes('/api/products')) {
      return next.handle(req);
    }

    let token: string | null = null;
    if (typeof window !== 'undefined' && window.localStorage) {
      token = window.localStorage.getItem('token');
    }
    if (token) {
      const clone = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
      return next.handle(clone);
    }
    return next.handle(req);
  }
}
