// export * from './lib/db-access';
import { PrismaClient } from '@prisma/client';

export const db = new PrismaClient({
    errorFormat: 'minimal',
});