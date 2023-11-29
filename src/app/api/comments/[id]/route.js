import prisma from "@/utils/connect";
import { NextResponse } from "next/server"
import { getAuthSession } from "@/utils/auth";

// GET SINGLE COMMENT
export const GET = async (req, { params }) => {
    const { id } = params;

    try {
        const comment = await prisma.comment.findUnique({
            where: { id }
        });
        console.log(`GETTING COMMENT with ID: ${id}`);
        return new NextResponse(JSON.stringify(comment, { status: 200 }));
        
    } catch (error) {
        console.error(error);
        return new NextResponse(JSON.stringify({message: `Failed to GET comment with id of ${id}` }, {status: 500}));
    }
};


// DELETE SINGLE COMMENT
export const DELETE = async (req, { params }) => {
    const { id } = params;
    const session = await getAuthSession();

    if (!session) {
        return new NextResponse(
            JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
        )
    };

    try {
        const deletedComment = await prisma.comment.delete({
            where: { id }
        });
        console.log(`DELETING COMMENT with ID: ${id}`);
        return new NextResponse(JSON.stringify(deletedComment, { status: 200 }));
        
    } catch (error) {
        console.error(error);
        return new NextResponse(JSON.stringify({message: `Failed to DELETE comment with id of ${id}` }, {status: 500}));
    }
};

// UPDATE SINGLE COMMENT
export const PUT = async (req, { params }) => {
    const { id } = params;
    console.log(id)
    const session = await getAuthSession();
  
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

        const body = await req.json();
        const updatedComment = await prisma.comment.update({
            where: { id },
            data : { ...body },
            include: { user: true },
        });
        console.log(`UPDATING COMMENT with ID: ${id}`);
        return new NextResponse(JSON.stringify({updatedComment}, { status: 200 }))
    } catch (error) {
        console.error(error);
        return new NextResponse(
            JSON.stringify({message: `Failed to UPDATE comment with id of ${id}` }, {status: 500})
        );
    }
};