'use client';
import ProductCard from '@/components/productcard';
import { ObjectId } from 'mongodb';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

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

export default function AllProducts() {
    const [products, setProducts] = useState<ProductType[]>([]);
    const [query, setQuery] = useState('');
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    async function getProducts() {
        const link: string | undefined = process.env.NEXT_PUBLIC_BASE_URL
        let url = link + `/api/products?page=${page}`;
        if (query) {
            url = link + `/api/products?name=${query}`;
            setPage(1);
        }
        const res = await fetch(url);
        const data: { data: ProductType[] } = await res.json();
        if (query) {
            setProducts(data.data);
            setHasMore(false);
        } else {
            setProducts((prev) => {
                return [...prev, ...data.data];
            })
            setPage(page + 1);
            if (data.data.length === 0) {
                setHasMore(false);
            }
        }
    }
    useEffect(() => {
        getProducts();
    }, [query])
    return (
        <div className="container mx-auto py-8">
            <div>
                <h1 className="text-2xl font-bold mb-6 text-white">All Products</h1>
                <label className="flex-grow mx-4 mb-5">
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        type="text"
                        placeholder="Search..."
                        className="w-full p-2 border border-gray-300 rounded text-white grow"
                    />
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 16 16'
                        fill='currentColor'
                        className='w-4 h-4 opacity-70'
                    >
                        <path
                            fillRule='evenodd'
                            d='M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z'
                            clipRule='evenodd'
                        />
                    </svg>
                </label>
            </div>
            <InfiniteScroll
                dataLength={products.length}
                next={getProducts}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={<h4>No more products</h4>}
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((item, idx) => (
                        <ProductCard key={idx} data={item} />
                    ))}
                </div>
            </InfiniteScroll>
        </div>
    );
};