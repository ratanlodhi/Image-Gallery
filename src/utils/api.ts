import { ApiError } from '../types/api';

export async function handleApiResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = new Error(response.statusText) as ApiError;
    error.status = response.status;
    error.statusText = response.statusText;
    throw error;
  }
  return response.json();
}