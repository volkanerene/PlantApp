// src/api/categories.ts
import apiClient from './client';
import { Category } from '../store/slices/categoriesSlice';

interface CategoriesResponse {
  data: Category[];
}

export const fetchCategories = async (): Promise<CategoriesResponse> => {
  try {
    const response = await apiClient.get<CategoriesResponse>('/getCategories');
    return response.data;
  } catch (error) {
    throw error;
  }
};
