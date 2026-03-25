import { useState } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import db from "../db";

export default function useDexie(table: string, filterFn?: (item: any) => boolean) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [manualResults, setManualResults] = useState<any[]>([]);

  const liveResults = useLiveQuery(() => {
    if (filterFn) {
      return (db as any)[table].filter(filterFn).toArray();
    }
    return (db as any)[table].toArray();
  }, [table]) ?? [];

  const getAll = async () => {
    let data;
    if (filterFn) {
      data = await (db as any)[table].filter(filterFn).toArray();
    } else {
      data = await (db as any)[table].toArray();
    }
    setManualResults(data);
  };

  const add = async (data: any) => {
    setIsPending(true);
    try {
      await (db as any)[table].add({
        ...data,
        createdAt: new Date().toISOString(),
      });
    } catch (err: any) {
      setError(err.message);
    }
    setIsPending(false);
  };

  const update = async (id: number, data: any) => {
    setIsPending(true);
    try {
      await (db as any)[table].update(id, data);
    } catch (err: any) {
      setError(err.message);
    }
    setIsPending(false);
  };

  const deleteItem = async (id: number) => {
    setIsPending(true);
    try {
      await (db as any)[table].delete(id);
    } catch (err: any) {
      setError(err.message);
    }
    setIsPending(false);
  };

  return { liveResults, manualResults, isPending, error, getAll, add, update, deleteItem };
}
