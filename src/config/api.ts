// API configuration
export const UNSPLASH_API = {
  BASE_URL: 'https://api.unsplash.com',
  ACCESS_KEY: import.meta.env.VITE_UNSPLASH_ACCESS_KEY || '',
  ENDPOINTS: {
    RANDOM: '/photos/random',
    SEARCH: '/search/photos',
  },
};