// app/signup/page.tsx
'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "@/providers/firebase";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        userId: user.uid,
        username: username,
        email: email,
      });

      router.push("/login");
    } catch (error) {
      setError((error as any).message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black text-white">
      <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-lg shadow-xl shadow-purple-400 w-96">
      <h1 className="text-2xl font-bold text-center">Signup to</h1>
      <h1 className="text-2xl font-bold mb-6 text-center">ZePortfolioBuilder</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <input
            type="text"
            id="username"
            placeholder="zypriano"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            id="email"
            value={email}
            placeholder="zypriano@zyprim.com"
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            id="password"
            value={password}
            placeholder="********"
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline w-full"
        >
          Sign Up
        </button>
        <div className="mt-5 mb-3 w-full flex justify-center">
          <h1 className="text-center text-sm">Do you already have an account? <a href="/login" className="font-bold">Login</a></h1>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
