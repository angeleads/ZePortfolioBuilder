'use client'

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "@/providers/firebase";
import Image from "next/image";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user && pathname === '/auth') {
        router.push("/projects");
      }
    });

    return () => unsubscribe();
  }, [pathname, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Welcome ", email);
    } catch (error) {
      setError((error as any).message);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        userId: user.uid,
        username: username,
        email: email,
      });

      setIsLogin(true);
    } catch (error) {
      setError((error as any).message);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError("");
    setEmail("");
    setPassword("");
    setUsername("");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black text-white p-4">
      <div className="relative w-[1000px] h-[600px]">
        {/* Login Form - Fixed Left */}
        <div className="absolute left-0 top-0 w-1/2 h-full">
          <div className={`w-full h-full transition-opacity duration-700 ${isLogin ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <form onSubmit={handleLogin} className="h-full bg-gray-900 p-12 flex flex-col justify-center rounded-l-2xl">
              <h1 className="text-3xl font-bold text-center font-inter mb-8">
                Welcome back
              </h1>
              {error && <p className="text-red-500 mb-6 text-center">{error}</p>}
              <div className="space-y-6">
                <input
                  type="email"
                  value={email}
                  placeholder="zypriano@zyprim.com"
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-gray-700 focus:border-purple-500 rounded-xl w-full py-3 px-4 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-gray-800/50"
                  required
                />
                <input
                  type="password"
                  value={password}
                  placeholder="********"
                  onChange={(e) => setPassword(e.target.value)}
                  className="border border-gray-700 focus:border-purple-500 rounded-xl w-full py-3 px-4 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-gray-800/50"
                  required
                />
                <button
                  type="submit"
                  className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-4 rounded-xl focus:outline-none focus:shadow-outline w-full transition-colors"
                >
                  Login
                </button>
              </div>
              <div className="mt-8 text-center">
                <button
                  type="button"
                  onClick={toggleForm}
                  className="text-sm hover:text-purple-400 transition-colors"
                >
                  Don't have an account yet? <span className="font-bold">Join Us</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Sliding Image */}
        <div 
          className={`absolute top-0 w-1/2 h-full transition-transform duration-700 ease-in-out ${
            isLogin ? 'left-1/2' : 'left-0'
          }`}
        >
          <div className="w-full h-full relative">
            <Image
              src="/images/login-image.jpg"
              alt="Authentication"
              width={500}
              height={600}
              className="w-full h-full object-cover rounded-2xl"
              priority
            />
            <div className="absolute inset-0 bg-purple-600/30 backdrop-blur-[2px] rounded-2xl" />
          </div>
        </div>

        {/* Signup Form - Fixed Right */}
        <div className="absolute right-0 top-0 w-1/2 h-full">
          <div className={`w-full h-full transition-opacity duration-700 ${!isLogin ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <form onSubmit={handleSignup} className="h-full bg-gray-900 p-12 flex flex-col justify-center rounded-r-2xl">
              <h1 className="text-3xl font-bold text-center font-inter mb-8">Welcome</h1>
              {error && <p className="text-red-500 mb-6 text-center">{error}</p>}
              <div className="space-y-6">
                <input
                  type="text"
                  placeholder="zypriano"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="border border-gray-700 focus:border-purple-500 rounded-xl w-full py-3 px-4 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-gray-800/50"
                  required
                />
                <input
                  type="email"
                  value={email}
                  placeholder="zypriano@zyprim.com"
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-gray-700 focus:border-purple-500 rounded-xl w-full py-3 px-4 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-gray-800/50"
                  required
                />
                <input
                  type="password"
                  value={password}
                  placeholder="********"
                  onChange={(e) => setPassword(e.target.value)}
                  className="border border-gray-700 focus:border-purple-500 rounded-xl w-full py-3 px-4 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-gray-800/50"
                  required
                />
                <button
                  type="submit"
                  className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-4 rounded-xl focus:outline-none focus:shadow-outline w-full transition-colors"
                >
                  Sign Up
                </button>
              </div>
              <div className="mt-8 text-center">
                <button
                  type="button"
                  onClick={toggleForm}
                  className="text-sm hover:text-purple-400 transition-colors"
                >
                  Already have an account? <span className="font-bold">Login</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;