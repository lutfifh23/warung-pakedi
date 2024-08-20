'use client';
import ButtonDelete from "@/components/buttondel";
import { ObjectId } from "mongodb";
import { useEffect, useState } from "react";
import { MdOutlineCancel } from "react-icons/md";

type Wishlist = {
    _id: ObjectId;
    productId: ObjectId;
    userId: ObjectId;
    createdAt: string;
    updatedAt: string;
    product: Product[]
}

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
}

export default function Wishlist() {
    const [wishes, setWishes] = useState<Wishlist[]>([]);
    async function getWishes() {
        const link: string | undefined = process.env.NEXT_PUBLIC_BASE_URL
        let url = link + `/api/wishlist`;
        const res = await fetch(url);
        const data: { data: Wishlist[] } = await res.json();
        console.log(data.data, "<<<TEST");

        setWishes(data.data);

    }
    useEffect(() => {
        getWishes();
    }, [])
    return (
        <>
            <div className="relative bg-base-200 min-h-screen">
                {wishes.map((item) => (
                    <div className="hero-content flex-col lg:flex-row" key={item._id.toString()}>
                        <div className="relative">
                            <img
                                src={item.product[0].thumbnail}
                                className="max-w-sm rounded-lg shadow-2xl"
                                alt={item.product[0].name}
                            />
                        </div>
                        <div>
                            <h1 className="text-5xl font-bold">{item.product[0].name}</h1>
                            <p className="py-6">
                                {item.product[0].description}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {item.product[0].tags.map((tag, idx) => (
                                    <div key={idx} className="badge badge-outline">{tag}</div>
                                ))}
                            </div>
                            <p className="text-3xl font-bold">${item.product[0].price}</p>
                            <ButtonDelete id={item._id} />
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}