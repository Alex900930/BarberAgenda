import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;


/* import { PrismaClient } from '@prisma/client'
import { PrismaLibSQL } from '@prisma/adapter-libsql'
import { createClient } from '@libsql/client'

const libsql = createClient({
  url: `${process.env.TURSO_DATABASE_URL}`,
  authToken: `${process.env.TURSO_AUTH_TOKEN}`,
})

const adapter = new PrismaLibSQL(libsql)
export const prisma = process.env.NODE_ENV === 'production' ? new PrismaClient({ adapter }) : new PrismaClient(); */