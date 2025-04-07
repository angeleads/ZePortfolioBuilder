"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
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
      if (user && pathname === "/auth") {
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
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
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
      <div className="relative w-[1000px] h-[600px] shadow-2xl rounded-2xl overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-3xl bg-gray-900" />
        <div className="absolute left-0 top-0 w-1/2 h-full">
          <div
            className={`w-full h-full transition-all duration-700 ease-out ${
              isLogin
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-full pointer-events-none"
            }`}
          >
            <form
              onSubmit={handleLogin}
              className="h-full bg-gray-900/40 backdrop-blur-xl p-12 flex flex-col justify-center rounded-l-2xl"
            >
              <h1 className="text-4xl font-bold text-center font-inter mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Welcome back
              </h1>
              {error && (
                <p className="text-red-500 mb-6 text-center">{error}</p>
              )}
              <div className="space-y-6">
                <input
                  type="email"
                  value={email}
                  placeholder="zypriano@zyprim.com"
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-purple-500/20 focus:border-purple-500 rounded-xl w-full py-3 px-4 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-gray-800/30 backdrop-blur-xl transition-all duration-300"
                  required
                />
                <input
                  type="password"
                  value={password}
                  placeholder="********"
                  onChange={(e) => setPassword(e.target.value)}
                  className="border border-purple-500/20 focus:border-purple-500 rounded-xl w-full py-3 px-4 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-gray-800/30 backdrop-blur-xl transition-all duration-300"
                  required
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-4 rounded-xl focus:outline-none focus:shadow-outline w-full transition-all duration-300 shadow-lg shadow-purple-500/20"
                >
                  Login
                </button>
              </div>
              <div className="mt-8 text-center">
                <button
                  type="button"
                  onClick={toggleForm}
                  className="text-sm transition-colors "
                >
                  Don't have an account yet?{" "}
                  <span className="font-bold hover:text-pink-400 transition-colors">
                    Join Us
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
        <div
          className={`absolute top-0 w-1/2 h-full transition-transform duration-700 ease-out ${
            isLogin ? "left-1/2" : "left-0"
          }`}
        >
          <div className="w-full h-full relative group">
            <Image
              src="/images/auth-image.jpg"
              alt="Authentication"
              width={500}
              height={600}
              className="w-full h-full object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/40 to-pink-600/40 group-hover:opacity-75 transition-opacity duration-300" />
            <div className="absolute inset-0 shadow-inner" />
          </div>
        </div>
        <div className="absolute right-0 top-0 w-1/2 h-full">
          <div
            className={`w-full h-full transition-all duration-700 ease-out ${
              !isLogin
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-full pointer-events-none"
            }`}
          >
            <form
              onSubmit={handleSignup}
              className="h-full bg-gray-900/40 backdrop-blur-xl p-12 flex flex-col justify-center rounded-r-2xl"
            >
              <h1 className="text-4xl font-bold text-center font-inter mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Welcome
              </h1>
              {error && (
                <p className="text-red-500 mb-6 text-center">{error}</p>
              )}
              <div className="space-y-6">
                <input
                  type="text"
                  placeholder="zypriano"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="border border-purple-500/20 focus:border-purple-500 rounded-xl w-full py-3 px-4 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-gray-800/30 backdrop-blur-xl transition-all duration-300"
                  required
                />
                <input
                  type="email"
                  value={email}
                  placeholder="zypriano@zyprim.com"
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-purple-500/20 focus:border-purple-500 rounded-xl w-full py-3 px-4 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-gray-800/30 backdrop-blur-xl transition-all duration-300"
                  required
                />
                <input
                  type="password"
                  value={password}
                  placeholder="********"
                  onChange={(e) => setPassword(e.target.value)}
                  className="border border-purple-500/20 focus:border-purple-500 rounded-xl w-full py-3 px-4 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-gray-800/30 backdrop-blur-xl transition-all duration-300"
                  required
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-4 rounded-xl focus:outline-none focus:shadow-outline w-full transition-all duration-300 shadow-lg shadow-purple-500/20"
                >
                  Sign Up
                </button>
              </div>
              <div className="mt-8 text-center">
                <button
                  type="button"
                  onClick={toggleForm}
                  className="text-sm group"
                >
                  Already have an account?{" "}
                  <span className="font-bold group-hover:text-pink-400 transition-colors">
                    Login
                  </span>
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
