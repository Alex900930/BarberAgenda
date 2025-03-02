// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@barbearia.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'AdminPass123!';
  
  // Hash de la contraseña
  const hashedPassword = await bcrypt.hash(adminPassword, 12);

  // Crear o actualizar usuario admin
  const adminUser = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: hashedPassword,
      role: 'ADMIN'
    }
  });

  console.log('Usuario admin creado:', adminUser);
}

main()
  .catch((e) => {
    console.error('Error en el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });