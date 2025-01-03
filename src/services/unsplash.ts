import { UNSPLASH_API } from '../config/api';
import type { UnsplashImage } from '../types';

export async function fetchImages(searchQuery: string): Promise<UnsplashImage[]> {
  if (!UNSPLASH_API.ACCESS_KEY) {
    throw new Error('Unsplash API key is not configured');
  }

  const endpoint = searchQuery
    ? `${UNSPLASH_API.BASE_URL}${UNSPLASH_API.ENDPOINTS.SEARCH}?query=${searchQuery}&per_page=30`
    : `${UNSPLASH_API.BASE_URL}${UNSPLASH_API.ENDPOINTS.RANDOM}?count=30`;

  const response = await fetch(endpoint, {
    headers: {
      Authorization: `Client-ID ${UNSPLASH_API.ACCESS_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch images');
  }

  const data = await response.json();
  return searchQuery ? data.results || [] : data || [];
}