import Link from "next/link";
type ProductType = {
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
export default function CardCarousel({ data }: { data: ProductType }) {
    return (
        <>
            <Link className="card bg-base-100 w-96 shadow-xl" href={`/product/${data.slug}`}>
                <div >
                    <figure>
                        <img
                            src={data.thumbnail}
                            alt="Product" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">
                            {data.name}
                            <div className="badge badge-secondary">NEW</div>
                        </h2>
                        <p>{data.excerpt}</p>
                        <div className="card-actions justify-end">
                            {data.tags.map((item, idx) => (
                                <div className="badge badge-outline" key={idx}>{item}</div>
                            ))}
                        </div>
                    </div>
                </div>
            </Link>
        </>
    )
}