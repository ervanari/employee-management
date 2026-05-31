import { TestBed } from '@angular/core/testing';
import { EmployeeService } from './employee.service';

describe('EmployeeService', () => {
  let service: EmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('employeeList', () => {
    it('should return 100 dummy employees', () => {
      const employees = service.employeeList();
      expect(employees.length).toBe(100);
    });

    it('should have unique IDs', () => {
      const ids = service.employeeList().map((e) => e.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(100);
    });

    it('should have all required fields', () => {
      const emp = service.employeeList()[0];
      expect(emp.id).toBeTruthy();
      expect(emp.username).toBeTruthy();
      expect(emp.firstName).toBeTruthy();
      expect(emp.lastName).toBeTruthy();
      expect(emp.email).toBeTruthy();
      expect(emp.birthDate).toBeTruthy();
      expect(emp.basicSalary).toBeTruthy();
      expect(emp.status).toBeTruthy();
      expect(emp.group).toBeTruthy();
      expect(emp.description).toBeTruthy();
    });
  });

  describe('getEmployeeById', () => {
    it('should return employee by id', () => {
      const emp = service.getEmployeeById('EMP0001');
      expect(emp).toBeTruthy();
      expect(emp!.id).toBe('EMP0001');
    });

    it('should return undefined for non-existent id', () => {
      const emp = service.getEmployeeById('NONEXISTENT');
      expect(emp).toBeUndefined();
    });
  });

  describe('addEmployee', () => {
    it('should add new employee to the list', () => {
      const newEmp = {
        username: 'test.user',
        firstName: 'Test',
        lastName: 'User',
        email: 'test@company.com',
        birthDate: new Date('1990-01-01'),
        basicSalary: 5000000,
        status: 'Active',
        group: 'Engineering',
        description: 'Test employee',
      };

      const added = service.addEmployee(newEmp);
      expect(added.id).toBe('EMP0101');
      expect(added.firstName).toBe('Test');
      expect(service.employeeList().length).toBe(101);
    });

    it('should add at the beginning of the list', () => {
      const newEmp = {
        username: 'first.user',
        firstName: 'First',
        lastName: 'User',
        email: 'first@company.com',
        birthDate: new Date('1990-01-01'),
        basicSalary: 5000000,
        status: 'Active',
        group: 'Engineering',
        description: 'First employee',
      };

      service.addEmployee(newEmp);
      expect(service.employeeList()[0].id).toBe('EMP0101');
    });
  });

  describe('updateEmployee', () => {
    it('should update employee fields', () => {
      service.updateEmployee('EMP0001', { firstName: 'Updated', basicSalary: 9999999 });
      const emp = service.getEmployeeById('EMP0001');
      expect(emp!.firstName).toBe('Updated');
      expect(emp!.basicSalary).toBe(9999999);
    });

    it('should not affect other employees', () => {
      service.updateEmployee('EMP0001', { firstName: 'Changed' });
      const emp2 = service.getEmployeeById('EMP0002');
      expect(emp2!.firstName).not.toBe('Changed');
    });
  });

  describe('deleteEmployee', () => {
    it('should remove employee from list', () => {
      service.deleteEmployee('EMP0001');
      expect(service.getEmployeeById('EMP0001')).toBeUndefined();
      expect(service.employeeList().length).toBe(99);
    });
  });
});
