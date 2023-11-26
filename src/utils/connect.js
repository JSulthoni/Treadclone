import { PrismaClient } from '@prisma/client';


let prisma;
if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient()
} else {
    const globalPrisma = global.prisma
    if (!globalPrisma) {
        global.prisma = new PrismaClient()
    }
    prisma = global.prisma
}

export default prisma;
