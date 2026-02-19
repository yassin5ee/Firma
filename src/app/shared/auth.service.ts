import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // use relative path so dev proxy forwards to backend
  private base = '/api/auth';
  private userSubject = new BehaviorSubject<any>(this.loadUser());
  public currentUser$: Observable<any> = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  signup(data: any) {
    return this.http.post(this.base + '/signup', data).pipe(tap((res: any) => {
      if (res) {
        if (res.token && typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.setItem('token', res.token);
        }
        if (res.user && typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.setItem('user', JSON.stringify(res.user));
          this.userSubject.next(res.user);
        }
      }
    }));
  }

  login(data: any) {
    return this.http.post(this.base + '/login', data).pipe(tap((res: any) => {
      if (res) {
        if (res.token && typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.setItem('token', res.token);
        }
        if (res.user && typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.setItem('user', JSON.stringify(res.user));
          this.userSubject.next(res.user);
        }
      }
    }));
  }

  getToken() {
    if (typeof window === 'undefined' || !window.localStorage) return null;
    return window.localStorage.getItem('token');
  }

  logout() {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('user');
    }
    this.userSubject.next(null);
  }

  private loadUser(): any {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return null;
      const raw = window.localStorage.getItem('user');
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }
}
