import { Injectable, signal, computed } from '@angular/core';

export interface AuthUser {
  username: string;
  fullName: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly VALID_USERNAME = 'admin';
  private readonly VALID_PASSWORD = 'admin123';

  private currentUser = signal<AuthUser | null>(this.loadFromStorage());

  isAuthenticated = computed(() => this.currentUser() !== null);

  login(username: string, password: string): boolean {
    if (username === this.VALID_USERNAME && password === this.VALID_PASSWORD) {
      const user: AuthUser = { username, fullName: 'Administrator' };
      this.currentUser.set(user);
      localStorage.setItem('auth_user', JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout(): void {
    this.currentUser.set(null);
    localStorage.removeItem('auth_user');
  }

  getUser(): AuthUser | null {
    return this.currentUser();
  }

  private loadFromStorage(): AuthUser | null {
    const stored = localStorage.getItem('auth_user');
    return stored ? JSON.parse(stored) : null;
  }
}
