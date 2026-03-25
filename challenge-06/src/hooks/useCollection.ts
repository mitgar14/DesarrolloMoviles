import { useState, useEffect } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { fsDb } from "../firebase";

export default function useCollection(table: string) {
  const [results, setResults] = useState<any[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAll = async () => {
    setIsPending(true);
    setError(null);
    try {
      const colRef = collection(fsDb, table);
      const snapshot = await getDocs(colRef);
      const data = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
      setResults(data);
    } catch (err: any) {
      setError(err.message);
    }
    setIsPending(false);
  };

  const add = async (data: any) => {
    setIsPending(true);
    try {
      await addDoc(collection(fsDb, table), {
        ...data,
        createdAt: new Date().toISOString(),
      });
      await getAll();
    } catch (err: any) {
      setError(err.message);
    }
    setIsPending(false);
  };

  const update = async (id: string, data: any) => {
    setIsPending(true);
    try {
      await updateDoc(doc(fsDb, table, id), {
        ...data,
        updatedAt: new Date().toISOString(),
      });
      await getAll();
    } catch (err: any) {
      setError(err.message);
    }
    setIsPending(false);
  };

  const remove = async (id: string) => {
    setIsPending(true);
    try {
      await deleteDoc(doc(fsDb, table, id));
      await getAll();
    } catch (err: any) {
      setError(err.message);
    }
    setIsPending(false);
  };

  useEffect(() => {
    getAll();
  }, [table]);

  return { results, isPending, error, getAll, add, update, remove };
}
