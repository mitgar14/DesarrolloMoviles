import { useEffect, useState } from "react";
import {
  User,
  UserCredential,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const login = (email: string, password: string): Promise<UserCredential> => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const register = (
    email: string,
    password: string,
  ): Promise<UserCredential> => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logout = (): Promise<void> => {
    return signOut(auth);
  };

  return { user, loading, login, register, logout };
}
