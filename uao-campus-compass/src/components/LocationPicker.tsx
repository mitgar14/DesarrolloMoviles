import { CAMPUS_LOCATIONS } from "@/data/campus";
import { cn } from "@/lib/utils";
import type { CampusLocationId } from "@/types";
import { Building2, Coffee, FlaskConical, HeartPulse, Library, ParkingSquare, ShieldCheck, Warehouse } from "lucide-react";

const ICONS: Record<CampusLocationId, typeof Library> = {
  biblioteca: Library,
  cafeteria: Coffee,
  "bloque-a": Building2,
  "bloque-b": Warehouse,
  "bloque-c": FlaskConical,
  bienestar: HeartPulse,
  porteria: ShieldCheck,
  parqueaderos: ParkingSquare,
};

interface LocationPickerProps {
  value?: CampusLocationId;
  onChange: (id: CampusLocationId) => void;
}

export function LocationPicker({ value, onChange }: LocationPickerProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
      {CAMPUS_LOCATIONS.map((loc) => {
        const Icon = ICONS[loc.id];
        const active = value === loc.id;
        return (
          <button
            key={loc.id}
            type="button"
            onClick={() => onChange(loc.id)}
            className={cn(
              "p-3 rounded-xl border text-left transition group",
              active
                ? "border-primary bg-primary/5 shadow-glow"
                : "border-border bg-card hover:border-primary/40 hover:bg-muted/40"
            )}
          >
            <Icon className={cn("h-5 w-5 mb-1.5", active ? "text-primary" : "text-muted-foreground")} />
            <p className={cn("text-xs font-semibold leading-tight", active && "text-primary")}>{loc.name}</p>
          </button>
        );
      })}
    </div>
  );
}
