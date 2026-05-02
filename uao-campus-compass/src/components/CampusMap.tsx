import { useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { CAMPUS_CENTER, CAMPUS_LOCATIONS, getLocation } from "@/data/campus";
import type { CampusLocationId } from "@/types";

interface CampusMapProps {
  selectedId?: CampusLocationId;
  highlightIds?: CampusLocationId[];
  onSelect?: (id: CampusLocationId) => void;
  className?: string;
}

const makePinIcon = (label: string, variant: "default" | "highlight" | "selected") => {
  const cls =
    variant === "selected"
      ? "bg-primary text-primary-foreground shadow-glow scale-110"
      : variant === "highlight"
      ? "bg-primary/90 text-primary-foreground"
      : "bg-background text-foreground";
  const dot =
    variant === "selected" ? "bg-primary" : variant === "highlight" ? "bg-primary/90" : "bg-foreground/70";

  const html = `
    <div class="flex flex-col items-center cursor-pointer transition-transform" style="transform: translate(-50%, -100%);">
      <div class="${cls} px-2.5 py-1 rounded-full text-[11px] font-semibold border border-border/70 shadow-md whitespace-nowrap">
        ${label}
      </div>
      <div class="${dot} h-2.5 w-2.5 rounded-full mt-1 ring-4 ring-background/70"></div>
    </div>
  `;
  return L.divIcon({
    html,
    className: "uao-pin",
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });
};

function FlyTo({ id }: { id?: CampusLocationId }) {
  const map = useMap();
  useEffect(() => {
    if (!id) return;
    const loc = getLocation(id);
    map.flyTo([loc.coordinates[1], loc.coordinates[0]], 17, { duration: 0.8 });
  }, [id, map]);
  return null;
}

export function CampusMap({ selectedId, highlightIds, onSelect, className }: CampusMapProps) {
  const center = useMemo<[number, number]>(() => {
    const loc = selectedId ? getLocation(selectedId) : { coordinates: CAMPUS_CENTER };
    return [loc.coordinates[1], loc.coordinates[0]];
  }, [selectedId]);

  return (
    <div className={className ?? "h-full w-full"}>
      <MapContainer
        center={center}
        zoom={16}
        scrollWheelZoom
        style={{ height: "100%", width: "100%", borderRadius: "1rem" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FlyTo id={selectedId} />
        {CAMPUS_LOCATIONS.map((loc) => {
          const variant: "default" | "highlight" | "selected" =
            loc.id === selectedId
              ? "selected"
              : highlightIds?.includes(loc.id)
              ? "highlight"
              : "default";
          return (
            <Marker
              key={loc.id}
              position={[loc.coordinates[1], loc.coordinates[0]]}
              icon={makePinIcon(loc.name, variant)}
              eventHandlers={{ click: () => onSelect?.(loc.id) }}
            >
              <Tooltip direction="top" offset={[0, -28]} opacity={0.95}>
                <strong>{loc.name}</strong>
                <br />
                <span style={{ fontSize: 11 }}>{loc.description}</span>
              </Tooltip>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
