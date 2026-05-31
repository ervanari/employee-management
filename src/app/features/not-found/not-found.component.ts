import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatIconModule],
  template: `
    <div class="not-found-container">
      <mat-icon class="not-found-icon">error_outline</mat-icon>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <a mat-raised-button color="primary" routerLink="/home">
        <mat-icon>home</mat-icon>
        Back to Home
      </a>
    </div>
  `,
  styles: `
    .not-found-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 60vh;
      text-align: center;
      padding: 32px;
    }

    .not-found-icon {
      font-size: 72px;
      width: 72px;
      height: 72px;
      color: #94a3b8;
      margin-bottom: 16px;
    }

    h1 {
      font-size: 4rem;
      font-weight: 800;
      color: #1e293b;
      margin-bottom: 8px;
    }

    h2 {
      font-size: 1.5rem;
      color: #1e293b;
      margin-bottom: 12px;
    }

    p {
      color: #64748b;
      margin-bottom: 24px;
    }
  `,
})
export class NotFoundComponent {}
