import { DataSource } from 'typeorm';
import { Role, Permission } from '../entities/role.entity';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

export async function seedDatabase(dataSource: DataSource) {
  const roleRepository = dataSource.getRepository(Role);
  const userRepository = dataSource.getRepository(User);

  // Create Admin Role
  let adminRole = await roleRepository.findOne({ where: { name: 'Admin' } });
  if (!adminRole) {
    adminRole = roleRepository.create({
      name: 'Admin',
      description: 'Full system access with all permissions',
      permissions: Object.values(Permission),
    });
    await roleRepository.save(adminRole);
    console.log('Admin role created');
  }

  // Create Manager Role
  let managerRole = await roleRepository.findOne({ where: { name: 'Manager' } });
  if (!managerRole) {
    managerRole = roleRepository.create({
      name: 'Manager',
      description: 'Project and team management',
      permissions: [
        Permission.READ_USER,
        Permission.CREATE_PROJECT,
        Permission.READ_PROJECT,
        Permission.UPDATE_PROJECT,
        Permission.CREATE_MATERIAL,
        Permission.READ_MATERIAL,
        Permission.UPDATE_MATERIAL,
        Permission.CREATE_PARTY,
        Permission.READ_PARTY,
        Permission.UPDATE_PARTY,
        Permission.CREATE_BILL,
        Permission.READ_BILL,
        Permission.UPDATE_BILL,
        Permission.APPROVE_BILL,
        Permission.CREATE_PAYMENT,
        Permission.READ_PAYMENT,
        Permission.UPDATE_PAYMENT,
        Permission.READ_REPORT,
        Permission.EXPORT_REPORT,
      ],
    });
    await roleRepository.save(managerRole);
    console.log('Manager role created');
  }

  // Create User Role
  let userRole = await roleRepository.findOne({ where: { name: 'User' } });
  if (!userRole) {
    userRole = roleRepository.create({
      name: 'User',
      description: 'Basic user with read access',
      permissions: [
        Permission.READ_PROJECT,
        Permission.READ_MATERIAL,
        Permission.READ_PARTY,
        Permission.READ_BILL,
        Permission.READ_PAYMENT,
        Permission.READ_REPORT,
      ],
    });
    await roleRepository.save(userRole);
    console.log('User role created');
  }

  // Create default admin user
  const adminEmail = 'admin@construction.com';
  let adminUser = await userRepository.findOne({ where: { email: adminEmail } });
  if (!adminUser) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    adminUser = userRepository.create({
      email: adminEmail,
      password: hashedPassword,
      firstName: 'Admin',
      lastName: 'User',
      phone: '1234567890',
      role: adminRole,
    });
    await userRepository.save(adminUser);
    console.log('Default admin user created');
    console.log('Email: admin@construction.com');
    console.log('Password: admin123');
  }

  console.log('Database seeded successfully!');
}
