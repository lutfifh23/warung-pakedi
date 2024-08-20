import CardCarousel from './productcarousel';

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

export default async function CarouselCard() {
    const url: string | undefined = process.env.NEXT_PUBLIC_BASE_URL
    const response = await fetch(url + '/api/products', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
        cache: 'no-store'
    });
    const data: { data: ProductType[] } = await response.json();
    return (
        <div className="flex justify-center py-8 w-full">
            <div className="carousel rounded-box w-3/4">
                <div className="carousel-item">
                    {data.data.map((item, idx) => (
                        <CardCarousel key={idx} data={item} />
                    ))}
                </div>
            </div>
        </div>
    );
}
