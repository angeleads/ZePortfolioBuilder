// app/profile/page.tsx
'use client'

import { useState, useEffect } from 'react';
import { db, auth } from '@/providers/firebase';
import { User } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<{
    name: string;
    email: string;
  } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!user || isLoading) return;
    const fetchUser = async () => {
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        setUserData(userDoc.data() as { name: string; email: string });
      } else {
        setUserData(null);
      }
    };
    fetchUser();
  }, [user, isLoading]);

  useEffect(() => {
    if (!user && !isLoading) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    const userRef = doc(db, 'users', user.uid);
    const target = e.target as typeof e.target & {
      name: { value: string };
      email: { value: string };
    };
    await updateDoc(userRef, {
      name: target.name.value,
      email: target.email.value,
    });
    setUserData({ name: target.name.value, email: target.email.value });
  };

  const handleLogout = async () => {
    if (user) {
      await signOut(auth);
      console.log(`User ${user.uid} just logged out`);
      router.push('/login');
    }
  };

  if (isLoading) {
    return (
      <div
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] text-purple-400"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    );
  }

  if (!user) {
    return <div className="flex justify-center items-center h-screen text-white">You must be logged in to view this profile.</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen p-5 bg-black text-white">
      <h1 className="text-4xl font-bold mb-6">Profile Management</h1>
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        {userData && (
          <form onSubmit={handleUpdateProfile}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-purple-300 text-sm font-bold mb-2">
                Name:
              </label>
              <input
                type="text"
                id="name"
                defaultValue={userData.name}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-purple-300 text-sm font-bold mb-2">
                Email:
              </label>
              <input
                type="email"
                id="email"
                defaultValue={userData.email}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              Update Profile
            </button>
          </form>
        )}
        {!userData && <p>No user data found.</p>}
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 w-full"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
