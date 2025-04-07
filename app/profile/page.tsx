"use client";

import { useState, useEffect } from "react";
import { db, auth } from "@/providers/firebase";
import { User } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<{
    username: string;
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
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        setUserData(userDoc.data() as { username: string; email: string });
      } else {
        setUserData(null);
      }
    };
    fetchUser();
  }, [user, isLoading]);

  useEffect(() => {
    if (!user && !isLoading) {
      router.push("/auth");
    }
  }, [user, isLoading, router]);

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    const target = e.target as typeof e.target & {
      username: { value: string };
      email: { value: string };
    };
    await updateDoc(userRef, {
      username: target.username.value,
      email: target.email.value,
    });
    setUserData({ username: target.username.value, email: target.email.value });
  };

  const handleLogout = async () => {
    if (user) {
      await signOut(auth);
      console.log(`User ${user.uid} just logged out`);
      router.push("/auth");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <div
          className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] text-purple-400"
          role="status"
        ></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        You must be logged in to view this profile.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen p-5 bg-black text-white">
      <h1 className="text-4xl font-bold mb-6">Profile Management</h1>
      <div className="bg-gray-800 p-8 rounded-2xl shadow-md w-full max-w-md">
        {userData && (
          <form onSubmit={handleUpdateProfile}>
            <div className="mb-4">
              <input
                type="text"
                id="username"
                defaultValue={userData.username}
                className="shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline bg-gray-700"
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                id="email"
                disabled
                defaultValue={userData.email}
                className="disabled shadow appearance-none border rounded-full w-full py-2 px-3 text-gray-500 leading-tight focus:outline-none focus:shadow-outline bg-gray-700"
              />
            </div>
            <button
              type="submit"
              className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline w-full"
            >
              Update Profile
            </button>
          </form>
        )}
        {!userData && <p>No user data found.</p>}
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline mt-4 w-full"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
