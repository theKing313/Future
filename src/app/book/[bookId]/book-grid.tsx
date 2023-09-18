"use client";

// import { ImageGrid } from "@/components/image-grid";
// import { CloudinaryImage } from "@/components/cloudinary-image";
import { Book } from "@/components/BookList/Book";
import Image from "next/legacy/image";

export default function AlbumGrid({ book }: { book: any }) {
    console.log(book)
    return (
        <section className="single-book mt-14">
            {/* {JSON.stringify(book)} */}
            <div className="container">
                <div className=" m-auto flex gap-x-10 ">
                    {/*  */}
                    <div className="w-full h-full flex-[0_1_50%]">
                        <Image
                            className='w-auto h-full'
                            loader={() => '/preloader.png'}
                            src={book?.volumeInfo?.imageLinks.thumbnail}
                            alt="cover"
                            width={100}
                            height={100}
                            sizes="100vw"
                            // Make the image display full width
                            style={{
                                width: '100%',
                                height: '100%',
                            }}
                            blurDataURL="/preloader.png"
                            objectFit='contain'
                            placeholder="blur" // Optional blur-up while loading
                            unoptimized
                        />
                    </div>
                    <div className="single-book-content flex flex-col gap-y-10  flex-[0_1_50%]">
                        <div className="text-2xl text-white">
                            {book?.volumeInfo?.title}
                        </div>
                        <div className='book-item-info-item '>
                            <span className='text-capitalize fw-7'>Author : </span>
                            <span className='text-xs text-orange-200'>{book?.volumeInfo?.authors?.join(", ")} </span>
                        </div>
                        <div className='book-item-info-item '>
                            <span className='text-sm text-white'>Categories : </span>
                            <span className='text-sm'>{book?.volumeInfo?.categories?.join(" , ")} </span>
                        </div>
                        <div className='book-item-info-item '>
                            <span className='text-sm'>{book?.volumeInfo?.description?.length > 60 ? book?.volumeInfo?.description.slice(0, 800) + '...' : book?.volumeInfo?.description} </span>
                        </div>

                    </div>
                </div>
            </div>

        </section>
    );
}