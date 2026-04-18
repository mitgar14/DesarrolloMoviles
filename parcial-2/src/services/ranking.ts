import {
  get,
  limitToLast,
  orderByChild,
  query,
  ref,
  set,
} from "firebase/database";
import { rtDb } from "../firebase";

export type MissionState = { id: number; completed: boolean };

export type ScorePayload = {
  uid: string;
  email: string;
  points: number;
  missions: MissionState[];
  missionsCompleted: number;
};

export type RankingUser = {
  uid: string;
  email: string;
  points: number;
  missionsCompleted: number;
  updatedAt: number;
};

export async function guardarPuntajeUsuario(payload: ScorePayload) {
  await set(ref(rtDb, `scores/${payload.uid}`), {
    ...payload,
    updatedAt: Date.now(),
  });
}

function normalizarRanking(data: any): RankingUser[] {
  if (!data) return [];

  return Object.entries(data).map(([uid, value]: [string, any]) => ({
    uid,
    email: value?.email ?? "sin-correo",
    points: Number(value?.points ?? 0),
    missionsCompleted: Number(value?.missionsCompleted ?? 0),
    updatedAt: Number(value?.updatedAt ?? 0),
  }));
}

function ordenarRankingDesc(items: RankingUser[]) {
  return [...items].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    return a.updatedAt - b.updatedAt;
  });
}

export async function obtenerTop5(): Promise<RankingUser[]> {
  const q = query(ref(rtDb, "scores"), orderByChild("points"), limitToLast(5));
  const snap = await get(q);
  const lista = normalizarRanking(snap.val());
  return ordenarRankingDesc(lista);
}

export async function obtenerPosicionUsuario(
  uid: string,
): Promise<number | null> {
  const snap = await get(ref(rtDb, "scores"));
  const lista = ordenarRankingDesc(normalizarRanking(snap.val()));
  const index = lista.findIndex((u) => u.uid === uid);
  return index >= 0 ? index + 1 : null;
}
