// src/api.ts
import type { 
  LoginCredentials, 
  RegisterData, 
  AuthResponse, 
  User, 
  Product 
} from '../types';

const API_BASE_URL = 'https://croche-backend-production.up.railway.app/api';

class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  const data = await response.json();
  
  if (!response.ok) {
    throw new ApiError(
      data.message || 'API request failed',
      response.status,
      data
    );
  }
  
  return data;
}

export const api = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    return handleResponse<AuthResponse>(response);
  },

  async register(userData: RegisterData): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return handleResponse<AuthResponse>(response);
  },

  async getProducts(): Promise<{ products: Product[] }> {
    const response = await fetch(`${API_BASE_URL}/products`);
    return handleResponse<{ products: Product[] }>(response);
  },

  // New product by ID endpoint
  async getProduct(id: string): Promise<{ product: Product }> {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    return handleResponse<{ product: Product }>(response);
  },

  async getUserDetails(userId: string, token: string): Promise<User> {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return handleResponse<User>(response);
  }
};