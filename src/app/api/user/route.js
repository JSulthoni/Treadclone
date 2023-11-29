import prisma from "@/utils/connect";
import { NextResponse } from "next/server"


// GET ALL USER
export const GET = async (req) => {
    const { searchParams } = new URL(req.url);

    const sort = searchParams.get('sort');
    const limit = searchParams.get('limit');

    // Base query
    const baseQuery = {
        include: { posts: true }
    };

    // If there is limit
    if (limit) {
        baseQuery.take = Number(limit)
    }

    // If there is sort
    if (sort === 'post') {
        baseQuery.orderBy = { name: 'desc' }
    }

    try {
        const user = await prisma.user.findMany(baseQuery);
        return new NextResponse(JSON.stringify(user, { status: 200 }))
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({ message: 'Failed to GET all user'}, {status: 500}));
    }
};