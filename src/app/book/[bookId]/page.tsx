import axios from 'axios';
import Image from 'next/legacy/image';
import React from 'react'
import BookGrid from "./book-grid";
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getSingleBook } from '@/redux/features/BookSearchSlice';
export default async function pageID({ params: { bookId }, }: { params: { bookId: number; }; }) {
    // // const response = await axios.get(`${URL}${searchTerm}`)
    // console.log(bookId)
    // const dispatch = useAppDispatch()
    const book = await axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
    // const book = useAppSelector(state => state.BookSearchSlice.singleBook)
    // dispatch(getSingleBook(bookId))
    // https://books.google.com/ebooks?id=buc0AAAAMAAJ&dq=holmes&as_brr=4&source=webstore_bookcard
    // try {
    //     if (book.data) {
    //         console.log(book.data)
    //     } 
    // } catch (error) {
    //     console.log(error)
    // }
    // console.log(book)
    return (
        <div>
            < BookGrid book={book} />
        </div >
    )
}
