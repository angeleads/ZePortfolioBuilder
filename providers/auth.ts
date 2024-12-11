// providers/auth.ts
import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { auth } from './firebase';

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      console.log('User state changed:', currentUser);
      setUser(currentUser);
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  return { user, isLoading };
};

export { useAuth };
