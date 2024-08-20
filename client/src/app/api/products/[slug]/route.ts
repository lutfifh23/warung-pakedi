import Product from "@/db/models/Product"

type BySlugParams = {
    params: {
        slug: string
    }
}

export async function GET(request: Request, { params }: BySlugParams) {
    try {
        const product = await Product.getBySlug(params.slug)
        return Response.json({ product })
    } catch (error: any) {
        console.log(error, "<<<TEST")
        if (error.name === 'BSONError') {
            return Response.json({ message: 'invalid Slug' }, { status: 400 })
        }
        if (error.name === "NotFound") {
            return Response.json({ message: error.message }, { status: 404 })
        }
        return Response.json({ error }, { status: 500 })
    }
}