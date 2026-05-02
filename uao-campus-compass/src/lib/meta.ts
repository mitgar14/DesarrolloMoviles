import {
  Backpack, BookOpen, FileText, Glasses, Key, Laptop, Package, Shirt,
  Briefcase, Coffee, FileSignature, HandHelping, Truck, Sparkles,
} from "lucide-react";
import type { ErrandStatus, ErrandType, ItemCategory, ItemStatus } from "@/types";

export const itemCategoryMeta: Record<ItemCategory, { label: string; icon: typeof Backpack }> = {
  electronica: { label: "Electrónica", icon: Laptop },
  documentos: { label: "Documentos", icon: FileText },
  ropa: { label: "Ropa", icon: Shirt },
  accesorios: { label: "Accesorios", icon: Glasses },
  libros: { label: "Libros", icon: BookOpen },
  llaves: { label: "Llaves", icon: Key },
  otros: { label: "Otros", icon: Package },
};

export const itemStatusMeta: Record<ItemStatus, { label: string; className: string }> = {
  perdido: { label: "Perdido", className: "bg-destructive/10 text-destructive border-destructive/20" },
  encontrado: { label: "Encontrado", className: "bg-success/10 text-success border-success/20" },
  reclamado: { label: "Reclamado", className: "bg-muted text-muted-foreground border-border" },
};

export const errandTypeMeta: Record<ErrandType, { label: string; icon: typeof Briefcase }> = {
  "recoger-documento": { label: "Recoger documento", icon: FileSignature },
  "entregar-objeto": { label: "Entregar objeto", icon: Truck },
  "comprar-campus": { label: "Comprar en campus", icon: Coffee },
  "acompanar-tramite": { label: "Acompañar trámite", icon: HandHelping },
  otra: { label: "Otra", icon: Sparkles },
};

export const errandStatusMeta: Record<ErrandStatus, { label: string; className: string }> = {
  abierta: { label: "Abierta", className: "bg-info/10 text-info border-info/20" },
  aceptada: { label: "Aceptada", className: "bg-warning/15 text-warning-foreground border-warning/30" },
  "en-progreso": { label: "En progreso", className: "bg-primary/10 text-primary border-primary/20" },
  completada: { label: "Completada", className: "bg-success/10 text-success border-success/20" },
  cancelada: { label: "Cancelada", className: "bg-muted text-muted-foreground border-border" },
};

export function relativeTime(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "ahora";
  if (m < 60) return `hace ${m} min`;
  const h = Math.floor(m / 60);
  if (h < 24) return `hace ${h} h`;
  const d = Math.floor(h / 24);
  if (d < 7) return `hace ${d} d`;
  return new Date(iso).toLocaleDateString("es-CO", { day: "numeric", month: "short" });
}

export function formatCOP(v: number) {
  return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(v);
}
