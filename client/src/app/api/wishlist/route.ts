import Wishlist from "@/db/models/Wishlist"
import { ObjectId } from "mongodb"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

export async function GET(request: Request) {
    const userId = request.headers.get('x-id') as string
    const wishlist = await Wishlist.getAll(userId)
    return Response.json({ data: wishlist })
}

export async function POST(request: Request) {
    try {
        const userId = request.headers.get('x-id') as string;
        const body: { productId: string } = await request.json();

        const wishlistResponse = await Wishlist.create({
            productId: new ObjectId(String(body.productId)),
            userId: new ObjectId(String(userId)),
            createdAt: new Date().toISOString(),
            updateAt: new Date().toISOString(),
        });

        if (wishlistResponse === 'Product already in wishlist') {
            return Response.json({ message: wishlistResponse }, { status: 400 });
        }

        return Response.json({ data: wishlistResponse });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return Response.json({ error: error.issues.map((issue) => issue.path[0] + ' ' + issue.message) }, { status: 400 });
        }
        return Response.json({ error: 'Internal server error' }, { status: 500 });
    }
}


export async function DELETE(request: NextRequest) {
    try {
        const body = await request.json();
        await Wishlist.deleteById(body.id);
        return NextResponse.json({ message: 'success' })
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}