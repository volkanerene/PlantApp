// src/store/slices/categoriesSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchCategories as apiFetchCategories } from '../../api/categories';

export interface Category {
  plantCount: string;
  id: number;
  title: string;
  image: {
    id: number;
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: any;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: any;
    createdAt: string;
    updatedAt: string;
  };
  rank: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface CategoriesState {
  data: Category[];
  loading: boolean;
  error: string | null;
  lastFetch: number | null;
}

const initialState: CategoriesState = {
  data: [],
  loading: false,
  error: null,
  lastFetch: null,
};

export const fetchCategories = createAsyncThunk<Category[], void>(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiFetchCategories();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch categories');
    }
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    clearCategories: (state) => {
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
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
    .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
    state.loading = false;
    state.data = action.payload.sort((a, b) => a.rank - b.rank);
        state.lastFetch = Date.now();
        state.error = null;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCategories, clearError } = categoriesSlice.actions;
export default categoriesSlice.reducer;