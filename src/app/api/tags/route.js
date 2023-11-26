import prisma from "@/utils/connect";
import { NextResponse } from "next/server"

export const GET = async () => {
    try {
        const tags = await prisma.tag.findMany();
        return new NextResponse(JSON.stringify(tags, { status: 200 }))
    } catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify({message: 'Something went wrong'}, {status: 500}));
    }
};