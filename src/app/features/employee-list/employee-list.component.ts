import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { EmployeeService } from '../../core/services/employee.service';
import { ListStateService } from '../../core/services/list-state.service';
import { Employee, EMPLOYEE_GROUPS } from '../../core/models/employee.model';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CurrencyPipe,
    FormsModule,
    RouterLink,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatDialogModule,
    MatCardModule,
  ],
  template: `
    <div class="page-container fade-in">
      <div class="page-header">
        <h1 class="page-title">
          <mat-icon>people</mat-icon>
          Employees
        </h1>
        <button mat-raised-button color="primary" routerLink="/employees/add">
          <mat-icon>add</mat-icon>
          Add Employee
        </button>
      </div>

      <mat-card class="filter-card">
        <div class="filter-row">
          <mat-form-field appearance="outline" subscriptSizing="dynamic">
            <mat-label>Search</mat-label>
            <input
              matInput
              [ngModel]="state().searchTerm"
              (ngModelChange)="onSearchTerm($event)"
              placeholder="Name or email..."
            />
            @if (state().searchTerm) {
              <button mat-icon-button matSuffix (click)="onSearchTerm('')">
                <mat-icon>close</mat-icon>
              </button>
            } @else {
              <mat-icon matSuffix>search</mat-icon>
            }
          </mat-form-field>

          <mat-form-field appearance="outline" subscriptSizing="dynamic">
            <mat-label>Group</mat-label>
            <mat-select
              [ngModel]="state().searchGroup"
              (ngModelChange)="onSearchGroup($event)"
            >
              <mat-option value="">All Groups</mat-option>
              @for (group of groups; track group) {
                <mat-option [value]="group">{{ group }}</mat-option>
              }
            </mat-select>
            @if (state().searchGroup) {
              <button mat-icon-button matSuffix (click)="onSearchGroup(''); $event.stopPropagation()">
                <mat-icon>close</mat-icon>
              </button>
            }
          </mat-form-field>

          <mat-form-field appearance="outline" subscriptSizing="dynamic">
            <mat-label>Per page</mat-label>
            <mat-select
              [ngModel]="state().pageSize"
              (ngModelChange)="onPageSizeChange($event)"
            >
              <mat-option [value]="5">5</mat-option>
              <mat-option [value]="10">10</mat-option>
              <mat-option [value]="25">25</mat-option>
              <mat-option [value]="50">50</mat-option>
              <mat-option [value]="100">100</mat-option>
            </mat-select>
          </mat-form-field>
        </div>
      </mat-card>

      <mat-card class="table-card">
        <div class="table-wrapper">
          <table mat-table [dataSource]="paginatedEmployees()" class="employee-table">
            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef (click)="onSort('firstName')" class="sortable">
                Name
                @if (state().sortField === 'firstName') {
                  <mat-icon class="sort-icon">
                    {{ state().sortDirection === 'asc' ? 'arrow_upward' : 'arrow_downward' }}
                  </mat-icon>
                }
              </th>
              <td mat-cell *matCellDef="let emp">
                <div class="employee-name-cell">
                  <div class="employee-avatar">{{ emp.firstName[0] }}{{ emp.lastName[0] }}</div>
                  <div>
                    <div class="employee-fullname">{{ emp.firstName }} {{ emp.lastName }}</div>
                    <div class="employee-username">{{ emp.username }}</div>
                  </div>
                </div>
              </td>
            </ng-container>

            <ng-container matColumnDef="email">
              <th mat-header-cell *matHeaderCellDef>Email</th>
              <td mat-cell *matCellDef="let emp">{{ emp.email }}</td>
            </ng-container>

            <ng-container matColumnDef="group">
              <th mat-header-cell *matHeaderCellDef (click)="onSort('group')" class="sortable">
                Group
                @if (state().sortField === 'group') {
                  <mat-icon class="sort-icon">
                    {{ state().sortDirection === 'asc' ? 'arrow_upward' : 'arrow_downward' }}
                  </mat-icon>
                }
              </th>
              <td mat-cell *matCellDef="let emp">
                <span class="group-badge">{{ emp.group }}</span>
              </td>
            </ng-container>

            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef>Status</th>
              <td mat-cell *matCellDef="let emp">
                <span class="status-badge" [class]="'status-' + emp.status.toLowerCase().replace(' ', '-')">
                  {{ emp.status }}
                </span>
              </td>
            </ng-container>

            <ng-container matColumnDef="basicSalary">
              <th mat-header-cell *matHeaderCellDef (click)="onSort('basicSalary')" class="sortable">
                Salary
                @if (state().sortField === 'basicSalary') {
                  <mat-icon class="sort-icon">
                    {{ state().sortDirection === 'asc' ? 'arrow_upward' : 'arrow_downward' }}
                  </mat-icon>
                }
              </th>
              <td mat-cell *matCellDef="let emp" class="salary-cell">
                {{ emp.basicSalary | currency:'Rp ':'symbol':'1.2-2' }}
              </td>
            </ng-container>

            <ng-container matColumnDef="action">
              <th mat-header-cell *matHeaderCellDef>Action</th>
              <td mat-cell *matCellDef="let emp">
                <div class="action-buttons">
                  <button
                    mat-mini-fab
                    class="btn-edit"
                    (click)="onEdit(emp)"
                    matTooltip="Edit employee"
                  >
                    <mat-icon>edit</mat-icon>
                  </button>
                  <button
                    mat-mini-fab
                    class="btn-delete"
                    (click)="onDelete(emp)"
                    matTooltip="Delete employee"
                  >
                    <mat-icon>delete</mat-icon>
                  </button>
                </div>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr
              mat-row
              *matRowDef="let row; columns: displayedColumns"
              (click)="onRowClick(row)"
              class="clickable-row"
            ></tr>

            @if (filteredEmployees().length === 0) {
              <tr class="mat-row">
                <td class="mat-cell" [colSpan]="displayedColumns.length">
                  <div class="empty-state">
                    <mat-icon>search_off</mat-icon>
                    <p>No employees found matching your filters.</p>
                  </div>
                </td>
              </tr>
            }
          </table>
        </div>

        <mat-paginator
          [length]="filteredEmployees().length"
          [pageSize]="state().pageSize"
          [pageIndex]="state().currentPage - 1"
          (page)="onPageChange($event)"
          showFirstLastButtons
        >
        </mat-paginator>
      </mat-card>
    </div>
  `,
  styleUrl: './employee-list.component.scss',
})
export class EmployeeListComponent {
  private employeeService = inject(EmployeeService);
  protected listState = inject(ListStateService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  protected state = this.listState.stateValue;
  protected displayedColumns = ['name', 'email', 'group', 'status', 'basicSalary', 'action'];
  protected groups = EMPLOYEE_GROUPS;

  protected filteredEmployees = computed(() => {
    const employees = this.employeeService.employeeList();
    const s = this.state();

    let filtered = employees;

    if (s.searchTerm) {
      const term = s.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (e) =>
          e.firstName.toLowerCase().includes(term) ||
          e.lastName.toLowerCase().includes(term) ||
          e.email.toLowerCase().includes(term) ||
          e.username.toLowerCase().includes(term)
      );
    }

    if (s.searchGroup) {
      filtered = filtered.filter((e) => e.group === s.searchGroup);
    }

    filtered.sort((a, b) => {
      const aVal = a[s.sortField];
      const bVal = b[s.sortField];
      const dir = s.sortDirection === 'asc' ? 1 : -1;

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return aVal.localeCompare(bVal) * dir;
      }
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return (aVal - bVal) * dir;
      }
      return 0;
    });

