import { Component, computed, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EmployeeService } from '../../core/services/employee.service';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [
    DatePipe,
    CurrencyPipe,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatSnackBarModule,
  ],
  template: `
    <div class="page-container fade-in">
      <div class="page-header">
        <h1 class="page-title">
          <mat-icon>person</mat-icon>
          Employee Detail
        </h1>
      </div>

      @if (employee(); as emp) {
        <mat-card class="detail-card">
          <div class="detail-header">
            <div class="avatar-large">
              {{ emp.firstName[0] }}{{ emp.lastName[0] }}
            </div>
            <div class="detail-title">
              <h2>{{ emp.firstName }} {{ emp.lastName }}</h2>
              <p class="text-muted">{{ emp.username }} · {{ emp.group }}</p>
            </div>
            <span class="status-badge" [class]="'status-' + emp.status.toLowerCase().replace(' ', '-')">
              {{ emp.status }}
            </span>
          </div>

          <mat-divider></mat-divider>

          <div class="detail-body">
            <div class="detail-section">
              <h3>Personal Information</h3>
              <div class="detail-grid">
                <div class="detail-item">
                  <span class="detail-label">Username</span>
                  <span class="detail-value">{{ emp.username }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Email</span>
                  <span class="detail-value">{{ emp.email }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Birth Date</span>
                  <span class="detail-value">{{ emp.birthDate | date:'MMMM d, yyyy' }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Age</span>
                  <span class="detail-value">{{ calculateAge(emp.birthDate) }} years</span>
                </div>
              </div>
            </div>

            <mat-divider></mat-divider>

            <div class="detail-section">
              <h3>Employment Details</h3>
              <div class="detail-grid">
                <div class="detail-item">
                  <span class="detail-label">Employee ID</span>
                  <span class="detail-value">{{ emp.id }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Group</span>
                  <span class="detail-value">{{ emp.group }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Status</span>
                  <span class="detail-value">
                    <span class="status-badge" [class]="'status-' + emp.status.toLowerCase().replace(' ', '-')">
                      {{ emp.status }}
                    </span>
                  </span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Basic Salary</span>
                  <span class="detail-value salary-value">
                    {{ emp.basicSalary | currency:'Rp ':'symbol':'1.2-2' }}
                  </span>
                </div>
              </div>
            </div>

            <mat-divider></mat-divider>

            <div class="detail-section">
              <h3>Description</h3>
              <p class="description-text">{{ emp.description }}</p>
            </div>
          </div>

          <mat-divider></mat-divider>

          <div class="detail-actions">
            <button mat-stroked-button (click)="goBack()">
              <mat-icon>arrow_back</mat-icon>
              OK
            </button>
            <button mat-raised-button color="primary" [routerLink]="['/employees', emp.id, 'edit']">
              <mat-icon>edit</mat-icon>
              Edit
            </button>
          </div>
        </mat-card>
      } @else {
        <mat-card class="detail-card">
          <div class="empty-state">
            <mat-icon>person_off</mat-icon>
            <p>Employee not found.</p>
            <button mat-raised-button color="primary" routerLink="/employees">
              <mat-icon>arrow_back</mat-icon>
              Back to List
            </button>
          </div>
        </mat-card>
      }
    </div>
  `,
  styleUrl: './employee-detail.component.scss',
})
export class EmployeeDetailComponent {
  private employeeService = inject(EmployeeService);
  private router = inject(Router);

  readonly id = input.required<string>();

  protected employee = computed(() => this.employeeService.getEmployeeById(this.id()));

  protected calculateAge(birthDate: Date): number {
    const diff = Date.now() - new Date(birthDate).getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  }

  protected goBack(): void {
    this.router.navigate(['/employees']);
  }
}
