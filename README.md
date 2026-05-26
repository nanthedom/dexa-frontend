# Dexa Attendance - Frontend

# Table of Contents

- [Dexa Attendance - Frontend](#dexa-attendance---frontend)
- [Table of Contents](#table-of-contents)
- [Key Features](#key-features)
  - [Authentication](#authentication)
  - [Employee Role](#employee-role)
  - [HRD (Human Resources Department) Role](#hrd-human-resources-department-role)
  - [Utility Features](#utility-features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
  - [Prerequisites](#prerequisites)
  - [1. Clone Repository](#1-clone-repository)
  - [2. Install Dependencies](#2-install-dependencies)
  - [3. Setup Environment Variables](#3-setup-environment-variables)
  - [4. Run Development Server](#4-run-development-server)
  - [5. Open Application](#5-open-application)
- [Preview](#preview)
  - [Login](#login)
    - [Login Page](#login-page)
    - [Login Validation Error](#login-validation-error)
  - [Dashboard](#dashboard)
    - [Dashboard Overview](#dashboard-overview)
    - [Dashboard Employee (No Menu)](#dashboard-employee-no-menu)
    - [Dashboard Open State](#dashboard-open-state)
    - [Checked In Status](#checked-in-status)
  - [Attendance](#attendance)
    - [Check In Dialog](#check-in-dialog)
    - [Check Out Dialog Open](#check-out-dialog-open)
    - [Fill Check Out Form](#fill-check-out-form)
    - [Attendance Detail](#attendance-detail)
  - [User Management](#user-management)
    - [User Management Table](#user-management-table)
    - [Add User](#add-user)
    - [Edit User](#edit-user)
    - [User Detail](#user-detail)
    - [Search User](#search-user)
    - [Monitor User Attendance](#monitor-user-attendance)
    - [All Attendance History](#all-attendance-history)
- [License](#license)

---

Dexa Attendance is a web-based employee attendance management system designed to simplify daily attendance tracking for employees while providing HRD with a centralized dashboard for monitoring attendance activities and managing employee accounts in real-time.

---

# Key Features

## Authentication
* **Login:** Secure authentication using JWT-based access tokens.
* **Logout:** Clear session handling for secure sign out.
* **Role-Based Guard:** Protected routes and pages based on user roles (`EMPLOYEE` and `HRD`).

---

## Employee Role
Employee role represents standard personnel within the company. They have access to a personal dashboard focused on their own attendance activities through a simple and responsive interface.

* **Profile Information:** View personal employee information and account details.
* **Today Attendance Status:** Real-time attendance status display for the current day.
* **Check-In & Check-Out:** Perform daily attendance actions quickly and efficiently.
* **Photo Attachment Support:** Mandatory photo upload with optional notes to improve attendance validation.
* **Personal Attendance History:** Access personal attendance records with pagination and date-range filtering.

---

## HRD (Human Resources Department) Role
HRD role acts as the system administrator. HRD personnel inherit all foundational employee features alongside an exclusive suite of administrative tools.
* **User Management:** CRUD operations (*Create, Read, Update, Delete*) to manage employee accounts.
* **Attendance Monitoring:** View all time employee attendance records in real-time.
* **Employee Attendance Detail:** Monitor specific employee attendance logs complete with filtering and detailed attendance information.
* **Role Management:** Manage employee access roles (`HRD` or `EMPLOYEE`).

---

## Utility Features

* **Smart Search & Filtering:** Optimized employee search using a debounced search mechanism to reduce unnecessary API requests.
* **Pagination Support:** Efficient large-scale data rendering with server-side pagination.
* **Form Validation:** Comprehensive frontend validation for all required user and attendance forms.
* **Responsive UI:** Clean and responsive design optimized for desktop & mobile usage.
* **Loading & Error States:** Better user experience with skeleton loaders, validation feedback, and error handling.

---

# Tech Stack

* **Framework:** [Next.js](https://nextjs.org/) (App Router, React 19)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **State Management & Data Fetching:** [TanStack React Query v5](https://tanstack.com/query/latest) (for automated cache management, background refetching, and server state synchronization)
* **UI Components:** [Shadcn UI](https://ui.shadcn.com/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Icons:** [Lucide React](https://lucide.dev/)
* **Notifications:** [Sonner](https://sonner.emilkowal.ski/)
* **HTTP Client:** Axios

---

# Quick Start

Follow these steps to run the project locally.

## Prerequisites

Make sure you have installed:

* [Node.js](https://nodejs.org/) (v18 or newer recommended)
* NPM / Yarn / PNPM / Bun

---

## 1. Clone Repository

```bash
git clone https://github.com/nanthedom/dexa-frontend.git

cd dexa-frontend

git checkout main
```

---

## 2. Install Dependencies

Using NPM:

```bash
npm install
```

Using Yarn:

```bash
yarn install
```

Using PNPM:

```bash
pnpm install
```

---

## 3. Setup Environment Variables

Create a `.env` file in the project root:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3010/api
```

Adjust the API URL according to your backend server configuration.

**Backend setup and API configuration can be found in the backend repository setup section.**

---

## 4. Run Development Server

Using NPM:

```bash
npm run dev
```

Using Yarn:

```bash
yarn dev
```

Using PNPM:

```bash
pnpm dev
```

---

## 5. Open Application

Open your browser and visit:

```bash
http://localhost:3000
```

---

# Preview

- See the preview below
- Explore the system further for the complete experience.

## Login

### Login Page
![Login Page](./docs/login.png)

### Login Validation Error
![Login Error](./docs/login-error.png)

---

## Dashboard

### Dashboard Overview
![Dashboard](./docs/dashboard.png)

### Dashboard Employee (No Menu)
![Dashboard Employee](./docs/dashboard-employee.png)

### Dashboard Open State
![Dashboard Open](./docs/dashboard-open.png)

### Checked In Status
![Checked In](./docs/checked-in.png)

---

## Attendance

### Check In Dialog
![Check In](./docs/check-in.png)

### Check Out Dialog Open
![Check Out Open](./docs/check-out-open.png)

### Fill Check Out Form
![Fill Check Out](./docs/fill-check-out.png)

### Attendance Detail
![Attendance Detail](./docs/attendance-detail.png)

---

## User Management

### User Management Table
![User Management](./docs/user-management.png)

### Add User
![Add User](./docs/add-user.png)

### Edit User
![Edit User](./docs/edit-user.png)

### User Detail
![User Detail](./docs/detail-user.png)

### Search User
![Search User](./docs/search-user.png)

### Monitor User Attendance
![Monitor User](./docs/monitor-user.png)

### All Attendance History
![All Attendance History](./docs/all-attendance-history.png)

---

# License

This project is developed for technical assessment and internal development purposes.