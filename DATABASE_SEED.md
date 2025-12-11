# Database Seeding Guide

## How to Seed the Database with Initial Admin User

### Prerequisites
1. PostgreSQL is running
2. Database is configured in `.env` file
3. Backend dependencies are installed

### Step-by-Step Instructions

#### 1. Navigate to backend directory
```bash
cd construction-backend
```

#### 2. Make sure your .env file is configured
```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=your_postgres_user
DATABASE_PASSWORD=your_postgres_password
DATABASE_NAME=construction_db

JWT_SECRET=your-secret-key-change-this-in-production
JWT_EXPIRATION=24h

PORT=3000
```

#### 3. Run the seed command
```bash
npm run seed
```

### What Gets Created

The seed script will create:

#### Default Roles:
1. **Admin Role** - Full system access with all permissions
2. **Manager Role** - Project and team management (all except user management)
3. **User Role** - Basic user with read-only access

#### Default Admin User:
- **Email**: `admin@construction.com`
- **Password**: `admin123`
- **Role**: Admin (full access)
- **Name**: Admin User
- **Phone**: 1234567890

### Output Example

When you run `npm run seed`, you should see:
```
Connecting to database...
Database connected successfully!

Starting database seed...

Admin role created
Manager role created
User role created
Default admin user created
Email: admin@construction.com
Password: admin123
Database seeded successfully!

✅ Database seeded successfully!
```

### Verification

After seeding, you can verify the admin user was created:

1. **Using psql**:
```bash
psql -U your_user -d construction_db

SELECT email, "firstName", "lastName" FROM users;
SELECT name, description FROM roles;
```

2. **Using the API**:
Test login with curl:
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@construction.com","password":"admin123"}'
```

You should receive a response with an access token:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "email": "admin@construction.com",
    "firstName": "Admin",
    "lastName": "User",
    "phone": "1234567890",
    "role": {
      "name": "Admin",
      "permissions": [...]
    }
  }
}
```

3. **Using the Mobile App**:
- Open the ConstructPro mobile app
- Login with:
  - Email: `admin@construction.com`
  - Password: `admin123`
- You should be redirected to the dashboard

### Important Notes

1. **Idempotent**: The seed script is safe to run multiple times. It checks if data exists before creating it, so running it again won't create duplicates.

2. **Password Security**: The password `admin123` is hashed using bcrypt before storing in the database. The plain text password is never stored.

3. **Production**: Make sure to change the default admin password in production!

### Troubleshooting

#### Error: "Cannot find module 'dotenv'"
Install dotenv if missing:
```bash
npm install dotenv
```

#### Error: "Connection refused"
- Make sure PostgreSQL is running
- Check database credentials in `.env`
- Verify database exists:
```bash
psql -U your_user -l | grep construction_db
```

Create database if it doesn't exist:
```bash
psql -U your_user
CREATE DATABASE construction_db;
\q
```

#### Error: "relation does not exist"
This happens if tables haven't been created yet. The backend uses TypeORM with `synchronize: true`, so tables should be created automatically when the app starts.

Solution:
1. Start the backend first: `npm run start:dev`
2. Wait for tables to be created
3. Stop the backend (Ctrl+C)
4. Run seed: `npm run seed`

Or let the backend create tables and then seed:
1. Start backend: `npm run start:dev` (in one terminal)
2. Run seed: `npm run seed` (in another terminal)
3. Backend will continue running with seeded data

### Additional Users

To create more users, you can either:

1. **Use the API** (requires admin login):
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -d '{
    "email": "manager@construction.com",
    "password": "manager123",
    "firstName": "Manager",
    "lastName": "User",
    "phone": "1234567891",
    "roleName": "Manager"
  }'
```

2. **Modify the seed script** to add more users in [src/database/seed.ts](src/database/seed.ts)

3. **Use the Mobile App** - Admins can create users through the app (if user management UI is implemented)

### Quick Reference

```bash
# Install dependencies (if needed)
npm install

# Run seed script
npm run seed

# Start backend with seeded data
npm run start:dev
```

**Default Login Credentials**:
- Email: `admin@construction.com`
- Password: `admin123`
