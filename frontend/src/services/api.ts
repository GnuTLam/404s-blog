// API service for development and production
import { useState, useEffect } from 'react';
import { config, getApiUrl } from '../config/env';
import { Post, mockPosts, categoryInfo } from '../data/mockData';

// API Response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// API Error class
export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

// Generic fetch wrapper for future real API calls
const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  const url = getApiUrl(endpoint);
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), config.apiTimeout);

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new ApiError(response.status, `HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return { data, success: true };
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error) {
      throw new ApiError(500, error.message);
    }
    throw new ApiError(500, 'Unknown error occurred');
  }
};

// Mock API simulation delay
const simulateApiDelay = (ms: number = 500): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Posts API hooks
export const useFetchPosts = (page: number = 1, category?: string) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: config.postsPerPage,
    total: 0,
    totalPages: 0,
  });

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);

      try {
        if (config.enableMockData) {
          // Mock data simulation
          await simulateApiDelay(300);
          
          let filteredPosts = mockPosts;
          
          // Filter by category if specified
          if (category && category !== 'all') {
            filteredPosts = mockPosts.filter(post => post.category === category);
          }

          // Calculate pagination
          const total = filteredPosts.length;
          const totalPages = Math.ceil(total / config.postsPerPage);
          const startIndex = (page - 1) * config.postsPerPage;
          const endIndex = startIndex + config.postsPerPage;
          const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

          setPosts(paginatedPosts);
          setPagination({
            page,
            limit: config.postsPerPage,
            total,
            totalPages,
          });
        } else {
          // Real API call would go here
          const response = await apiRequest<PaginatedResponse<Post>>(
            `/posts?page=${page}&limit=${config.postsPerPage}${category ? `&category=${category}` : ''}`
          );
          
          setPosts(response.data.data);
          setPagination(response.data.pagination);
        }
      } catch (err) {
        const errorMessage = err instanceof ApiError ? err.message : 'Failed to fetch posts';
        setError(errorMessage);
        if (config.debugMode) {
          console.error('Posts fetch error:', err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page, category]);

  return { posts, loading, error, pagination };
};

export const useFetchPost = (id: string | undefined) => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchPost = async () => {
      setLoading(true);
      setError(null);

      try {
        if (config.enableMockData) {
          // Mock data simulation
          await simulateApiDelay(200);
          
          const foundPost = mockPosts.find(p => p.id === parseInt(id));
          if (!foundPost) {
            throw new ApiError(404, 'Post not found');
          }
          
          setPost(foundPost);
        } else {
          // Real API call would go here
          const response = await apiRequest<Post>(`/posts/${id}`);
          setPost(response.data);
        }
      } catch (err) {
        const errorMessage = err instanceof ApiError ? err.message : 'Failed to fetch post';
        setError(errorMessage);
        if (config.debugMode) {
          console.error('Post fetch error:', err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  return { post, loading, error };
};

// Categories API
export const useFetchCategories = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);

      try {
        if (config.enableMockData) {
          await simulateApiDelay(150);
          
          // Generate category data with post counts
          const categoryData = Object.entries(categoryInfo).map(([key, info]) => ({
            id: key,
            name: info.name,
            slug: key,
            icon: info.icon,
            color: info.color,
            post_count: mockPosts.filter(post => post.category === key).length
          }));

          setCategories(categoryData);
        } else {
          // Real API call would go here
          const response = await apiRequest<any[]>('/categories');
          setCategories(response.data);
        }
      } catch (err) {
        const errorMessage = err instanceof ApiError ? err.message : 'Failed to fetch categories';
        setError(errorMessage);
        if (config.debugMode) {
          console.error('Categories fetch error:', err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};

// Utility functions for future use
export const searchPosts = async (query: string): Promise<Post[]> => {
  if (config.enableMockData) {
    await simulateApiDelay(400);
    return mockPosts.filter(post => 
      post.title.toLowerCase().includes(query.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
      post.content.toLowerCase().includes(query.toLowerCase())
    );
  } else {
    const response = await apiRequest<Post[]>(`/posts/search?q=${encodeURIComponent(query)}`);
    return response.data;
  }
};

export const getPopularPosts = async (limit: number = 5): Promise<Post[]> => {
  if (config.enableMockData) {
    await simulateApiDelay(200);
    // Return first 5 posts as "popular"
    return mockPosts.slice(0, limit);
  } else {
    const response = await apiRequest<Post[]>(`/posts/popular?limit=${limit}`);
    return response.data;
  }
};

export const getRecentPosts = async (limit: number = 5): Promise<Post[]> => {
  if (config.enableMockData) {
    await simulateApiDelay(200);
    // Sort by date and return most recent
    return mockPosts
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, limit);
  } else {
    const response = await apiRequest<Post[]>(`/posts/recent?limit=${limit}`);
    return response.data;
  }
};

// Export types and utilities
export type { Post };
export { categoryInfo }; 