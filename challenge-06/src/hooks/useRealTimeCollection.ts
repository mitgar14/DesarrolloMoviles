import { useState, useEffect } from "react";
import { ref, set, push, onValue, remove } from "firebase/database";
import { rtDb } from "../firebase";

export default function useRealTimeCollection(table: string) {
  const [results, setResults] = useState<any[]>([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsPending(true);
    const dbRef = ref(rtDb, table);

    const unsubscribe = onValue(
      dbRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const data = Object.entries(snapshot.val()).map(([id, value]: [string, any]) => ({
            id,
            ...value,
          }));
          setResults(data);
        } else {
          setResults([]);
        }
        setIsPending(false);
      },
      (err) => {
        setError(err.message);
        setIsPending(false);
      }
    );

    return () => unsubscribe();
  }, [table]);

  const add = async (data: any) => {
    try {
      await push(ref(rtDb, table), {
        ...data,
        createdAt: new Date().toISOString(),
      });
    } catch (err: any) {
      setError(err.message);
    }
  };

  const update = async (id: string, data: any) => {
    try {
      await set(ref(rtDb, `${table}/${id}`), {
        ...data,
        updatedAt: new Date().toISOString(),
      });
    } catch (err: any) {
      setError(err.message);
    }
  };

  const deleteDoc = async (id: string) => {
    try {
      await remove(ref(rtDb, `${table}/${id}`));
    } catch (err: any) {
      setError(err.message);
    }
  };

  return { results, isPending, error, add, update, deleteDoc };
}
