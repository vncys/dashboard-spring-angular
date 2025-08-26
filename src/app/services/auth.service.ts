import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface AuthState {
  isLoggedIn: boolean;
  userEmail: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authStateSubject = new BehaviorSubject<AuthState>({
    isLoggedIn: false,
    userEmail: ''
  });

  public authState$: Observable<AuthState> = this.authStateSubject.asObservable();

  constructor() {
    this.checkInitialState();
  }

  private checkInitialState(): void {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userEmail = localStorage.getItem('userEmail') || '';
    
    this.authStateSubject.next({
      isLoggedIn,
      userEmail
    });
  }

  login(email: string): void {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', email);
    
    this.authStateSubject.next({
      isLoggedIn: true,
      userEmail: email
    });
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    
    this.authStateSubject.next({
      isLoggedIn: false,
      userEmail: ''
    });
  }

  getCurrentState(): AuthState {
    return this.authStateSubject.value;
  }

  isAuthenticated(): boolean {
    return this.authStateSubject.value.isLoggedIn;
  }
} 