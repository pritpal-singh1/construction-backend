# Construction Management Backend API

A comprehensive NestJS-based backend API for construction management with PostgreSQL database.

## Features

- ✅ JWT Authentication
- ✅ Role-Based Access Control (RBAC)
- ✅ User Management
- ✅ Project Management
- ✅ Material Tracking
- ✅ Party/Vendor Management
- ✅ Detailed Billing System
- ✅ Payment Management
- ✅ PostgreSQL Database

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

2. Setup PostgreSQL database:
```bash
# Create database
createdb construction_db

# Or use psql
psql -U postgres
CREATE DATABASE construction_db;
```

3. Configure environment variables:
Create a `.env` file in the root directory:
```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=your_password
DATABASE_NAME=construction_db

JWT_SECRET=your-secret-key-change-this-in-production
JWT_EXPIRATION=24h

PORT=3000
```

## Running the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

The API will be available at `http://localhost:3000`

## Default Credentials

After first run, use these credentials:
- Email: `admin@construction.com`
- Password: `admin123`

**⚠️ Change these credentials immediately in production!**

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login
- `GET /auth/profile` - Get current user profile

### Users
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Roles
- `GET /roles` - Get all roles
- `POST /roles` - Create role
- `PUT /roles/:id` - Update role
- `DELETE /roles/:id` - Delete role

### Projects
- `GET /projects` - Get all projects
- `GET /projects/:id` - Get project by ID
- `GET /projects/:id/stats` - Get project statistics
- `POST /projects` - Create project
- `PUT /projects/:id` - Update project
- `DELETE /projects/:id` - Delete project

### Materials
- `GET /materials` - Get all materials
- `GET /materials/:id` - Get material by ID
- `POST /materials` - Create material
- `PUT /materials/:id` - Update material
- `DELETE /materials/:id` - Delete material

### Parties
- `GET /parties` - Get all parties
- `GET /parties/:id` - Get party by ID
- `GET /parties/:id/balance` - Get party balance
- `POST /parties` - Create party
- `PUT /parties/:id` - Update party
- `DELETE /parties/:id` - Delete party

### Bills
- `GET /bills` - Get all bills
- `GET /bills/:id` - Get bill by ID
- `GET /bills/generate/number` - Generate bill number
- `POST /bills` - Create bill
- `PUT /bills/:id` - Update bill
- `PUT /bills/:id/approve` - Approve bill
- `DELETE /bills/:id` - Delete bill

### Payments
- `GET /payments` - Get all payments
- `GET /payments/:id` - Get payment by ID
- `GET /payments/generate/number` - Generate payment number
- `POST /payments` - Create payment
- `PUT /payments/:id` - Update payment
- `DELETE /payments/:id` - Delete payment

## Database Schema

### Main Entities
- **Users** - User accounts with role-based permissions
- **Roles** - User roles with specific permissions
- **Projects** - Construction projects with detailed tracking
- **Materials** - Material inventory and purchases
- **Parties** - Suppliers, contractors, and other stakeholders
- **Bills** - Detailed billing with line items
- **Payments** - Payment tracking linked to bills

## Permissions

The system supports fine-grained permissions:
- User Management (CREATE, READ, UPDATE, DELETE)
- Project Management (CREATE, READ, UPDATE, DELETE)
- Material Management (CREATE, READ, UPDATE, DELETE)
- Party Management (CREATE, READ, UPDATE, DELETE)
- Bill Management (CREATE, READ, UPDATE, DELETE, APPROVE)
- Payment Management (CREATE, READ, UPDATE, DELETE)
- Report Management (READ, EXPORT)

## Development

```bash
# Run tests
npm run test

# Run linter
npm run lint

# Format code
npm run format
```

## Project Structure

```
src/
├── entities/          # TypeORM entities
├── modules/          # Feature modules
│   ├── auth/        # Authentication & JWT
│   ├── user/        # User management
│   ├── role/        # Role management
│   ├── project/     # Project management
│   ├── material/    # Material management
│   ├── party/       # Party management
│   ├── bill/        # Billing system
│   └── payment/     # Payment management
├── database/        # Database seeding
├── app.module.ts    # Root module
└── main.ts          # Application entry point
```

## License

MIT
