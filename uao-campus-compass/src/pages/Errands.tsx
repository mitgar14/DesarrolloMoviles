import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "@/store/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ErrandCard } from "@/components/ErrandCard";
import { errandStatusMeta } from "@/lib/meta";
import { Plus, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ErrandStatus } from "@/types";

export default function Errands() {
  const navigate = useNavigate();
  const errands = useStore((s) => s.errands);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<ErrandStatus | "todas">("todas");

  const filtered = useMemo(() => errands.filter((e) => {
    if (status !== "todas" && e.status !== status) return false;
    if (q && !`${e.title} ${e.description}`.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  }), [errands, status, q]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-extrabold text-2xl">Diligencias</h1>
          <p className="text-sm text-muted-foreground">Ayuda y resuelve dentro del campus</p>
        </div>
        <Button onClick={() => navigate("/errands/new")} size="sm" className="bg-gradient-primary shadow-glow">
          <Plus className="h-4 w-4 mr-1" /> Crear
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar diligencias" className="pl-9 h-11" />
      </div>

      <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4">
        <Chip active={status === "todas"} onClick={() => setStatus("todas")}>Todas</Chip>
        {(Object.keys(errandStatusMeta) as ErrandStatus[]).map((s) => (
          <Chip key={s} active={status === s} onClick={() => setStatus(s)}>{errandStatusMeta[s].label}</Chip>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.length === 0 ? (
          <Card className="p-8 text-center text-sm text-muted-foreground border-dashed">
            No hay diligencias en este filtro.
          </Card>
        ) : (
          filtered.map((e) => <ErrandCard key={e.id} errand={e} />)
        )}
      </div>
    </div>
  );
}

function Chip({ active, children, onClick }: { active?: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "shrink-0 px-3 h-8 rounded-full text-xs font-semibold border transition",
        active ? "bg-primary text-primary-foreground border-primary" : "bg-card text-foreground border-border hover:border-primary/40"
      )}
    >
      {children}
    </button>
  );
}
