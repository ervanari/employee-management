import { TestBed } from '@angular/core/testing';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { authGuard } from './auth.guard';

describe('authGuard', () => {
  const mockRoute = {} as ActivatedRouteSnapshot;
  const mockState = {} as RouterStateSnapshot;

  const setup = (isAuthenticated: boolean) => {
    const authSpy = jasmine.createSpyObj('AuthService', [], {
      isAuthenticated: () => isAuthenticated,
    });
    const routerSpy = jasmine.createSpyObj('Router', ['parseUrl']);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    return { authService: TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>, router: TestBed.inject(Router) as jasmine.SpyObj<Router> };
  };

  it('should return true if authenticated', () => {
    setup(true);
    TestBed.runInInjectionContext(() => {
      const result = authGuard(mockRoute, mockState);
      expect(result).toBeTrue();
    });
  });

  it('should redirect to login if not authenticated', () => {
    const { router } = setup(false);
    router.parseUrl.and.returnValue('/login' as any);

    TestBed.runInInjectionContext(() => {
      const result = authGuard(mockRoute, mockState);
      expect(router.parseUrl).toHaveBeenCalledWith('/login');
    });
  });
});
