export interface HttpClientInterface {
  get<T>(url: string, config?: RequestConfig): Promise<T>
  post<T, D>(url: string, data?: D, config?: RequestConfig): Promise<T>
  put<T, D>(url: string, data?: D, config?: RequestConfig): Promise<T>
  delete<T>(url: string, config?: RequestConfig): Promise<T>
}

export interface RequestConfig {
  headers?: Record<string, string>
  params?: Record<string, string | number | boolean>
  timeout?: number
}
