import { CampusLocation } from "@/types";

// Coordenadas aproximadas centradas en el campus UAO Cali (Valle del Lili)
export const CAMPUS_CENTER: [number, number] = [-76.5305, 3.3552];

export const CAMPUS_LOCATIONS: CampusLocation[] = [
  { id: "biblioteca", name: "Biblioteca", description: "Centro de recursos y estudio", coordinates: [-76.5310, 3.3556] },
  { id: "cafeteria", name: "Cafetería", description: "Zona de alimentación principal", coordinates: [-76.5301, 3.3550] },
  { id: "bloque-a", name: "Bloque A", description: "Aulas de Ingeniería", coordinates: [-76.5308, 3.3549] },
  { id: "bloque-b", name: "Bloque B", description: "Aulas de Ciencias Sociales", coordinates: [-76.5298, 3.3554] },
  { id: "bloque-c", name: "Bloque C", description: "Laboratorios y talleres", coordinates: [-76.5312, 3.3546] },
  { id: "bienestar", name: "Bienestar Universitario", description: "Salud, cultura y deportes", coordinates: [-76.5295, 3.3559] },
  { id: "porteria", name: "Portería principal", description: "Entrada y salida del campus", coordinates: [-76.5318, 3.3552] },
  { id: "parqueaderos", name: "Parqueaderos", description: "Carros y motos", coordinates: [-76.5290, 3.3545] },
];

export const getLocation = (id: string) =>
  CAMPUS_LOCATIONS.find((l) => l.id === id) ?? CAMPUS_LOCATIONS[0];
