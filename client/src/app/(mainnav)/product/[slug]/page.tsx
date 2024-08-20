import ButtonAddWishlist from "@/components/buttonadd";
import { ObjectId } from "mongodb";
import { Metadata, ResolvingMetadata } from "next";
import { FaRegHeart } from "react-icons/fa";

type Product = {
    _id: ObjectId;
    name: string;
    slug: string;
    description: string;
    excerpt: string;
    price: number;
    tags: string[];
    thumbnail: string;
    images: string[];
    createdAt: string;
    updatedAt: string;
};

type Props = {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const id = params.slug
    const url: string | undefined = process.env.NEXT_PUBLIC_BASE_URL
    const { product }: { product: Product } = await fetch(url + `/api/products/${id}`).then((res) => res.json())

    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || []

    return {
        title: product.name,
        openGraph: {
            images: ['/some-specific-page-image.jpg', ...previousImages],
        },
    }
}
export default async function ProductDetail({ params }: { params: { slug: string } }) {
    const getParams = params.slug

    const url: string | undefined = process.env.NEXT_PUBLIC_BASE_URL
    const res = await fetch(url + `/api/products/${getParams}`, {
        method: "GET",
        cache: "no-store",
    })

    if (!res.ok) {
        throw new Error("Failed to fetch product")
    }

    const data = await res.json()
    const { product }: { product: Product } = data

    return (
        <>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row">
                    <img
                        src={product.thumbnail}
                        className="max-w-sm rounded-lg shadow-2xl"
                        alt="Hero Image"
                    />
                    <div className="flex flex-col lg:ml-8">
                        <h1 className="text-5xl font-bold">{product.name}</h1>
                        <p className="py-6">
                            {product.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {product.tags.map((item, idx) => (
                                <div key={idx} className="badge badge-outline">{item}</div>
                            ))}
                        </div>
                        <p className="text-3xl font-bold">${product.price}</p>
                        <ButtonAddWishlist id={product._id} />
                    </div>
                </div>
            </div>
        </>
    )
}