import prisma from '@/utils/connect';
import { NextResponse } from 'next/server'
import { getAuthSession } from '@/utils/auth';

// GET SINGLE POST
export const GET = async (req, { params }) => {
    const { slug } = params;

    try {
        const post = await prisma.post.update({
            where: { slug },
            data: { views: { increment: 1 } },
            include: { user: true },
        });
        console.log(`GETTING TREAD with SLUG: ${slug}`);
        return new NextResponse(JSON.stringify(post, { status: 200 }));

    } catch (error) {
        console.log(error);
        return new NextResponse(
            JSON.stringify({ message: `Failed to GET tread with slug of ${slug}` }, { status: 500 })
        );
    }
};


// DELETE SINGLE POST
export const DELETE = async (req, { params }) => {
    const { slug } = params;
    const session = getAuthSession();

    if (!session) {
        return new NextResponse(
            JSON.stringify({ message: 'Not Authenticated!' }, { status: 401 })
        )
    };

    try {
        const deletedPost = await prisma.post.delete({
            where: { slug }
        });
        console.log(`DELETING TREAD with SLUG: ${slug}`);
        return new NextResponse(JSON.stringify(deletedPost, { status: 200 }));

    } catch (error) {
        console.log(error);
        return new NextResponse(
            JSON.stringify({ message: `Failed to DELETE tread with slug of ${slug}` }, { status: 500 })
        );
    }
};

// UPDATE SINGLE POST
export const PUT = async (req, { params }) => {
    const { slug } = params;
    const session = getAuthSession();

    if (!session) {
        return new NextResponse(
            JSON.stringify({ message: 'Not Authenticated!' }, { status: 401 })
        )
    };

    try {
        const method = await req.method;
        if (method !== 'PUT') {
            return new NextResponse(JSON.stringify({ message: 'Method Not Allowed' }, { status: 405 }));
        }

        const body = await req.json()
        const updatedPost = await prisma.post.update({
            where: { slug },
            data: { ...body,
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
                    }))
                }},
            include: { user: true },
        });
        console.log(`UPDATING TREAD with SLUG: ${slug}`);
        return new NextResponse(JSON.stringify(updatedPost, { status: 200 }));

    } catch (error) {
        console.log(error);
        return new NextResponse(
            JSON.stringify({ message: `Failed to UPDATE tread with slug of ${slug}` }, { status: 500 })
        );
    }
};