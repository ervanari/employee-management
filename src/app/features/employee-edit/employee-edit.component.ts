import { Component, computed, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { provideNativeDateAdapter } from '@angular/material/core';
import { EmployeeService } from '../../core/services/employee.service';
import { EMPLOYEE_GROUPS, EMPLOYEE_STATUSES } from '../../core/models/employee.model';
import { FormFieldComponent } from '../../shared/components/form-field/form-field.component';
import { SelectOption } from '../../shared/components/form-field/form-field.component';

@Component({
  selector: 'app-employee-edit',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    FormsModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    FormFieldComponent,
  ],
  template: `
    <div class="page-container fade-in">
      <div class="page-header">
        <h1 class="page-title">
          <mat-icon>edit</mat-icon>
          Edit Employee
        </h1>
      </div>

      @if (employee(); as emp) {
        <mat-card class="form-card">
          <form #form="ngForm" (ngSubmit)="onSubmit(form, emp)" class="employee-form">
            <div class="form-section">
              <h3>Personal Information</h3>

              <div class="form-row">
                <app-form-field
                  type="text"
                  label="Username"
                  [value]="emp.username"
                  (valueChange)="emp.username = $event"
                  [required]="true"
                />

                <app-form-field
                  type="text"
                  label="First Name"
                  [value]="emp.firstName"
                  (valueChange)="emp.firstName = $event"
                  [required]="true"
                />
              </div>

              <div class="form-row">
                <app-form-field
                  type="text"
                  label="Last Name"
                  [value]="emp.lastName"
                  (valueChange)="emp.lastName = $event"
                  [required]="true"
                />

                <app-form-field
                  type="email"
                  label="Email"
                  [value]="emp.email"
                  (valueChange)="emp.email = $event"
                  [required]="true"
                />
              </div>
            </div>

            <div class="form-section">
              <h3>Additional Details</h3>

              <div class="form-row">
                <app-form-field
                  type="date"
                  label="Birth Date"
                  [value]="emp.birthDate"
                  (valueChange)="emp.birthDate = $event"
                  [required]="true"
                  [maxDate]="today"
                />

                <app-form-field
                  type="number"
                  label="Basic Salary"
                  [value]="emp.basicSalary"
                  (valueChange)="emp.basicSalary = $event"
                  [required]="true"
                  hint="Enter numeric value"
                />
              </div>

              <div class="form-row">
                <app-form-field
                  type="select"
                  label="Group"
                  [value]="emp.group"
                  (valueChange)="emp.group = $event"
                  [required]="true"
                  [options]="groupOptions"
                />

                <app-form-field
                  type="select"
                  label="Status"
                  [value]="emp.status"
                  (valueChange)="emp.status = $event"
                  [required]="true"
                  [options]="statusOptions"
                />
              </div>

              <app-form-field
                type="textarea"
                label="Description"
                [value]="emp.description"
                (valueChange)="emp.description = $event"
                [required]="true"
                [fullWidth]="true"
              />
            </div>

            <div class="form-actions">
              <button type="button" mat-stroked-button routerLink="/employees">
                <mat-icon>cancel</mat-icon>
                Cancel
              </button>
              <button type="submit" mat-raised-button color="primary">
                <mat-icon>save</mat-icon>
                Update Employee
              </button>
            </div>
          </form>
        </mat-card>
      } @else {
        <mat-card class="form-card">
          <div class="empty-state">
            <mat-icon>person_off</mat-icon>
            <p>Employee not found.</p>
            <button mat-raised-button color="primary" routerLink="/employees">
              Back to List
            </button>
          </div>
        </mat-card>
      }
    </div>
  `,
  styleUrl: '../employee-add/employee-add.component.scss',
})
export class EmployeeEditComponent {
  private employeeService = inject(EmployeeService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  readonly id = input.required<string>();

  protected today = new Date();
  protected employee = computed(() => {
    const emp = this.employeeService.getEmployeeById(this.id());
    if (!emp) return null;
    return { ...emp, birthDate: new Date(emp.birthDate) };
  });

  protected groupOptions: SelectOption[] = EMPLOYEE_GROUPS.map((g) => ({
    value: g,
    label: g,
  }));

  protected statusOptions: SelectOption[] = EMPLOYEE_STATUSES.map((s) => ({
    value: s,
    label: s,
  }));

  protected onSubmit(form: NgForm, emp: NonNullable<ReturnType<typeof this.employee>>): void {
    if (!form.valid) return;
    if (!emp.username || !emp.firstName || !emp.lastName || !emp.email ||
        !emp.birthDate || !emp.basicSalary || !emp.status || !emp.group || !emp.description) {
      return;
    }

    this.employeeService.updateEmployee(this.id(), {
      username: emp.username,
      firstName: emp.firstName,
      lastName: emp.lastName,
      email: emp.email,
      birthDate: emp.birthDate,
      basicSalary: Number(emp.basicSalary),
      status: emp.status,
      group: emp.group,
      description: emp.description,
    });

    this.snackBar.open('Employee updated successfully!', 'Close', {
      duration: 3000,
      panelClass: ['snackbar-success'],
    });
    this.router.navigate(['/employees', this.id()]);
  }
}
