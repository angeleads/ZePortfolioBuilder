// app/page.tsx
"use client";

import { useState, useEffect } from "react";
import { User } from "firebase/auth";
import { auth } from "../providers/firebase";
import { useRouter } from "next/navigation";
import RootLayout from "./layout";

export default function Page({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!user && !isLoading) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <RootLayout>{children}</RootLayout>;
}
