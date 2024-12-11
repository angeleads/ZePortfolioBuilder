// app/login/page.tsx
'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/providers/firebase";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Congratulations ", email, " you are signed in!");
      router.push("/projects");
    } catch (error) {
      setError((error as any).message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black text-white">
      <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-lg shadow-xl shadow-purple-400 w-96">
        <h1 className="text-2xl font-bold text-center">Login to</h1>
        <h1 className="text-2xl font-bold mb-6 text-center">ZePortfolioBuilder</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="mb-4">
          <input
            type="email"
            id="email"
            value={email}
            placeholder="zypriano@zyprim.com"
            onChange={(e) => setEmail(e.target.value)}
            className="border focus:border-purple-500 rounded-xl w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-gray-700"
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
            className="border focus:border-purple-500 rounded-xl w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-gray-700"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline w-full"
        >
          Login
        </button>
        <div className="mt-5 mb-3 w-full flex justify-center">
          <h1 className="text-center text-sm">Don't have an account yet? <a href="/signup" className="font-bold">Join Us</a></h1>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
