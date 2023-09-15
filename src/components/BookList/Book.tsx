import React from 'react'
import Link from 'next/link'
import Image from 'next/legacy/image'
export interface Book {
    id: number,
    authors: string[],
    cover_id: string,
    edition_count: string | number,
    publishedDate: string | number,
    title: string,
    coverImg: string,
    status: string
    categories: any
    totalNumberBooks: number;
}
export default function Book({ id, authors, cover_id, coverImg, edition_count, title, publishedDate, status, categories }: Book) {
    return (
        <>
            {status !== 'falling' ?
                <div className='book-item flex flex-col  '>
                    <div className='book-item-img relative'>
                        <Image
                            className='flex justify-center w-full'
                            loader={() => '/preloader.png'}
                            src={coverImg && coverImg}
                            alt="cover"
                            width={100}
                            height={100}
                            sizes="100vw"
                            // Make the image display full width
                            style={{
                                width: '100%',
                                height: 'auto',
                            }}
                            blurDataURL="/preloader.png"
                            objectFit='contain'
                            placeholder="blur" // Optional blur-up while loading
                            unoptimized
                        />
                    </div>
                    <div className='book-item-info text-center flex flex-col gap-y-3'>
                        <Link href={`/book/${id}`}>

                            <div className='book-item-info-item title fw-7 fs-18'>
                                <span>{title}</span>
                            </div>
                        </Link>

                        <div className='book-item-info-item author fs-15'>
                            <span className='text-capitalize fw-7'>Author : </span>
                            <span className='text-xs text-orange-200'>{authors?.join(", ")} </span>
                        </div>
                        <div className='book-item-info-item edition-count fs-15'>
                            <span className='text-capitalize fw-7'>Total Editions: {status}</span>
                            <span>{edition_count}</span>
                        </div>

                        <div className='book-item-info-item publish-year fs-15'>
                            <span className='text-capitalize fw-7'>First Publish Year: </span>
                            <span>{publishedDate}</span>
                        </div>
                        <div className='book-item-info-item '>
                            <span className='text-sm text-white'>Categories :</span>
                            <span className='text-sm'>{categories?.join(", ")} </span>
                        </div>
                    </div>
                </div>


                :
                <div className="">NO RESULTS</div>
            }

        </>

    )
}
