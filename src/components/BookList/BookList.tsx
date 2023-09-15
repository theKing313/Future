'use client'

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Book from "./Book";
import './BookList.scss'
import { useState, useEffect } from 'react'
import Category from "../Category/Category";
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
interface Books {
    books: Book[];
    totalNumberBooks: number;

}
export default function BookList() {
    const books: Books[] | any = useAppSelector(state => state.BookSearchSlice.books)
    const status = useAppSelector(state => state.BookSearchSlice.status)
    const totalBooksNumber = useAppSelector(state => state.BookSearchSlice.totalBooksNumber)
    const [limitTo, setLimitTo] = useState<number>(30)
    const onLoadMore = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setLimitTo(prev => prev + 30)
    }
    return (
        <>
            <div className="container m-auto">
                <div className="">
                    {status != 'loading' && books !== undefined && <div className="text-center text-xl mt-4">Found : {totalBooksNumber !== undefined && totalBooksNumber}</div>}
                </div>
                <div className="mt-10 booklist-content grid">
                    {
                        status != 'loading' && books?.slice(0, limitTo).map((book: any, index: number) => {
                            return (
                                <Book  {...book} key={index} />
                            )
                        })
                    }

                </div>
            </div>
            {books?.length > 0 &&
                <button onClick={onLoadMore} className="w-32 h-12 bg-black rounded-md m-auto flex justify-center items-center my-3">
                    Load more
                </button>}
        </>
    )
}
