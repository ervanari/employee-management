import { Injectable, signal, computed } from '@angular/core';
import { Employee, EMPLOYEE_GROUPS, EMPLOYEE_STATUSES } from '../models/employee.model';

function generateDummyEmployees(): Employee[] {
  const firstNames = ['Adi', 'Budi', 'Citra', 'Dewi', 'Eko', 'Fitri', 'Gilang', 'Hana', 'Irfan', 'Juni',
    'Kartika', 'Leo', 'Maya', 'Nanda', 'Oscar', 'Putri', 'Qori', 'Rizky', 'Sari', 'Teguh',
    'Umar', 'Vina', 'Wahyu', 'Xena', 'Yusuf', 'Zara', 'Agus', 'Bella', 'Candra', 'Dina',
    'Edi', 'Fajar', 'Gita', 'Hendra', 'Indah', 'Joko', 'Kiki', 'Lina', 'Mega', 'Novi',
    'Oki', 'Pram', 'Queen', 'Rudi', 'Sinta', 'Tono', 'Uci', 'Vero', 'Winda', 'Yoga'];
  const lastNames = ['Pratama', 'Wijaya', 'Kusuma', 'Santoso', 'Nugroho', 'Hartono', 'Saputra', 'Gunawan',
    'Wibowo', 'Hidayat', 'Suryadi', 'Purnomo', 'Setiawan', 'Firmansyah', 'Lestari', 'Utami',
    'Wulandari', 'Permadi', 'Siregar', 'Nasution'];
  const statuses = EMPLOYEE_STATUSES;
  const groups = EMPLOYEE_GROUPS;

  return Array.from({ length: 100 }, (_, i) => {
    const firstName = firstNames[i % firstNames.length];
    const lastName = lastNames[i % lastNames.length];
    const year = Math.floor(Math.random() * 30) + 1970;
    const month = Math.floor(Math.random() * 12) + 1;
    const day = Math.floor(Math.random() * 28) + 1;
    const salary = Math.floor(Math.random() * 20000000) + 3000000;

    return {
      id: `EMP${String(i + 1).padStart(4, '0')}`,
      username: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i + 1}`,
      firstName,
      lastName,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i + 1}@company.com`,
      birthDate: new Date(year, month - 1, day),
      basicSalary: salary,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      group: groups[Math.floor(Math.random() * groups.length)],
      description: `Employee ${firstName} ${lastName} joined in ${Math.floor(Math.random() * 10) + 2015}.`,
    };
  });
}

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private employees = signal<Employee[]>(generateDummyEmployees());

  readonly employeeList = computed(() => this.employees());

  getEmployeeById(id: string): Employee | undefined {
    return this.employees().find((e) => e.id === id);
  }

  addEmployee(employee: Omit<Employee, 'id'>): Employee {
    const maxId = this.employees().reduce(
      (max, e) => Math.max(max, Number(e.id.replace('EMP', ''))),
      0
    );
    const newEmployee: Employee = {
      ...employee,
      id: `EMP${String(maxId + 1).padStart(4, '0')}`,
    };
    this.employees.update((list) => [newEmployee, ...list]);
    return newEmployee;
  }

  updateEmployee(id: string, changes: Partial<Employee>): void {
    this.employees.update((list) =>
      list.map((e) => (e.id === id ? { ...e, ...changes } : e))
    );
  }

  deleteEmployee(id: string): void {
    this.employees.update((list) => list.filter((e) => e.id !== id));
  }
}
