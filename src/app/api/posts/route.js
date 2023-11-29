import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server"


// GET ALL TREAD
export const GET = async (req) => {
    const { searchParams } = new URL(req.url);

    const page = searchParams.get('page');
    const tag = searchParams.get('tag');
    const sort = searchParams.get('sort');
    const limit = searchParams.get('limit');

    const POST_PER_PAGE = 10;

    // Base query
    const baseQuery = {
        take: POST_PER_PAGE,
        include: { user: true },
        where: {}
    };

    // Apply pagination
    if (page) {
        baseQuery.skip = POST_PER_PAGE * (page - 1)
    };

    // Apply tag filter
    if (tag) {
        baseQuery.where.tagSlug = tag;
    }

    // Apply sorting and limit for popular posts
    if (sort === 'views' && limit) {
        baseQuery.take = parseInt(limit); // Converting limit from string to int
        baseQuery.orderBy = { views: 'desc' }
    }

    try {
        const [posts, count] = await prisma.$transaction([
            prisma.post.findMany(baseQuery),
            prisma.post.count({ where: baseQuery.where })
        ]);
        return new NextResponse(JSON.stringify({ posts, count }, { status: 200 }))
    } catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({ message: 'Failed to GET all tread'}, {status: 500}));
    }
};

// CREATE A POST
export const POST = async (req) => {
    const session = await getAuthSession();
  
    if (!session) {
        return new NextResponse(
            JSON.stringify({ message: 'Not Authenticated!' }, { status: 401 })
        )
    };

    try {
        const body = await req.json();
        console.log(body) 
        const createdPost = await prisma.post.create({
            data: { 
                ...body,
                userEmail: session.user.email,
                postTags: {
                    create: await Promise.all(body.postTags.map( async(tag) => {
                        const existingTag = await prisma.tag.findUnique({
                            where: { slug: tag }
                        })

                        if (existingTag) {
                            return { tag: { connect: { slug: tag }}}
                        } else {
                            return { tag: { create: { slug: tag }}}
                        }
                    })
                )
            }},
        });
        console.log("Created Post: ", createdPost)
        return new NextResponse(JSON.stringify(createdPost, { status: 200 }));
    } catch (error) {
        console.log('Error during the post creation', error);
        return new NextResponse(
            JSON.stringify({ message: 'Failed to POST a tread' }, { status: 500 })
        );
    }
}; 