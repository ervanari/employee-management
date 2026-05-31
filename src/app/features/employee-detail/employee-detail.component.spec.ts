import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeeDetailComponent } from './employee-detail.component';
import { EmployeeService } from '../../core/services/employee.service';

describe('EmployeeDetailComponent', () => {
  let component: EmployeeDetailComponent;
  let fixture: ComponentFixture<EmployeeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeDetailComponent, NoopAnimationsModule],
      providers: [
        provideRouter([]),
        EmployeeService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate age correctly', () => {
    const birthDate = new Date('1990-06-01');
    const age = component['calculateAge'](birthDate);
    expect(age).toBeGreaterThanOrEqual(34);
    expect(age).toBeLessThanOrEqual(36);
  });

  it('should return undefined for non-existent employee', () => {
    const emp = component['employeeService'].getEmployeeById('NONEXISTENT');
    expect(emp).toBeUndefined();
  });
});
