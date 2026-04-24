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