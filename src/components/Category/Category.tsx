'use client'
import { selectedByCategory, sortingByDate } from "@/redux/features/BookSearchSlice";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useState, useEffect, useMemo } from 'react'

export default function Category({ props }: any) {
    const dispatch = useAppDispatch()

    const [selectedCategory, setSelectedCategory] = useState('relevance');
    const [selectedCategoryItems, setSelectedCategoryItems] = useState('all');
    const books: any = useAppSelector(state => state.BookSearchSlice.books)
    function handleCategoryChange(event: any) {
        if (books !== undefined) {
            setSelectedCategoryItems(event.target.value)
        }
    }
    function handleSortingChange(event: any) {
        setSelectedCategory(event.target.value)
    }
    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (books.length > 0) {
            dispatch(selectedByCategory(selectedCategoryItems))
            dispatch(sortingByDate(selectedCategory))
        }

    }
    return (
        <section className="container ">
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-x-5 mt-10 gap-y-10 items-center justify-center">
                <div className="flex md:w-1/3 xs:w-1/2 flex-wrap gap-y-4 items-center gap-x-3 justify-center w-full">
                    <div>Filter by Category:</div>
                    <select
                        name="category-list"
                        id="category-list"
                        onChange={handleCategoryChange}
                        className="text-gray-500 w-full"
                    >
                        <option value="all">All</option>
                        <option value="art">art</option>
                        <option value="biography">biography</option>
                        <option value="computers">computers</option>
                        <option value="history">history</option>
                        <option value="medical">medical</option>
                        <option value="poetry">poetry</option>
                        <option value="science">Science</option>

                    </select>
                </div>
                <div className="flex md:w-1/3 xs:w-1/2 flex-wrap gap-y-4 items-center gap-x-3 justify-center w-full">
                    <div>Sorting by :</div>
                    <select
                        name="category-list"
                        id="category-Sorting"
                        className="text-gray-500 w-full"
                        onChange={handleSortingChange}
                    >
                        <option value="relevance"

                        >Relevance</option>
                        <option value="newest">Newest</option>
                    </select>
                </div>
                <button type="submit" className="h-10 w-full md:w-1/2 mt-[1rem]">save</button>
            </form>
        </section>
    )
}
