import { PrismaClient, Prisma } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log('Sedang memulai proses seeding...');

  // Data Role
  const rolesData = [
    { roleCode: 'ROLE-001', name: 'Super Administrator' },
    { roleCode: 'ROLE-002', name: 'Purchasing Staff' },
    { roleCode: 'ROLE-003', name: 'Warehouse Staff' },
  ];

  // Roles Seeding
  console.log('Menyiapkan Roles...');

  for (const r of rolesData) {
    const result = await prisma.role.upsert({
      where: { roleCode: r.roleCode },
      update: {},
      create: {
        roleCode: r.roleCode,
        name: r.name,
      },
    });

    console.log(`Berhasil memuat data role: ${result.roleCode}`);
  }

  console.log('Proses seeding roles selesai!');

  // Mengambil Role Super Administrator
  const superAdminRole = await prisma.role.findUnique({
    where: { roleCode: 'ROLE-001' },
  });

  if (!superAdminRole) {
    throw new Error('Role ROLE-001 tidak ditemukan!');
  }

  // Users Seeding
  console.log('Menyiapkan User Admin Pertama...');

  const hashedPassword = await bcrypt.hash('Superadmin123', 10);

  const superAdminUser = await prisma.user.upsert({
    where: { email: 'superadmin@procurement.com' },
    update: {},
    create: {
      email: 'superadmin@procurement.com',
      name: 'Super Administrator',
      password: hashedPassword,
      roleId: superAdminRole.id,
      isActive: true,
    },
  });

  console.log(`Berhasil memuat data user: ${superAdminUser.email}`);
  console.log('Seeding Selesai...');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
