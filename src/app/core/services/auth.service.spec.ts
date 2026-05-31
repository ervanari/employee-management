import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('should return true for valid credentials', () => {
      const result = service.login('admin', 'admin123');
      expect(result).toBeTrue();
    });

    it('should return false for invalid username', () => {
      const result = service.login('wrong', 'admin123');
      expect(result).toBeFalse();
    });

    it('should return false for invalid password', () => {
      const result = service.login('admin', 'wrong');
      expect(result).toBeFalse();
    });

    it('should return false for empty credentials', () => {
      expect(service.login('', '')).toBeFalse();
    });

    it('should set authenticated state on success', () => {
      service.login('admin', 'admin123');
      expect(service.isAuthenticated()).toBeTrue();
    });

    it('should store user in localStorage on success', () => {
      service.login('admin', 'admin123');
      const stored = localStorage.getItem('auth_user');
      expect(stored).toBeTruthy();
      expect(JSON.parse(stored!).username).toBe('admin');
    });
  });

  describe('logout', () => {
    it('should clear authenticated state', () => {
      service.login('admin', 'admin123');
      service.logout();
      expect(service.isAuthenticated()).toBeFalse();
    });

    it('should remove user from localStorage', () => {
      service.login('admin', 'admin123');
      service.logout();
      expect(localStorage.getItem('auth_user')).toBeNull();
    });
  });

  describe('getUser', () => {
    it('should return null when not authenticated', () => {
      expect(service.getUser()).toBeNull();
    });

    it('should return user when authenticated', () => {
      service.login('admin', 'admin123');
      const user = service.getUser();
      expect(user).toBeTruthy();
      expect(user!.username).toBe('admin');
      expect(user!.fullName).toBe('Administrator');
    });
  });

  describe('isAuthenticated signal', () => {
    it('should be false initially', () => {
      expect(service.isAuthenticated()).toBeFalse();
    });

    it('should become true after login', () => {
      service.login('admin', 'admin123');
      expect(service.isAuthenticated()).toBeTrue();
    });

    it('should become false after logout', () => {
      service.login('admin', 'admin123');
      service.logout();
      expect(service.isAuthenticated()).toBeFalse();
    });
  });
});
