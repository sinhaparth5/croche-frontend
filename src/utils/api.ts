import type { LoginInput, RegisterInput, AuthResponse } from "../types/auth";

const GRAPHQL_URL = 'http://localhost:3000/graphql';

const LOGIN_MUTATION = `
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      access_token
      user {
        id
        name
        email
        isAdmin
        createdAt
        updatedAt
      }
    }
  }
`;

const REGISTER_MUTATION = `
  mutation Register($input: RegisterUserInput!) {
    register(input: $input) {
      access_token
      user {
        id
        name
        email
        isAdmin
        createdAt
        updatedAt
      }
    }
  }
`;

async function graphqlRequest<T>(query: string, variables: Record<string, any>): Promise<T> {
  const response = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'apollo-require-preflight': 'true'
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    credentials: 'include',
  });

  const data = await response.json();

  if (data.errors) {
    throw new Error(data.errors[0]?.message || 'GraphQL request failed');
  }

  return data.data;
}

export const authApi = {
  async login(credentials: LoginInput): Promise<AuthResponse> {
    const data = await graphqlRequest<{ login: AuthResponse }>(
      LOGIN_MUTATION,
      { input: credentials }
    );
    return data.login;
  },

  async register(userData: RegisterInput): Promise<AuthResponse> {
    const data = await graphqlRequest<{ register: AuthResponse }>(
      REGISTER_MUTATION,
      { input: userData }
    );
    return data.register;
  }
}