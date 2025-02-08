import type { User } from "../types/auth";
import Cookies from 'js-cookie';

export const auth = {
  getToken(): string | null {
    return Cookies.get('authToken') || null;
  },
  getUser(): User | null {
    const userData = Cookies.get('user');
    return userData ? JSON.parse(userData) : null;
  },
  login(token: string, user: User): void {
    // Set the token and user data in cookies
    Cookies.set('authToken', token, { expires: 7, secure: true, sameSite: 'strict' }); // Expires in 7 days
    Cookies.set('user', JSON.stringify(user), { expires: 7, secure: true, sameSite: 'strict' });
    window.dispatchEvent(new Event('authChange'));
  },
  logout(): void {
    // Remove the token and user data from cookies
    Cookies.remove('authToken');
    Cookies.remove('user');
    window.dispatchEvent(new Event('authChange'));
  },
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  },
  updateUser(updatedUser: User): void {
    const currentUser = this.getUser();
    if (currentUser) {
      const newUser = { ...currentUser, ...updatedUser };
      Cookies.set('user', JSON.stringify(newUser), { expires: 7, secure: true, sameSite: 'strict' });
      window.dispatchEvent(new Event("auth-change"));
    }
  },
};