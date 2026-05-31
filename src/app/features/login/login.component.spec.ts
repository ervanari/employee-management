import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { LoginComponent } from './login.component';
import { AuthService } from '../../core/services/auth.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent, NoopAnimationsModule],
      providers: [
        provideRouter([]),
        AuthService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have empty username and password initially', () => {
    expect(component['username']).toBe('');
    expect(component['password']).toBe('');
  });

  it('should show error when username and password are empty', () => {
    component['username'] = '';
    component['password'] = '';
    component['onLogin']();
    expect(component['error']()).toBe('Please enter username and password');
  });

  it('should call authService.login on valid credentials', () => {
    spyOn(authService, 'login').and.returnValue(true);
    component['username'] = 'admin';
    component['password'] = 'admin123';
    component['onLogin']();
    expect(authService.login).toHaveBeenCalledWith('admin', 'admin123');
  });

  it('should show error on invalid credentials', () => {
    component['username'] = 'wrong';
    component['password'] = 'wrong';
    component['onLogin']();
    setTimeout(() => {
      expect(component['error']()).toBe('Invalid username or password');
    }, 1000);
  });
});
