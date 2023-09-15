"use client"
import { getAllBooks } from "@/redux/features/BookSearchSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import coverImg from "@/components/images/cover_not_found.jpg";
import Book from "../BookList/Book";
import BookList from "../BookList/BookList";
import Category from "../Category/Category";
import { useDebounce } from "@uidotdev/usehooks";
interface Books {
    id: number,
    author: string,
    cover_i: string,
    edition_count: string | number,
    first_publish_year: string | number,
    title: string
}

export default function SearchForm() {
    const [searchForm, setSearchTerm] = useState<string | any>('')
    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.BookSearchSlice.status)

    const [Main, setMain] = useState('')

    const debouncedSearchTerm = useDebounce<string>(searchForm, 2300);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement> | any) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        setSearchTerm(formData.get("search"));
        dispatch(getAllBooks(searchForm))
    }
    useEffect(() => {
        const searchHN = async () => {
            if (debouncedSearchTerm) {
                dispatch(getAllBooks(searchForm))
            }
        };

        searchHN();
    }, [debouncedSearchTerm]);

    return (
        <section className='search-form pt-20 bg-[#161820]'>

            <div className='container m-auto'>
                <h1 className='main-title flex justify-center'>Seacrh for books</h1>
                <div className='search-form-content w-full pt-9'>
                    <form className='search-form' onSubmit={handleSubmit}>
                        <div className='search-form-elem flex  justify-between '>
                            <input type="text" className='form-control' placeholder='How to make money.' onChange={handleChange} />
                            {/* <input type="text" className='form-control' placeholder='The Lost World ...' ref={searchText} /> */}

                            <button type="submit" className='flex justify-center items-center flex-[0_1_70px] h-8 ' >
                                <FaSearch className='text-purple' size={32} />
                            </button>
                        </div>

                    </form>
                    <Category props={Main} />
                    <div className="">{status == 'loading' && 'loading...'}</div>
                </div>
            </div>
            <BookList />

        </section>
        // 

    )
}
