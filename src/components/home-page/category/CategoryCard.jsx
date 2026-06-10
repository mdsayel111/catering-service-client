import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function CategoryCard({ loading, data }) {
    return (
        <>
            {
                loading ?
                    <div
                        className="flex flex-col items-center w-full animate-pulse"
                    >
                        <div className="bg-gray-200 rounded-full p-2 shadow-lg border border-gray-200">
                            <div className="w-12 h-12 rounded-full bg-gray-300" />
                        </div>

                        <div className="mt-2 h-4 w-16 bg-gray-300 rounded" />
                    </div> :
                    <Link
                        href={`/products?categoryId=${data?._id}`}
                    >
                        <div className=" shadow-lg border border-green-400 cursor-pointer bg-gray-100 rounded-full flex items-center justify-center p-2">
                            <Image
                                src={data?.image}
                                alt={data?.name}
                                width={40}
                                height={40}
                                className="rounded-full aspect-square object-cover w-12 h-12"
                            />
                        </div>
                        <p className="text-sm md:text-base text-text-primary-color mt-2 group-hover:text-secondary-color text-center">
                            {data?.name}
                        </p>
                    </Link>
            }
        </>
    )
}
