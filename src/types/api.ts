export interface ApiError extends Error {
  status?: number;
  statusText?: string;
}

export interface ApiResponse<T> {
  data: T;
  error: ApiError | null;
  loading: boolean;
}