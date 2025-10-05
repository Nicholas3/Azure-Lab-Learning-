export interface Response<T> {
  statusCode: number;
  payload: T;
  error?: string;
}
