export interface User {
  id: string;
  name: string;
  email: string;
  userDetails?: UserDetails; // Changed from 'details' to 'userDetails'
  isAdmin?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserDetails {
  id?: string;
  userId?: string;
  address?: string;
  city?: string;
  pincode?: number;
  country?: string;
  phone?: string;
  createdAt?: string;
  updatedAt?: string;
}
  
  export interface Product {
    id: string;
    name: string;
    description: string;
    images: ProductImage[];
    prices: ProductPrice[];
    category: string;
    stock: number;
  }
  
  export interface ProductImage {
    id: string;
    url: string;
    thumbnail: string;
  }
  
  export interface ProductPrice {
    id: string;
    size: string;
    value: number;
  }
  
  export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface RegisterData extends LoginCredentials {
    name: string;
    details?: UserDetails;
  }
  
  export interface AuthResponse {
    token: string;
    user: User;
  }
  