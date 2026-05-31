import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <div class="page-container fade-in">
      <div class="page-header">
        <h1 class="page-title">
          <mat-icon>dashboard</mat-icon>
          Dashboard
        </h1>
      </div>

      <div class="stats-grid">
        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-icon" style="background: rgba(63,81,181,0.1); color: #3f51b5;">
              <mat-icon>people</mat-icon>
            </div>
            <div class="stat-info">
              <span class="stat-value">100</span>
              <span class="stat-label">Total Employees</span>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-icon" style="background: rgba(76,175,80,0.1); color: #4caf50;">
              <mat-icon>check_circle</mat-icon>
            </div>
            <div class="stat-info">
              <span class="stat-value">72</span>
              <span class="stat-label">Active</span>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-icon" style="background: rgba(255,152,0,0.1); color: #ff9800;">
              <mat-icon>schedule</mat-icon>
            </div>
            <div class="stat-info">
              <span class="stat-value">8</span>
              <span class="stat-label">On Leave</span>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-icon" style="background: rgba(244,67,54,0.1); color: #f44336;">
              <mat-icon>person_off</mat-icon>
            </div>
            <div class="stat-info">
              <span class="stat-value">15</span>
              <span class="stat-label">Inactive</span>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <div class="quick-actions">
        <h2>Quick Actions</h2>
        <div class="actions-grid">
          <a mat-raised-button color="primary" routerLink="/employees">
            <mat-icon>people</mat-icon>
            View Employees
          </a>
          <a mat-raised-button routerLink="/employees/add">
            <mat-icon>person_add</mat-icon>
            Add Employee
          </a>
        </div>
      </div>
    </div>
  `,
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
