# Time-Off Service

A backend microservice for synchronizing employee time-off balances between an HR system (ExampleHR) and an HCM platform (source of truth). Built as a solution for **Wizdaa's technical challenge**.

## Tech Stack

- **NestJS**
- **TypeScript**
- **SQLite** (via TypeORM)

## Architecture

The project follows NestJS best practices, with a clear separation between:

```
Controllers  → entry points, handle HTTP requests
Services     → business logic and data integrity rules
```

## Core Features

- **Balance Synchronization** — syncs local time-off balances with the HCM system daily
- **Request Validation** — checks whether an employee has sufficient balance per location before approving a time-off request
- **Conflict Management** — prevents double-spending of time-off hours across concurrent requests
- **Idempotent Sync Endpoint** — the `sync` endpoint uses a find-or-create strategy, so repeated calls with the same `employeeId` and `locationId` update the existing balance instead of creating duplicates

## Database Schema

**Balance**
| Field | Description |
|-------|--------------|
| `employeeId` | Unique identifier for the employee |
| `locationId` | Identifier for the employee's location |
| `amount` | Current time-off balance |
| `lastSync` | Timestamp of the last synchronization |

## Testing

Automated unit tests validate the idempotency logic, ensuring the sync endpoint remains reliable across repeated calls and environment changes.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)

### Installation

```bash
# Clone the repository
git clone https://github.com/evertonricardo036/time-off-service.git

# Navigate to the project folder
cd time-off-service

# Install dependencies
npm install
```

### Running the project

```bash
npm run start
```

### Running tests

```bash
npm run test
```

## Context

This project was developed as a technical challenge for **Wizdaa**, focused on demonstrating backend architecture, data integrity handling, and reliability practices (idempotency, conflict prevention) in a realistic HR systems integration scenario.

## Future Improvements

- [ ] Authentication and authorization
- [ ] API documentation (Swagger)
- [ ] Integration tests with a real HCM mock
- [ ] Deployment pipeline

## Author

**Everton Ricardo da Silva Santos**
Full Stack Developer in training

[GitHub](https://github.com/evertonricardo036) · [LinkedIn](https://www.linkedin.com/in/everton-ricardo-santos-devv/)
