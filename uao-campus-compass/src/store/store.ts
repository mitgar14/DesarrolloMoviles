import { useSyncExternalStore } from "react";
import type {
  AppNotification,
  Errand,
  ErrandStatus,
  LostFoundItem,
  ItemStatus,
  UserProfile,
} from "@/types";

interface State {
  currentUserId: string | null;
  users: UserProfile[];
  items: LostFoundItem[];
  errands: Errand[];
  notifications: AppNotification[];
}

const STORAGE_KEY = "uao-conecta-state-v1";

const seedUsers: UserProfile[] = [
  { id: "u-demo", name: "Estudiante Demo", email: "demo@uao.edu.co", career: "Ingeniería de Software", phone: "300 000 0000", createdAt: new Date().toISOString() },
  { id: "u-laura", name: "Laura Martínez", email: "laura.m@uao.edu.co", career: "Comunicación Social", phone: "311 222 3344", createdAt: new Date().toISOString() },
  { id: "u-andres", name: "Andrés Quintero", email: "andres.q@uao.edu.co", career: "Diseño de la Comunicación Gráfica", createdAt: new Date().toISOString() },
  { id: "u-mariana", name: "Mariana Vélez", email: "mariana.v@uao.edu.co", career: "Mercadeo y Negocios Internacionales", phone: "317 555 8899", createdAt: new Date().toISOString() },
];

