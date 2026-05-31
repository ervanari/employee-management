export interface Employee {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: Date;
  basicSalary: number;
  status: string;
  group: string;
  description: string;
}

export interface EmployeeFormModel {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: Date | null;
  basicSalary: number | null;
  status: string;
  group: string;
  description: string;
}

export interface EmployeeListState {
  searchTerm: string;
  searchGroup: string;
  sortField: keyof Employee;
  sortDirection: 'asc' | 'desc';
  pageSize: number;
  currentPage: number;
}

export const EMPLOYEE_GROUPS: string[] = [
  'Engineering',
  'Marketing',
  'Finance',
  'Human Resources',
  'Operations',
  'Sales',
  'Design',
  'Legal',
  'Product',
  'Support',
];

export const EMPLOYEE_STATUSES: string[] = [
  'Active',
  'Inactive',
  'On Leave',
  'Terminated',
  'Probation',
];
