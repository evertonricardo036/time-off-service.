# Technical Requirement Document (TRD) - Time-Off Service

## 1. Objective
Create a microservice to manage time-off requests, ensuring data integrity between ExampleHR and the HCM (Source of Truth).

## 2. Technical Stack
* Framework: NestJS
* Database: SQLite (via TypeORM)
* Language: TypeScript

## 3. Core Features
* **Balance Synchronization**: Sync local balances with HCM daily.
* **Request Validation**: Before approving a request, check if the employee has enough balance per location.
* **Conflict Management**: Prevent double-spending of time-off hours.

## 4. Database Schema
* **Balance**: employeeId, locationId, amount, lastSync.

## 5. Implementation Notes & Reliability
* **Idempotency**: The `sync` endpoint is designed to be idempotent. It uses a "find-or-create" logic to ensure that repeated calls with the same `employeeId` and `locationId` update the existing balance rather than creating duplicate entries.
* **Testing Strategy**: Automated Unit Tests were implemented to validate the idempotency logic, ensuring the service remains reliable across environment changes.
* **Architecture**: Follows NestJS best practices with a clear separation between Controllers (entry points) and Services (business logic).