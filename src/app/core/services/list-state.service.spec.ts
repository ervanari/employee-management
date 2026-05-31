import { TestBed } from '@angular/core/testing';
import { ListStateService } from './list-state.service';

describe('ListStateService', () => {
  let service: ListStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('initial state', () => {
    it('should have default values', () => {
      const state = service.stateValue();
      expect(state.searchTerm).toBe('');
      expect(state.searchGroup).toBe('');
      expect(state.sortField).toBe('firstName');
      expect(state.sortDirection).toBe('asc');
      expect(state.pageSize).toBe(10);
      expect(state.currentPage).toBe(1);
    });
  });

  describe('updateSearchTerm', () => {
    it('should update search term', () => {
      service.updateSearchTerm('john');
      expect(service.stateValue().searchTerm).toBe('john');
    });

    it('should reset page to 1', () => {
      service.updatePage(3);
      service.updateSearchTerm('test');
      expect(service.stateValue().currentPage).toBe(1);
    });
  });

  describe('updateSearchGroup', () => {
    it('should update search group', () => {
      service.updateSearchGroup('Engineering');
      expect(service.stateValue().searchGroup).toBe('Engineering');
    });

    it('should reset page to 1', () => {
      service.updatePage(3);
      service.updateSearchGroup('Marketing');
      expect(service.stateValue().currentPage).toBe(1);
    });
  });

  describe('updateSort', () => {
    it('should update sort field', () => {
      service.updateSort('email');
      expect(service.stateValue().sortField).toBe('email');
    });

    it('should toggle sort direction when same field', () => {
      service.updateSort('firstName');
      expect(service.stateValue().sortDirection).toBe('desc');

      service.updateSort('firstName');
      expect(service.stateValue().sortDirection).toBe('asc');
    });

    it('should reset to asc for new field', () => {
      service.updateSort('firstName');
      service.updateSort('email');
      expect(service.stateValue().sortDirection).toBe('asc');
    });

    it('should reset page to 1', () => {
      service.updatePage(3);
      service.updateSort('email');
      expect(service.stateValue().currentPage).toBe(1);
    });
  });

  describe('updatePageSize', () => {
    it('should update page size', () => {
      service.updatePageSize(25);
      expect(service.stateValue().pageSize).toBe(25);
    });

    it('should reset page to 1', () => {
      service.updatePage(3);
      service.updatePageSize(25);
      expect(service.stateValue().currentPage).toBe(1);
    });
  });

  describe('updatePage', () => {
    it('should update current page', () => {
      service.updatePage(3);
      expect(service.stateValue().currentPage).toBe(3);
    });
  });

  describe('resetFilters', () => {
    it('should reset search and group filters', () => {
      service.updateSearchTerm('test');
      service.updateSearchGroup('Engineering');
      service.updatePage(3);

      service.resetFilters();
      const state = service.stateValue();
      expect(state.searchTerm).toBe('');
      expect(state.searchGroup).toBe('');
      expect(state.currentPage).toBe(1);
    });

    it('should preserve sort and page size', () => {
      service.updateSort('email');
      service.updatePageSize(50);
      service.resetFilters();

      const state = service.stateValue();
      expect(state.sortField).toBe('email');
      expect(state.pageSize).toBe(50);
    });
  });
});
