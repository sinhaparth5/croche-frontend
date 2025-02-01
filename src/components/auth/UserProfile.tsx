// src/components/auth/UserProfile.tsx
import { useEffect, useState } from 'react';
import { api } from '../../utils/api';
import type { User } from '../../types';

interface Props {
  id: string;
}

export default function UserProfile({ id }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) throw new Error('Please login to view profile');

        const userData = await api.getUserDetails(id, token);
        setUser(userData);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Failed to fetch user';
        setError(message);
        console.error('API Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) return (
    <div className="flex justify-center items-center h-screen pt-28">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-pink-600"></div>
    </div>
  );

  if (error) return (
    <div className="text-center pt-28 px-4">
      <div className="bg-pink-50 rounded-lg p-6 max-w-2xl mx-auto shadow-md">
        <div className="text-pink-600 i-ph-warning-circle-fill text-4xl mb-4"></div>
        <h2 className="text-2xl font-bold text-pink-800 mb-2">Error occurred</h2>
        <p className="text-pink-700">{error}</p>
      </div>
    </div>
  );

  if (!user) return null;

  return (
    <div className="pt-28 px-4 min-h-screen bg-pink-50">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 transition-all hover:shadow-xl">
        <div className="flex flex-col items-center mb-8">
          <div className="w-32 h-32 bg-pink-100 rounded-full flex items-center justify-center mb-6">
            <span className="i-ph-user-circle-fill text-6xl text-pink-400"></span>
          </div>
          <h1 className="text-3xl font-bold text-pink-800 mb-2">{user.name}'s Profile</h1>
          <p className="text-pink-600 flex items-center gap-2">
            <span className="i-ph-envelope-simple-fill"></span>
            {user.email}
          </p>
        </div>

        {user.userDetails && (
          <div className="space-y-6">
            <div className="space-y-4 border-t border-pink-100 pt-6">
              {user.userDetails.address && (
                <div className="flex items-center gap-4 text-pink-700">
                  <span className="i-ph-map-pin-fill text-xl text-pink-500"></span>
                  <p>{user.userDetails.address}</p>
                </div>
              )}

              {user.userDetails.city && (
                <div className="flex items-center gap-4 text-pink-700">
                  <span className="i-ph-buildings-fill text-xl text-pink-500"></span>
                  <p>{user.userDetails.city}</p>
                </div>
              )}

              {/* Update other fields similarly */}
              {user.userDetails.country && (
                <div className="flex items-center gap-4 text-pink-700">
                  <span className="i-ph-globe-hemisphere-east-fill text-xl text-pink-500"></span>
                  <p>{user.userDetails.country}</p>
                </div>
              )}

              {user.userDetails.phone && (
                <div className="flex items-center gap-4 text-pink-700">
                  <span className="i-ph-phone-fill text-xl text-pink-500"></span>
                  <p>{user.userDetails.phone}</p>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}