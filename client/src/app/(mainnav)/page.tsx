import Link from 'next/link';
import Carousel from '@/components/banner';
import CarouselCard from '@/components/carousel';

const Home = () => {
  return (
    <div className='bg-white'>
      <Carousel />
      <main className="container mx-auto py-8">
        <section>
          <h1 className="text-2xl font-bold mb-6 text-black">Featured Products</h1>
          <CarouselCard />
          <div className="text-center mt-8">
            <Link href="/product" className="btn btn-primary">
              View All Products
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
