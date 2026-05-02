import { useState } from "react";
import { CampusMap } from "@/components/CampusMap";
import { CAMPUS_LOCATIONS, getLocation } from "@/data/campus";
import type { CampusLocationId } from "@/types";
import { Card } from "@/components/ui/card";
import { useStore } from "@/store/store";
import { MapPin, Package, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MapPage() {
  const [selected, setSelected] = useState<CampusLocationId>("biblioteca");
  const items = useStore((s) => s.items);
  const errands = useStore((s) => s.errands);
  const navigate = useNavigate();

  const itemsHere = items.filter((i) => i.locationId === selected && i.status !== "reclamado");
  const errandsHere = errands.filter((e) => (e.originId === selected || e.destinationId === selected) && e.status !== "completada" && e.status !== "cancelada");

  const loc = getLocation(selected);

  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-display font-extrabold text-2xl">Mapa del campus</h1>
        <p className="text-sm text-muted-foreground">Explora los puntos de la UAO y la actividad reciente.</p>
      </div>

      <div className="h-[55vh] min-h-[360px] rounded-2xl overflow-hidden border border-border/60 shadow-md">
        <CampusMap selectedId={selected} onSelect={setSelected} />
      </div>

      {/* Quick chips */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4">
        {CAMPUS_LOCATIONS.map((l) => (
          <button
            key={l.id}
            onClick={() => setSelected(l.id)}
            className={`shrink-0 px-3 h-8 rounded-full text-xs font-semibold border transition ${
              selected === l.id ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:border-primary/40"
            }`}
          >
            {l.name}
          </button>
        ))}
      </div>

      <Card className="p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-10 w-10 rounded-xl bg-primary/10 grid place-items-center text-primary">
            <MapPin className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-display font-bold">{loc.name}</h2>
            <p className="text-xs text-muted-foreground">{loc.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button onClick={() => navigate("/items")} className="p-3 rounded-xl bg-muted/50 text-left hover:bg-muted transition">
            <Package className="h-4 w-4 text-primary mb-1" />
            <p className="text-xl font-display font-extrabold">{itemsHere.length}</p>
            <p className="text-[11px] text-muted-foreground">Objetos activos aquí</p>
          </button>
          <button onClick={() => navigate("/errands")} className="p-3 rounded-xl bg-muted/50 text-left hover:bg-muted transition">
            <Briefcase className="h-4 w-4 text-primary mb-1" />
            <p className="text-xl font-display font-extrabold">{errandsHere.length}</p>
            <p className="text-[11px] text-muted-foreground">Diligencias relacionadas</p>
          </button>
        </div>
      </Card>
    </div>
  );
}
