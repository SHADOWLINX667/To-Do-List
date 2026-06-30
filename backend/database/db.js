import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
 // log: ['warn', 'error'],
});

// Test connection on startup
prisma.$connect()
  .then(() => {
    console.log('✅ Database connected successfully');
  })
  .catch((err) => {
    console.error('❌ Database connection failed:', err.message);
    process.exit(1);
  });

export default prisma;
