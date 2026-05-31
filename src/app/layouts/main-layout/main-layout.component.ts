import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
  ],
  template: `
    <mat-sidenav-container class="layout-container">
      <mat-sidenav
        [opened]="sidebarOpen()"
        mode="side"
        class="sidebar"
      >
        <div class="sidebar-header">
          <mat-icon class="sidebar-logo">group</mat-icon>
          <span class="sidebar-brand">Employee Mandiri</span>
        </div>

        <mat-nav-list class="sidebar-nav">
          <a
            mat-list-item
            routerLink="/home"
            routerLinkActive="active-link"
            [routerLinkActiveOptions]="{ exact: true }"
          >
            <mat-icon matListItemIcon>dashboard</mat-icon>
            <span matListItemTitle>Dashboard</span>
          </a>
          <a
            mat-list-item
            routerLink="/employees"
            routerLinkActive="active-link"
            [routerLinkActiveOptions]="{ exact: true }"
          >
            <mat-icon matListItemIcon>people</mat-icon>
            <span matListItemTitle>Employees</span>
          </a>
          <a
            mat-list-item
            routerLink="/employees/add"
            routerLinkActive="active-link"
          >
            <mat-icon matListItemIcon>person_add</mat-icon>
            <span matListItemTitle>Add Employee</span>
          </a>
        </mat-nav-list>

        <div class="sidebar-footer">
          <div class="user-info">
            <mat-icon>account_circle</mat-icon>
            <span>{{ authService.getUser()?.fullName }}</span>
          </div>
          <button mat-icon-button (click)="logout()" title="Logout">
            <mat-icon>logout</mat-icon>
          </button>
        </div>
      </mat-sidenav>

      <mat-sidenav-content class="content-area">
        <mat-toolbar class="mobile-header">
          <button mat-icon-button (click)="toggleSidebar()">
            <mat-icon>menu</mat-icon>
          </button>
          <span>Employee Mandiri</span>
          <span class="toolbar-spacer"></span>
          <button mat-icon-button (click)="logout()" title="Logout">
            <mat-icon>logout</mat-icon>
          </button>
        </mat-toolbar>

        <main class="main-content">
          <router-outlet />
        </main>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {
  protected authService = inject(AuthService);
  private router = inject(Router);
  protected sidebarOpen = signal(window.innerWidth > 768);

  toggleSidebar(): void {
    this.sidebarOpen.update((v) => !v);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
