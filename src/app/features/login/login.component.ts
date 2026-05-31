import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  template: `
    <div class="login-container">
      <div class="login-bg"></div>

      <mat-card class="login-card">
        <div class="login-header">
          <div class="login-icon">
            <mat-icon>group</mat-icon>
          </div>
          <h1>Employee Mandiri</h1>
          <p class="text-muted">Sign in to your account</p>
        </div>

        <form (ngSubmit)="onLogin()" class="login-form">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Username</mat-label>
            <input
              matInput
              [(ngModel)]="username"
              name="username"
              required
              autocomplete="username"
              [disabled]="loading()"
            />
            <mat-icon matPrefix>person</mat-icon>
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Password</mat-label>
            <input
              matInput
              [type]="hidePassword() ? 'password' : 'text'"
              [(ngModel)]="password"
              name="password"
              required
              autocomplete="current-password"
              [disabled]="loading()"
            />
            <mat-icon matPrefix>lock</mat-icon>
            <button
              type="button"
              mat-icon-button
              matSuffix
              (click)="hidePassword.set(!hidePassword())"
            >
              <mat-icon>{{ hidePassword() ? 'visibility_off' : 'visibility' }}</mat-icon>
            </button>
          </mat-form-field>

          @if (error()) {
            <div class="login-error">
              <mat-icon>error</mat-icon>
              <span>{{ error() }}</span>
            </div>
          }

          <button
            mat-raised-button
            color="primary"
            type="submit"
            class="full-width login-btn"
            [disabled]="loading() || !username || !password"
          >
            @if (loading()) {
              <mat-spinner diameter="20"></mat-spinner>
              Signing in...
            } @else {
              Sign In
            }
          </button>
        </form>

        <div class="login-footer">
          <p class="text-muted">Demo: admin / admin123</p>
        </div>
      </mat-card>
    </div>
  `,
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  protected username = '';
  protected password = '';
  protected hidePassword = signal(true);
  protected loading = signal(false);
  protected error = signal('');

  onLogin(): void {
    if (!this.username || !this.password) {
      this.error.set('Please enter username and password');
      return;
    }

    this.loading.set(true);
    this.error.set('');

    setTimeout(() => {
      const success = this.authService.login(this.username, this.password);

      if (success) {
        this.router.navigate(['/home']);
      } else {
        this.error.set('Invalid username or password');
        this.loading.set(false);
      }
    }, 800);
  }
}
