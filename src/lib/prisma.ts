// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';

// Declare a global variable to hold the Prisma client instance in development
declare global {
    // eslint-disable-next-line no-var
    var prisma: PrismaClient | undefined;
}

// Initialize Prisma Client
// Use the global instance in development, otherwise create a new one
export const prisma =
    global.prisma ||
    new PrismaClient({
        // Optional: Add logging based on environment
        // log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });

// Store the instance in the global variable in development environments
// This prevents creating multiple instances during hot-reloading
if (process.env.NODE_ENV !== 'production') {
    global.prisma = prisma;
}

// Export the Prisma client instance
// This line isn't strictly necessary if you export the const above,
// but sometimes people add it for clarity.
// export default prisma; // You can export default or named export, be consistent