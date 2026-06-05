
import Image from 'next/image';
import Link from 'next/link';

const promotions = [
    {
        id: 1,
        image: '/images/promotion1.jpg',
        message: '🎉 Big Sale! Get 10% Off Sunglasses – Use Code:',
        code: 'SALE30',
    },
    {
        id: 2,
        image: '/images/promotion2.jpg',
        message: '🎉 Big Sale! Get 30% Off Home appliances – Use Code:',
        code: 'SALE30',
    },
];

const FirstPromotion = ({data}) => {
    return (
        <section className="mt-12 px-4">
            <div className="grid grid-cols-2 gap-4">
                {data?.map((promo) => (
                    <div
                        key={promo._id}
                        className="relative h-[100px] sm:h-[200px] md:h-[200px]"
                    >
                        <Image
                            className="w-full h-full object-cover"
                            src={promo.image}
                            alt="Promotion"
                            width={400}
                            height={400}
                        />
                        {/* <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/60 text-center p-4">
                            <p className="text-sm sm:text-base md:text-lg text-white">
                                {promo.message}{' '}
                                <span className="font-bold text-yellow-300">{promo.code}</span>
                            </p>
                            <Link
                                href="#"
                                className="mt-3 text-sm bg-black text-white px-4 py-2 rounded-full font-medium hover:bg-white hover:text-black transition"
                            >
                                Get Now
                            </Link>
                        </div> */}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FirstPromotion;
