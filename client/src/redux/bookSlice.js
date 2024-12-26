import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for fetching books
export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  const response = await fetch("http://localhost:4000/books");
  const data = await response.json();
  return data;
});

// Async thunk for fetching book details
export const fetchBookDetails = createAsyncThunk(
  "books/fetchBookDetails",
  async (bookId) => {
    const response = await fetch(`http://localhost:4000/books/${bookId}`);
    const data = await response.json();
    return data;
  }
);

// Initial state
const initialState = {
  books: [],
  bookDetails: null,
  cart: [],
  status: "idle",
  error: null,
};

// Create slice
const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchBookDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBookDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bookDetails = action.payload;
      })
      .addCase(fetchBookDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Export actions
export const {} = bookSlice.actions;

// Export the reducer to be used in the store
export default bookSlice.reducer;
