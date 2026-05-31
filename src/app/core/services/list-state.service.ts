import { Injectable, signal } from '@angular/core';
import { Employee, EmployeeListState } from '../models/employee.model';

@Injectable({ providedIn: 'root' })
export class ListStateService {
  private state = signal<EmployeeListState>({
    searchTerm: '',
    searchGroup: '',
    sortField: 'firstName',
    sortDirection: 'asc',
    pageSize: 10,
    currentPage: 1,
  });

  readonly stateValue = this.state.asReadonly();

  updateSearchTerm(term: string): void {
    this.state.update((s) => ({ ...s, searchTerm: term, currentPage: 1 }));
  }

  updateSearchGroup(group: string): void {
    this.state.update((s) => ({ ...s, searchGroup: group, currentPage: 1 }));
  }

  updateSort(field: keyof Employee): void {
    this.state.update((s) => ({
      ...s,
      sortField: field,
      sortDirection:
        s.sortField === field && s.sortDirection === 'asc' ? 'desc' : 'asc',
      currentPage: 1,
    }));
  }

  updatePageSize(size: number): void {
    this.state.update((s) => ({ ...s, pageSize: size, currentPage: 1 }));
  }

  updatePage(page: number): void {
    this.state.update((s) => ({ ...s, currentPage: page }));
  }

  resetFilters(): void {
    this.state.update((s) => ({
      ...s,
      searchTerm: '',
      searchGroup: '',
      currentPage: 1,
    }));
  }
}
