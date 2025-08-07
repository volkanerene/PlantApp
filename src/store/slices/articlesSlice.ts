// src/store/slices/articlesSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchArticles as apiFetchArticles } from '../../api/articles';

export interface Article {
  id: number;
  title: string;
  subtitle: string;
  image_uri: string;
  uri: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

export interface ArticlesState {
  data: Article[];
  loading: boolean;
  error: string | null;
  lastFetch: number | null;
}

const initialState: ArticlesState = {
  data: [],
  loading: false,
  error: null,
  lastFetch: null,
};

export const fetchArticles = createAsyncThunk<Article[], void>(
  'articles/fetchArticles',
  async (_, { rejectWithValue }) => {
    try {
      const list = await apiFetchArticles();
      return list;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to fetch articles');
    }
  }
);

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    clearArticles: (state) => {
      state.data = [];
      state.error = null;
      state.lastFetch = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action: PayloadAction<Article[]>) => {
        state.loading = false;
        state.data = action.payload;
        state.lastFetch = Date.now();
        state.error = null;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) ?? 'Failed to fetch articles';
      });
  },
});

export const { clearArticles, clearError } = articlesSlice.actions;
export default articlesSlice.reducer;