import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeeAddComponent } from './employee-add.component';
import { EmployeeService } from '../../core/services/employee.service';

describe('EmployeeAddComponent', () => {
  let component: EmployeeAddComponent;
  let fixture: ComponentFixture<EmployeeAddComponent>;
  let employeeService: EmployeeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeAddComponent, NoopAnimationsModule],
      providers: [
        provideRouter([]),
        EmployeeService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeAddComponent);
    component = fixture.componentInstance;
    employeeService = TestBed.inject(EmployeeService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have empty form model initially', () => {
    const model = component['model'];
    expect(model.username).toBe('');
    expect(model.firstName).toBe('');
    expect(model.lastName).toBe('');
    expect(model.email).toBe('');
    expect(model.birthDate).toBeNull();
    expect(model.basicSalary).toBeNull();
    expect(model.status).toBe('');
    expect(model.group).toBe('');
    expect(model.description).toBe('');
  });

  it('should have group options', () => {
    expect(component['groupOptions'].length).toBe(10);
    expect(component['groupOptions'][0].value).toBe('Engineering');
  });

  it('should have status options', () => {
    expect(component['statusOptions'].length).toBe(5);
    expect(component['statusOptions'][0].value).toBe('Active');
  });

  it('should validate email format', () => {
    component['model'].email = 'invalid';
    const form = jasmine.createSpyObj('NgForm', [], { submitted: true });
    const error = component['emailError'](form);
    expect(error).toBe('Invalid email format');
  });

  it('should accept valid email', () => {
    component['model'].email = 'test@company.com';
    const form = jasmine.createSpyObj('NgForm', [], { submitted: true });
    const error = component['emailError'](form);
    expect(error).toBe('');
  });

  it('should validate salary is required', () => {
    component['model'].basicSalary = null;
    const form = jasmine.createSpyObj('NgForm', [], { submitted: true });
    const error = component['salaryError'](form);
    expect(error).toBe('Salary is required');
  });

  it('should add employee on valid submit', () => {
    spyOn(employeeService, 'addEmployee').and.callThrough();
    const initialCount = employeeService.employeeList().length;

    component['model'] = {
      username: 'new.user',
      firstName: 'New',
      lastName: 'User',
      email: 'new@company.com',
      birthDate: new Date('1995-05-15'),
      basicSalary: 7500000,
      status: 'Active',
      group: 'Marketing',
      description: 'New employee description',
    };

    const form = jasmine.createSpyObj('NgForm', [], { valid: true });
    component['onSubmit'](form);

    expect(employeeService.addEmployee).toHaveBeenCalled();
    expect(employeeService.employeeList().length).toBe(initialCount + 1);
  });
});
