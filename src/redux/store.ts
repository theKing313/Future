import { configureStore } from "@reduxjs/toolkit";
import BookSearchSlice from './features/BookSearchSlice';

export const store = configureStore({
    reducer: {
        // books: BookSearchSlice
        BookSearchSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
            },
        }),
    devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;