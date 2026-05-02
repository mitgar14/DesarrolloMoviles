import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useStore } from "@/store/store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ItemCard } from "@/components/ItemCard";
import { itemCategoryMeta, itemStatusMeta } from "@/lib/meta";
import { Plus, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ItemCategory, ItemStatus } from "@/types";
import { Card } from "@/components/ui/card";

export default function Items() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const items = useStore((s) => s.items);

  const [q, setQ] = useState("");
  const status = (params.get("status") as ItemStatus | null) ?? "todos";
  const category = (params.get("cat") as ItemCategory | null) ?? "todas";

  const setStatus = (v: string) => {
    const next = new URLSearchParams(params);
    if (v === "todos") next.delete("status"); else next.set("status", v);
    setParams(next);
  };
  const setCategory = (v: string) => {
    const next = new URLSearchParams(params);
    if (v === "todas") next.delete("cat"); else next.set("cat", v);
    setParams(next);
  };

  const filtered = useMemo(() => {
    return items.filter((i) => {
      if (status !== "todos" && i.status !== status) return false;
      if (category !== "todas" && i.category !== category) return false;
      if (q && !`${i.title} ${i.description}`.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [items, status, category, q]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-extrabold text-2xl">Objetos</h1>
          <p className="text-sm text-muted-foreground">Perdidos y encontrados en el campus</p>
        </div>
        <Button onClick={() => navigate("/items/new")} size="sm" className="bg-gradient-primary shadow-glow">
          <Plus className="h-4 w-4 mr-1" /> Publicar
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar por título o descripción" className="pl-9 h-11" />
      </div>

      {/* Status filter */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4">
        <Chip active={status === "todos"} onClick={() => setStatus("todos")}>Todos</Chip>
        {(Object.keys(itemStatusMeta) as ItemStatus[]).map((s) => (
          <Chip key={s} active={status === s} onClick={() => setStatus(s)}>{itemStatusMeta[s].label}</Chip>
        ))}
      </div>

      {/* Category filter */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4">
        <Chip active={category === "todas"} onClick={() => setCategory("todas")} subtle>Todas</Chip>
        {(Object.keys(itemCategoryMeta) as ItemCategory[]).map((c) => {
          const Icon = itemCategoryMeta[c].icon;
          return (
            <Chip key={c} active={category === c} onClick={() => setCategory(c)} subtle>
              <Icon className="h-3.5 w-3.5" /> {itemCategoryMeta[c].label}
            </Chip>
          );
        })}
      </div>

      <div className="space-y-2">
        {filtered.length === 0 ? (
          <Card className="p-8 text-center text-sm text-muted-foreground border-dashed">
            Sin resultados con esos filtros.
          </Card>
        ) : (
          filtered.map((i) => <ItemCard key={i.id} item={i} />)
        )}
      </div>
    </div>
  );
}

function Chip({ active, subtle, children, onClick }: { active?: boolean; subtle?: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "shrink-0 inline-flex items-center gap-1 px-3 h-8 rounded-full text-xs font-semibold border transition",
        active
          ? "bg-primary text-primary-foreground border-primary shadow-sm"
          : subtle
          ? "bg-card text-foreground border-border hover:border-primary/40"
          : "bg-muted text-foreground border-transparent hover:bg-accent"
      )}
    >
      {children}
    </button>
  );
}