    return filtered;
  });

  protected paginatedEmployees = computed(() => {
    const filtered = this.filteredEmployees();
    const s = this.state();
    const start = (s.currentPage - 1) * s.pageSize;
    return filtered.slice(start, start + s.pageSize);
  });

  protected onSearchTerm(term: string): void {
    this.listState.updateSearchTerm(term);
  }

  protected onSearchGroup(group: string): void {
    this.listState.updateSearchGroup(group);
  }

  protected onSort(field: keyof Employee): void {
    this.listState.updateSort(field);
  }

  protected onPageSizeChange(size: number): void {
    this.listState.updatePageSize(size);
  }

  protected onPageChange(event: PageEvent): void {
    this.listState.updatePage(event.pageIndex + 1);
  }

  protected onRowClick(employee: Employee): void {
    this.router.navigate(['/employees', employee.id]);
  }

  protected onEdit(employee: Employee): void {
    this.snackBar.open(
      `Editing employee: ${employee.firstName} ${employee.lastName}`,
      'Close',
      { duration: 3000, panelClass: ['snackbar-edit'] }
    );
    this.router.navigate(['/employees', employee.id, 'edit']);
  }

  protected onDelete(employee: Employee): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Employee',
        message: `Are you sure you want to delete ${employee.firstName} ${employee.lastName}?`,
        confirmText: 'Delete',
        confirmColor: 'warn',
      },
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.employeeService.deleteEmployee(employee.id);
        this.snackBar.open(
          `Deleted: ${employee.firstName} ${employee.lastName}`,
          'Close',
          { duration: 3000, panelClass: ['snackbar-delete'] }
        );
      }
    });
  }
}
