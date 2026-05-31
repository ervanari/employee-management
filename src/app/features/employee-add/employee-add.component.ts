import { Component, inject } from '@angular/core';
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
  selector: 'app-employee-add',
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
          <mat-icon>person_add</mat-icon>
          Add Employee
        </h1>
      </div>

      <mat-card class="form-card">
        <form #form="ngForm" (ngSubmit)="onSubmit(form)" class="employee-form">
          <div class="form-section">
            <h3>Personal Information</h3>

            <div class="form-row">
              <app-form-field
                type="text"
                label="Username"
                [value]="model.username"
                (valueChange)="model.username = $event"
                [required]="true"
                [errorText]="form.submitted && !model.username ? 'Username is required' : ''"
              />

              <app-form-field
                type="text"
                label="First Name"
                [value]="model.firstName"
                (valueChange)="model.firstName = $event"
                [required]="true"
                [errorText]="form.submitted && !model.firstName ? 'First name is required' : ''"
              />
            </div>

            <div class="form-row">
              <app-form-field
                type="text"
                label="Last Name"
                [value]="model.lastName"
                (valueChange)="model.lastName = $event"
                [required]="true"
                [errorText]="form.submitted && !model.lastName ? 'Last name is required' : ''"
              />

              <app-form-field
                type="email"
                label="Email"
                [value]="model.email"
                (valueChange)="model.email = $event"
                [required]="true"
                [errorText]="emailError(form)"
              />
            </div>
          </div>

          <div class="form-section">
            <h3>Additional Details</h3>

            <div class="form-row">
              <app-form-field
                type="date"
                label="Birth Date"
                [value]="model.birthDate"
                (valueChange)="model.birthDate = $event"
                [required]="true"
                [maxDate]="today"
                [errorText]="form.submitted && !model.birthDate ? 'Birth date is required' : ''"
              />

              <app-form-field
                type="number"
                label="Basic Salary"
                [value]="model.basicSalary"
                (valueChange)="model.basicSalary = $event"
                [required]="true"
                [errorText]="salaryError(form)"
              />
            </div>

            <div class="form-row">
              <app-form-field
                type="select"
                label="Group"
                [value]="model.group"
                (valueChange)="model.group = $event"
                [required]="true"
                [options]="groupOptions"
                [errorText]="form.submitted && !model.group ? 'Group is required' : ''"
              />

              <app-form-field
                type="select"
                label="Status"
                [value]="model.status"
                (valueChange)="model.status = $event"
                [required]="true"
                [options]="statusOptions"
                [errorText]="form.submitted && !model.status ? 'Status is required' : ''"
              />
            </div>

            <app-form-field
              type="textarea"
              label="Description"
              [value]="model.description"
              (valueChange)="model.description = $event"
              [required]="true"
              [fullWidth]="true"
              [errorText]="form.submitted && !model.description ? 'Description is required' : ''"
            />
          </div>

          <div class="form-actions">
            <button type="button" mat-stroked-button routerLink="/employees">
              <mat-icon>cancel</mat-icon>
              Cancel
            </button>
            <button type="submit" mat-raised-button color="primary">
              <mat-icon>save</mat-icon>
              Save Employee
            </button>
          </div>
        </form>
      </mat-card>
    </div>
  `,
  styleUrl: './employee-add.component.scss',
})
export class EmployeeAddComponent {
  private employeeService = inject(EmployeeService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  protected today = new Date();

  protected model = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    birthDate: null as Date | null,
    basicSalary: null as number | null,
    status: '',
    group: '',
    description: '',
  };

  protected groupOptions: SelectOption[] = EMPLOYEE_GROUPS.map((g) => ({
    value: g,
    label: g,
  }));

  protected statusOptions: SelectOption[] = EMPLOYEE_STATUSES.map((s) => ({
    value: s,
    label: s,
  }));

  protected emailError(form: NgForm): string {
    if (!form.submitted) return '';
    if (!this.model.email) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.model.email)) return 'Invalid email format';
    return '';
  }

  protected salaryError(form: NgForm): string {
    if (!form.submitted) return '';
    if (this.model.basicSalary === null || this.model.basicSalary === undefined) return 'Salary is required';
    if (isNaN(Number(this.model.basicSalary))) return 'Salary must be a number';
    return '';
  }

  protected onSubmit(form: NgForm): void {
    if (!form.valid) return;
    if (!this.isFormValid()) return;

    const employee = {
      username: this.model.username,
      firstName: this.model.firstName,
      lastName: this.model.lastName,
      email: this.model.email,
      birthDate: this.model.birthDate!,
      basicSalary: Number(this.model.basicSalary),
      status: this.model.status,
      group: this.model.group,
      description: this.model.description,
    };

    this.employeeService.addEmployee(employee);
    this.snackBar.open('Employee added successfully!', 'Close', {
      duration: 3000,
      panelClass: ['snackbar-success'],
    });
    this.router.navigate(['/employees']);
  }

  private isFormValid(): boolean {
    return (
      !!this.model.username &&
      !!this.model.firstName &&
      !!this.model.lastName &&
      !!this.model.email &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.model.email) &&
      !!this.model.birthDate &&
      this.model.basicSalary !== null &&
      !isNaN(Number(this.model.basicSalary)) &&
      !!this.model.status &&
      !!this.model.group &&
      !!this.model.description
    );
  }
}
