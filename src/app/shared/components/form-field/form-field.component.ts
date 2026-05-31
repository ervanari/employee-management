import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

export type FieldType = 'text' | 'email' | 'number' | 'select' | 'date' | 'textarea';

export interface SelectOption {
  value: string;
  label: string;
}

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
  ],
  template: `
    <mat-form-field
      class="form-field-wrapper"
      [class.full-width]="fullWidth()"
      appearance="outline"
      subscriptSizing="dynamic"
    >
      @if (label()) {
        <mat-label>{{ label() }}</mat-label>
      }

      @if (type() === 'date') {
        <input
          matInput
          [matDatepicker]="picker"
          [ngModel]="value()"
          (ngModelChange)="valueChange.emit($event)"
          [required]="required()"
          [max]="maxDate()"
          [disabled]="disabled()"
          (click)="picker.open()"
        />
        <mat-datepicker #picker></mat-datepicker>
      } @else {
        @switch (type()) {
          @case ('select') {
            <mat-select
              [ngModel]="value()"
              (ngModelChange)="valueChange.emit($event)"
              [required]="required()"
              [disabled]="disabled()"
            >
              @for (option of options(); track option.value) {
                <mat-option [value]="option.value">
                  {{ option.label }}
                </mat-option>
              }
            </mat-select>
          }
          @case ('textarea') {
            <textarea
              matInput
              [ngModel]="value()"
              (ngModelChange)="valueChange.emit($event)"
              [required]="required()"
              [disabled]="disabled()"
              rows="3"
            ></textarea>
          }
          @case ('number') {
            <input
              matInput
              type="number"
              [ngModel]="value()"
              (ngModelChange)="valueChange.emit($event)"
              [required]="required()"
              [disabled]="disabled()"
              [placeholder]="placeholder()"
            />
          }
          @default {
            <input
              matInput
              [type]="type()"
              [ngModel]="value()"
              (ngModelChange)="valueChange.emit($event)"
              [required]="required()"
              [disabled]="disabled()"
              [placeholder]="placeholder()"
            />
          }
        }
      }

      @if (hint()) {
        <mat-hint>{{ hint() }}</mat-hint>
      }

      @if (errorText()) {
        <mat-error>{{ errorText() }}</mat-error>
      }
    </mat-form-field>
  `,
  styles: `
    .form-field-wrapper {
      width: 100%;

      &.full-width {
        grid-column: 1 / -1;
      }
    }
  `,
})
export class FormFieldComponent {
  readonly type = input<FieldType>('text');
  readonly label = input('');
  readonly value = input<any>();
  readonly valueChange = output<any>();
  readonly required = input(false);
  readonly disabled = input(false);
  readonly placeholder = input('');
  readonly hint = input('');
  readonly errorText = input('');
  readonly options = input<SelectOption[]>([]);
  readonly fullWidth = input(false);
  readonly maxDate = input<Date | null>(null);
}