const seedItems: LostFoundItem[] = [
  { id: "i1", title: "AirPods Pro blancos", description: "Estuche con sticker de la UAO. Perdidos cerca del salón A-203.", category: "electronica", status: "perdido", locationId: "bloque-a", date: new Date(Date.now() - 86400000).toISOString(), userId: "u-laura", createdAt: new Date(Date.now() - 86400000).toISOString(), photoUrl: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f37?w=800&q=80" },
  { id: "i2", title: "Carné estudiantil", description: "Carné a nombre de Juan P. Encontrado en mesa de la cafetería.", category: "documentos", status: "encontrado", locationId: "cafeteria", date: new Date(Date.now() - 3600000 * 5).toISOString(), userId: "u-andres", createdAt: new Date(Date.now() - 3600000 * 5).toISOString(), photoUrl: "https://images.unsplash.com/photo-1614036417651-efe5912149d8?w=800&q=80" },
  { id: "i3", title: "Llaves con llavero rojo", description: "Juego de 3 llaves, llavero de la UAO.", category: "llaves", status: "perdido", locationId: "biblioteca", date: new Date(Date.now() - 3600000 * 26).toISOString(), userId: "u-mariana", createdAt: new Date(Date.now() - 3600000 * 26).toISOString(), photoUrl: "https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?w=800&q=80" },
  { id: "i4", title: "Cuaderno Norma azul", description: "Cuaderno con apuntes de Cálculo Vectorial.", category: "libros", status: "encontrado", locationId: "bloque-c", date: new Date(Date.now() - 3600000 * 8).toISOString(), userId: "u-demo", createdAt: new Date(Date.now() - 3600000 * 8).toISOString(), photoUrl: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800&q=80" },
  { id: "i5", title: "Chaqueta negra North Face", description: "Talla M, dejada en silla del bloque B.", category: "ropa", status: "encontrado", locationId: "bloque-b", date: new Date(Date.now() - 3600000 * 30).toISOString(), userId: "u-laura", createdAt: new Date(Date.now() - 3600000 * 30).toISOString(), photoUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80" },
];

const seedErrands: Errand[] = [
  { id: "e1", title: "Recoger acta en Registro Académico", description: "Necesito que alguien recoja mi acta firmada y me la lleve a la cafetería.", type: "recoger-documento", originId: "bloque-a", destinationId: "cafeteria", reward: 5000, status: "abierta", creatorId: "u-laura", createdAt: new Date(Date.now() - 3600000 * 2).toISOString() },
  { id: "e2", title: "Comprar café para reunión", description: "3 cafés americanos en la cafetería, llevarlos al salón B-105.", type: "comprar-campus", originId: "cafeteria", destinationId: "bloque-b", reward: 3000, status: "abierta", creatorId: "u-mariana", createdAt: new Date(Date.now() - 3600000 * 1).toISOString() },
  { id: "e3", title: "Acompañar a trámite en Bienestar", description: "Voy a un trámite y me siento mejor con compañía.", type: "acompanar-tramite", originId: "porteria", destinationId: "bienestar", status: "aceptada", creatorId: "u-andres", acceptedById: "u-demo", createdAt: new Date(Date.now() - 3600000 * 4).toISOString() },
  { id: "e4", title: "Entregar libro en biblioteca", description: "Devolver libro antes de las 5pm.", type: "entregar-objeto", originId: "bloque-c", destinationId: "biblioteca", reward: 2000, status: "completada", creatorId: "u-demo", acceptedById: "u-laura", createdAt: new Date(Date.now() - 3600000 * 28).toISOString() },
];

const seedNotifications: AppNotification[] = [
  { id: "n1", kind: "errand-accepted", title: "Diligencia aceptada", body: "Aceptaste 'Acompañar a trámite en Bienestar'.", read: false, createdAt: new Date(Date.now() - 3600000 * 3).toISOString(), link: "/errands/e3" },
  { id: "n2", kind: "item-found", title: "Posible coincidencia", body: "Se publicó un cuaderno encontrado en el Bloque C.", read: false, createdAt: new Date(Date.now() - 3600000 * 7).toISOString(), link: "/items/i4" },
  { id: "n3", kind: "system", title: "Bienvenido a UAO Conecta", body: "Tu campus, mejor conectado.", read: true, createdAt: new Date(Date.now() - 3600000 * 48).toISOString() },
];

const initialState: State = {
  currentUserId: null,
  users: seedUsers,
  items: seedItems,
  errands: seedErrands,
  notifications: seedNotifications,
};

const loadState = (): State => {
  if (typeof window === "undefined") return initialState;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialState;
    const parsed = JSON.parse(raw) as Partial<State>;
    return { ...initialState, ...parsed };
  } catch {
    return initialState;
  }
};

let state: State = loadState();
const listeners = new Set<() => void>();

const persist = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch { /* noop */ }
};

const setState = (updater: (s: State) => State) => {
  state = updater(state);
  persist();
  listeners.forEach((l) => l());
};

export const store = {
  getState: () => state,
  subscribe: (l: () => void) => {
    listeners.add(l);
    return () => listeners.delete(l);
  },

  // Auth
  login(email: string): UserProfile | null {
    const user = state.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!user) return null;
    setState((s) => ({ ...s, currentUserId: user.id }));
    return user;
  },
  register(input: Omit<UserProfile, "id" | "createdAt">): UserProfile {
    const existing = state.users.find((u) => u.email.toLowerCase() === input.email.toLowerCase());
    if (existing) {
      setState((s) => ({ ...s, currentUserId: existing.id }));
      return existing;
    }
    const user: UserProfile = { ...input, id: `u-${Date.now()}`, createdAt: new Date().toISOString() };
    setState((s) => ({ ...s, users: [...s.users, user], currentUserId: user.id }));
    pushNotification({ kind: "system", title: `Bienvenido, ${user.name.split(" ")[0]}`, body: "Tu cuenta UAO Conecta está lista." });
    return user;
  },
  logout() { setState((s) => ({ ...s, currentUserId: null })); },
  updateProfile(patch: Partial<UserProfile>) {
    if (!state.currentUserId) return;
    setState((s) => ({ ...s, users: s.users.map((u) => u.id === s.currentUserId ? { ...u, ...patch } : u) }));
  },

  // Items
  createItem(input: Omit<LostFoundItem, "id" | "createdAt" | "userId">): LostFoundItem {
    const userId = state.currentUserId ?? "u-demo";
    const item: LostFoundItem = { ...input, id: `i-${Date.now()}`, userId, createdAt: new Date().toISOString() };
    setState((s) => ({ ...s, items: [item, ...s.items] }));
    if (item.status === "encontrado") {
      pushNotification({ kind: "item-found", title: "Nuevo objeto encontrado", body: `${item.title} fue publicado como encontrado.`, link: `/items/${item.id}` });
    }
    return item;
  },
  setItemStatus(id: string, status: ItemStatus) {
    setState((s) => ({ ...s, items: s.items.map((i) => i.id === id ? { ...i, status } : i) }));
    const item = state.items.find((i) => i.id === id);
    if (item && status === "reclamado") {
      pushNotification({ kind: "item-claimed", title: "Objeto reclamado", body: `${item.title} fue marcado como reclamado.`, link: `/items/${id}` });
    }
  },

  // Errands
  createErrand(input: Omit<Errand, "id" | "createdAt" | "creatorId" | "status">): Errand {
    const creatorId = state.currentUserId ?? "u-demo";
    const errand: Errand = { ...input, id: `e-${Date.now()}`, creatorId, status: "abierta", createdAt: new Date().toISOString() };
    setState((s) => ({ ...s, errands: [errand, ...s.errands] }));
    return errand;
  },
  acceptErrand(id: string) {
    const userId = state.currentUserId;
    if (!userId) return;
    setState((s) => ({ ...s, errands: s.errands.map((e) => e.id === id ? { ...e, status: "aceptada", acceptedById: userId } : e) }));
    const errand = state.errands.find((e) => e.id === id);
    if (errand) pushNotification({ kind: "errand-accepted", title: "Diligencia aceptada", body: `Aceptaste '${errand.title}'.`, link: `/errands/${id}` });
  },
  setErrandStatus(id: string, status: ErrandStatus) {
    setState((s) => ({ ...s, errands: s.errands.map((e) => e.id === id ? { ...e, status } : e) }));
    const errand = state.errands.find((e) => e.id === id);
    if (errand) pushNotification({ kind: "errand-status", title: "Diligencia actualizada", body: `'${errand.title}' ahora está ${status}.`, link: `/errands/${id}` });
  },

  // Notifications
  markNotificationRead(id: string) {
    setState((s) => ({ ...s, notifications: s.notifications.map((n) => n.id === id ? { ...n, read: true } : n) }));
  },
  markAllRead() {
    setState((s) => ({ ...s, notifications: s.notifications.map((n) => ({ ...n, read: true })) }));
  },
  reset() {
    localStorage.removeItem(STORAGE_KEY);
    state = { ...initialState, users: seedUsers, items: seedItems, errands: seedErrands, notifications: seedNotifications, currentUserId: null };
    listeners.forEach((l) => l());
  },
};

const pushNotification = (input: Omit<AppNotification, "id" | "read" | "createdAt">) => {
  const n: AppNotification = { ...input, id: `n-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, read: false, createdAt: new Date().toISOString() };
  setState((s) => ({ ...s, notifications: [n, ...s.notifications] }));
};

// React hooks
export function useStore<T>(selector: (s: State) => T): T {
  return useSyncExternalStore(
    (l) => store.subscribe(l),
    () => selector(store.getState()),
    () => selector(initialState),
  );
}

export const useCurrentUser = (): UserProfile | null =>
  useStore((s) => s.users.find((u) => u.id === s.currentUserId) ?? null);
