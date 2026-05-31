import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeeListComponent } from './employee-list.component';
import { EmployeeService } from '../../core/services/employee.service';
import { ListStateService } from '../../core/services/list-state.service';

describe('EmployeeListComponent', () => {
  let component: EmployeeListComponent;
  let fixture: ComponentFixture<EmployeeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeListComponent, NoopAnimationsModule],
      providers: [
        provideRouter([]),
        EmployeeService,
        ListStateService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 100 employees', () => {
    const employees = component['employeeService'].employeeList();
    expect(employees.length).toBe(100);
  });

  it('should filter employees by search term', () => {
    component['onSearchTerm']('Adi');
    fixture.detectChanges();
    const filtered = component['filteredEmployees']();
    expect(filtered.length).toBeGreaterThan(0);
    expect(
      filtered.every(
        (e) =>
          e.firstName.toLowerCase().includes('adi') ||
          e.lastName.toLowerCase().includes('adi') ||
          e.email.toLowerCase().includes('adi')
      )
    ).toBeTrue();
  });

  it('should filter employees by group', () => {
    component['onSearchGroup']('Engineering');
    fixture.detectChanges();
    const filtered = component['filteredEmployees']();
    expect(filtered.length).toBeGreaterThan(0);
    expect(filtered.every((e) => e.group === 'Engineering')).toBeTrue();
  });

  it('should paginate employees', () => {
    component['listState'].updatePageSize(10);
    fixture.detectChanges();
    const paginated = component['paginatedEmployees']();
    expect(paginated.length).toBeLessThanOrEqual(10);
  });

  it('should sort employees by name ascending', () => {
    component['onSort']('firstName');
    fixture.detectChanges();
    const filtered = component['filteredEmployees']();
    for (let i = 1; i < filtered.length; i++) {
      expect(
        filtered[i - 1].firstName.localeCompare(filtered[i].firstName)
      ).toBeLessThanOrEqual(0);
    }
  });

  it('should sort employees by name descending', () => {
    component['onSort']('firstName');
    component['onSort']('firstName');
    fixture.detectChanges();
    const filtered = component['filteredEmployees']();
    for (let i = 1; i < filtered.length; i++) {
      expect(
        filtered[i - 1].firstName.localeCompare(filtered[i].firstName)
      ).toBeGreaterThanOrEqual(0);
    }
  });

  it('should have displayed columns defined', () => {
    expect(component['displayedColumns']).toContain('name');
    expect(component['displayedColumns']).toContain('email');
    expect(component['displayedColumns']).toContain('action');
  });
});
