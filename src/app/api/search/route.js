import { NextResponse } from "next/server"
import prisma from "@/utils/connect";


export const GET = async (req, res) => {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query');

    if (typeof query !== 'string') {
        throw new Error('Invalid request!')
    }

    try {
        const searchResult = await prisma.post.findMany({
            where: {
                OR: [
                    {
                        desc: {
                            contains: query,
                            mode: 'insensitive'
                        }
                    },
                    {
                        title: {
                            contains: query,
                            mode: 'insensitive'
                        }
                    },
                    {
                        user: {
                            name: {
                                contains: query,
                                mode: 'insensitive'
                            }
                        }
                    },
                ]
            },
            include: { user: true }
        })
        return new NextResponse(JSON.stringify(searchResult, { status: 200 }))    
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({ message: 'Failed to GET the query'}, {status: 500}));
    
    }
}

