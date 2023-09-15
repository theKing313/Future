import { createSlice, createAsyncThunk, current, type PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
interface ItemBook {
    publishedDate: any,
}
interface Book {
    items: [],
    status: any
    kind: string
    totalItems: number
}
type CounterState = {
    status: 'idle' | 'loading' | 'failed'
    books: any[]; //Book
    bookByCategory: Book[]; //Book
    relevanceBooks: any[];
    totalBooksNumber: number;
    singleBook: any[];
};

const initialState = {
    status: 'idle',
    books: [],
    bookByCategory: [],
    relevanceBooks: [],
    totalBooksNumber: 0,
    singleBook: []
} as CounterState;
const URL: string = "https://www.googleapis.com/books/v1/volumes?q=";

export const getSingleBook = createAsyncThunk("getBooksSortedByDate", async (searchTermId: any, thunkApi: any) => {
    //{ searchTerm, thunkApi }: { searchTerm: string, thunkApi: any }
    try {
        // console.log(props)
        console.log(searchTermId)
        console.log(searchTermId.date)
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${searchTermId}`)
        console.log(thunkApi)
        if (response.data) {
            console.log(response.data)
        }
        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(`error with createAsyncThunk ) ${error} `)
    }
})
export const getAllBooks = createAsyncThunk("get/product", async (searchTerm: string, thunkApi: any) => {

    try {
        const response = await axios.get(`${URL}${searchTerm}&key=AIzaSyA6SaT23KNiiA6DnUfUQTvFeyAcQEkwnSU&maxResults=40`)
        if (response.data) {
            return response.data;
        }
    } catch (error) {
        return thunkApi.rejectWithValue(`error with createAsyncThunk ) ${error} `)
    }
});
export const booksSreach = createSlice({
    name: "books",
    initialState,
    reducers: {
        reset: () => initialState,

        sortingByDate: (state, action) => {

            if (action.payload === 'newest') {
                const arrYears: any[] = []
                state.books.map((item: any) => {
                    if (item.publishedDate) {
                        arrYears.push({ Year: parseInt(item.publishedDate), id: item.id })
                    }
                })
                arrYears.sort((a: any, b: any): number => {
                    return b.Year - a.Year;
                });
                const newSortedBooks: any = []
                arrYears.map((item: any) => {
                    state.books.find((book: any) => {
                        if (parseInt(book.publishedDate) === item.Year && book.id === item.id) {
                            newSortedBooks.push(book)
                        }
                    })
                })
                state.books = newSortedBooks
            }

        },
        selectedByCategory: (state, action) => {
            let sortedArrBooks: string[] = []
            state.books = state.bookByCategory

            if (state.books[0]?.status === 'falling') {
                state.books = state.bookByCategory

            } else if (action.payload === 'all') {

                // state.relevanceBooks
                state.books = state.bookByCategory


                // delete this
                // state.relevanceBooks = state.bookByCategory
            }

            state.books.map((item: any) => {

                if (item.categories !== undefined) {
                    if (action.payload === 'all') {
                        return state.books = state.bookByCategory
                    } else {
                        if (item.categories.find((item: string) => item.toLowerCase() === action.payload)) {
                            sortedArrBooks.push(item)
                        }

                    }
                }
            })
            if (sortedArrBooks.length > 0) {
                state.books = sortedArrBooks

                state.totalBooksNumber = state.books.length

                state.relevanceBooks = sortedArrBooks

            } else {
                if (action.payload === 'all') {
                    state.books = state.bookByCategory
                } else {
                    state.books = [
                        { status: 'falling' }
                    ]
                }
            }

        },
    },
    extraReducers: (builder) => {
        builder.addCase(getSingleBook.fulfilled, (state, { payload }) => {
            state.status = 'idle'
            state.singleBook = payload
        })
        builder.addCase(getAllBooks.pending, (state, action) => {
            state.status = 'loading'
        })
        builder.addCase(getAllBooks.fulfilled, (state, { payload }) => {

            const booksWithCovers = payload.items?.map((singleBook: any) => {
                return {
                    ...singleBook.volumeInfo,
                    id: singleBook?.id,
                    coverImg: singleBook.volumeInfo.imageLinks && singleBook.volumeInfo.imageLinks.smallThumbnail
                }

            });

            state.totalBooksNumber = payload.totalItems ? payload.totalItems : undefined;
            state.books = booksWithCovers
            state.relevanceBooks = booksWithCovers
            state.bookByCategory = booksWithCovers
            state.status = 'idle'
        })
    }

});

export const {
    selectedByCategory,
    sortingByDate,
    reset,
} = booksSreach.actions;
export default booksSreach.reducer;
