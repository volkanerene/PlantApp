// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import appReducer from './slices/appSlice';
import categoriesReducer from './slices/categoriesSlice';
import articlesReducer from './slices/articlesSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    categories: categoriesReducer,
    articles: articlesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;