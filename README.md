# Employee Management Mandiri

Employee Management Mandiri System 

## Features

### Pages (6 pages)
| Page | Route | Description |
|------|-------|-------------|
| **Login** | `/login` | Authentication with hardcoded credentials |
| **Dashboard** | `/home` | Overview with stats and quick actions |
| **Employee List** | `/employees` | Table with paging, sorting, searching (AND), configurable page size |
| **Add Employee** | `/employees/add` | Form with validation, datetime picker, email validation, dropdown with search |
| **Employee Detail** | `/employees/:id` | Formatted employee info (salary as Rp. xx.xxx,xx) |
| **Edit Employee** | `/employees/:id/edit` | Pre-filled form to update employee data |
| **404 Not Found** | `/**` | Catch-all route |

## Prerequisites

- Node.js >= 18.19
- npm >= 9
- Angular CLI 19

## Setup

```bash
# Install dependencies
npm install

# Start development server
npm start
```

Navigate to `http://localhost:4200`.

## Login Credentials

| Username | Password |
|----------|----------|
| `admin`  | `admin123` |

## Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start dev server |
| `npm run build` | Production build |
| `npm test` | Run unit tests (headless Chrome) |
| `npm run test:watch` | Run tests in watch mode |
| `npm run typecheck` | TypeScript type checking |

## Project Architecture

```
src/
├── app/
│   ├── core/                        # Singleton services & guards
│   │   ├── models/
│   │   │   └── employee.model.ts    # Interfaces, constants
│   │   ├── services/
│   │   │   ├── auth.service.ts      # Authentication with Signals
│   │   │   ├── employee.service.ts  # CRUD with Signal state
│   │   │   └── list-state.service.ts# List filter/sort/page state
│   │   └── guards/
│   │       └── auth.guard.ts        # Route protection
│   ├── shared/                      # Reusable components
│   │   ├── components/
│   │   │   ├── form-field/          # Dynamic form field wrapper
│   │   │   └── confirm-dialog/      # Confirmation modal
│   │   └── constants/
│   ├── features/                    # Lazy-loaded page components
│   │   ├── login/
│   │   ├── home/
│   │   ├── employee-list/
│   │   ├── employee-add/
│   │   ├── employee-detail/
│   │   ├── employee-edit/
│   │   └── not-found/
│   └── layouts/
│       └── main-layout/            # Sidebar + toolbar shell
├── styles/                          # Global SCSS
│   ├── _variables.scss
│   ├── _mixins.scss
│   ├── _typography.scss
│   ├── _responsive.scss
│   └── styles.scss
└── environments/
```

## Testing

Unit tests use Jasmine + Karma:

```bash
# Run all tests
npm test

# Coverage report generated in /coverage
```

### Test Coverage
- `AuthService` — login/logout/isAuthenticated
- `EmployeeService` — CRUD operations
- `ListStateService` — filter/sort/page state management
- `AuthGuard` — route protection
- `LoginComponent` — form validation, auth flow
- `EmployeeListComponent` — filtering, sorting, pagination
- `EmployeeAddComponent` — form validation, submission
- `EmployeeDetailComponent` — age calculation, data display
