export type CampusLocationId =
  | "biblioteca"
  | "cafeteria"
  | "bloque-a"
  | "bloque-b"
  | "bloque-c"
  | "bienestar"
  | "porteria"
  | "parqueaderos";

export interface CampusLocation {
  id: CampusLocationId;
  name: string;
  description: string;
  /** [lng, lat] */
  coordinates: [number, number];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  career: string;
  phone?: string;
  avatarUrl?: string;
  createdAt: string;
}

export type ItemStatus = "perdido" | "encontrado" | "reclamado";
export type ItemCategory =
  | "electronica"
  | "documentos"
  | "ropa"
  | "accesorios"
  | "libros"
  | "llaves"
  | "otros";

export interface LostFoundItem {
  id: string;
  title: string;
  description: string;
  category: ItemCategory;
  photoUrl?: string;
  status: ItemStatus;
  locationId: CampusLocationId;
  date: string;
  userId: string;
  createdAt: string;
}

export type ErrandType =
  | "recoger-documento"
  | "entregar-objeto"
  | "comprar-campus"
  | "acompanar-tramite"
  | "otra";

export type ErrandStatus =
  | "abierta"
  | "aceptada"
  | "en-progreso"
  | "completada"
  | "cancelada";

export interface Errand {
  id: string;
  title: string;
  description: string;
  type: ErrandType;
  originId: CampusLocationId;
  destinationId: CampusLocationId;
  reward?: number;
  status: ErrandStatus;
  creatorId: string;
  acceptedById?: string;
  createdAt: string;
}

export type NotificationKind =
  | "errand-accepted"
  | "errand-status"
  | "item-found"
  | "item-claimed"
  | "system";

export interface AppNotification {
  id: string;
  kind: NotificationKind;
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
  link?: string;
}
