// src/api/articles.ts
import apiClient from './client';
import { Article } from '../store/slices/articlesSlice';


export const fetchArticles = async (): Promise<Article[]> => {
  try {
    const res = await apiClient.get<Article[]>('/getQuestions');
    return res.data;
  } catch (error) {
    throw error;
  }
};
