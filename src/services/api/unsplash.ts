import { UNSPLASH_API } from '../../config/api';
import { handleApiResponse } from '../../utils/api';
import type { UnsplashImage } from '../../types';

export async function fetchUnsplashImages(searchQuery: string): Promise<UnsplashImage[]> {
  if (!UNSPLASH_API.ACCESS_KEY) {
    throw new Error('Unsplash API key is not configured. Please add it to your .env file.');
  }

  const endpoint = searchQuery
    ? `${UNSPLASH_API.BASE_URL}${UNSPLASH_API.ENDPOINTS.SEARCH}?query=${encodeURIComponent(searchQuery)}&per_page=30`
    : `${UNSPLASH_API.BASE_URL}${UNSPLASH_API.ENDPOINTS.RANDOM}?count=30`;

  const response = await fetch(endpoint, {
    headers: {
      Authorization: `Client-ID ${UNSPLASH_API.ACCESS_KEY}`,
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = await handleApiResponse<any>(response);
  return searchQuery ? data.results || [] : data || [];
}