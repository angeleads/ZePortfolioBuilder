'use client'
import { useState, useEffect } from 'react';
import { db } from '@/providers/firebase';
import { useAuth } from '@/providers/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';

const ProfilePage = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState<{ name: string; email: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (user) {
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
    }
  }, [user]);

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

  return (
    <div className="p-5">
      <h1>Profile Management</h1>
      {userData && (
        <form onSubmit={handleUpdateProfile}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
            <input
              type="text"
              id="name"
              defaultValue={userData.name}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
            <input
              type="email"
              id="email"
              defaultValue={userData.email}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Update Profile</button>
        </form>
      )}
      {!userData && <p>No user data found.</p>}
      <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4">Logout</button>
    </div>
  );
};

export default ProfilePage;