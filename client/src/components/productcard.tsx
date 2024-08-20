'use client';

import Link from "next/link";
import ButtonAddWishlist from "./buttonadd";
import { ObjectId } from "mongodb";

type ProductType = {
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

export default function ProductCard({ data }: { data: ProductType }) {

    return (
        <div className="card bg-base-100 w-96 shadow-xl flex flex-col h-full">
            <figure className="relative flex-grow">
                <img
                    src={data.thumbnail}
                    alt='product'
                    className="w-full h-64 object-cover"
                />
            </figure>
            <div className="card-body flex flex-col flex-grow p-4">
                <h2 className="card-title text-lg font-semibold mb-2">
                    {data.name}
                </h2>
                <p className="mb-4">{data.excerpt}</p>
                <div className="card-actions mb-4">
                    {data.tags.map((item, idx) => (
                        <div className="badge badge-outline mr-2" key={idx}>{item}</div>
                    ))}
                </div>
            </div>
            <div className="p-4 flex flex-col space-y-2">
                <Link href={`/product/${data.slug}`}>
                    <button className="btn w-full bg-blue-500 text-white shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        View Details
                    </button>
                </Link>
                <ButtonAddWishlist id={data._id} />
            </div>
        </div>
    );
}
