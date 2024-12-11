// providers/auth.ts
'use client'

import { useState, useEffect } from 'react';
import { auth } from './firebase';

const useAuth = () => {
  const [user, setUser] = useState<auth.User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  return { user, isLoading };
};

export { useAuth };