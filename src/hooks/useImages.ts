import { useState, useEffect } from 'react';
import { fetchUnsplashImages } from '../services/api/unsplash';
import type { UnsplashImage } from '../types';
import type { ApiResponse } from '../types/api';

export function useImages(searchQuery: string): ApiResponse<UnsplashImage[]> {
  const [state, setState] = useState<ApiResponse<UnsplashImage[]>>({
    data: [],
    error: null,
    loading: false,
  });

  useEffect(() => {
    const loadImages = async () => {
      setState(prev => ({ ...prev, loading: true, error: null }));
      try {
        const data = await fetchUnsplashImages(searchQuery);
        setState({ data, loading: false, error: null });
      } catch (error) {
        setState({
          data: [],
          loading: false,
          error: error instanceof Error ? error : new Error('Failed to fetch images'),
        });
      }
    };

    const debounceTimeout = setTimeout(loadImages, 500);
    return () => clearTimeout(debounceTimeout);
  }, [searchQuery]);

  return state;
}