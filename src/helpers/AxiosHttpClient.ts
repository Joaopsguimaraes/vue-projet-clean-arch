// AxiosHttpClient.ts

import type { HttpClientInterface, RequestConfig } from '@/types/HttpClientInterface'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'

export class AxiosHttpClient implements HttpClientInterface {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      // baseURL: process.env.VUE_APP_API_BASE_URL,
      baseURL: 'http://localhost:3000',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  async get<T>(url: string, config?: RequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.get(url, config as AxiosRequestConfig)
    return response.data
  }

  async post<T, D>(url: string, data?: D, config?: RequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.post(
      url,
      data,
      config as AxiosRequestConfig,
    )
    return response.data
  }

  async put<T, D>(url: string, data?: D, config?: RequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.put(
      url,
      data,
      config as AxiosRequestConfig,
    )
    return response.data
  }

  async delete<T>(url: string, config?: RequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.delete(url, config as AxiosRequestConfig)
    return response.data
  }
}
