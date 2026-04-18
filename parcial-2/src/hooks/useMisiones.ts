import { useEffect, useMemo, useState } from "react";

type Mision = {
  id: number;
  titulo: string;
  puntos: number;
  completada: boolean;
  habilitada: boolean;
};

type EstadoGuardado = {
  points: number;
  missions: { id: number; completed: boolean }[];
};

const STORAGE_KEY = "parcial2_estado";

const BASE_MISIONES: Mision[] = [
  {
    id: 1,
    titulo: "Tomar foto",
    puntos: 40,
    completada: false,
    habilitada: true,
  },
  {
    id: 2,
    titulo: "Moverse 50 metros",
    puntos: 40,
    completada: false,
    habilitada: true,
  },
  {
    id: 3,
    titulo: "Esperar 10 segundos quieto y vibrar",
    puntos: 40,
    completada: false,
    habilitada: false,
  },
];

function cargarEstado(): EstadoGuardado {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return { points: 0, missions: [] };

  try {
    const parsed = JSON.parse(raw) as EstadoGuardado;
    return {
      points: parsed.points ?? 0,
      missions: Array.isArray(parsed.missions) ? parsed.missions : [],
    };
  } catch {
    return { points: 0, missions: [] };
  }
}

function construirMisiones(estado: EstadoGuardado): Mision[] {
  const m2Completada =
    estado.missions.find((m) => m.id === 2)?.completed ?? false;

  return BASE_MISIONES.map((m) => {
    const completada =
      estado.missions.find((x) => x.id === m.id)?.completed ?? false;

    if (m.id === 3) {
      return { ...m, completada, habilitada: m2Completada || completada };
    }

    return { ...m, completada };
  });
}

export function useMisiones() {
  const estadoInicial = useMemo(() => cargarEstado(), []);
  const [puntos, setPuntos] = useState<number>(estadoInicial.points);
  const [misiones, setMisiones] = useState<Mision[]>(
    construirMisiones(estadoInicial),
  );

  const completarMision = (id: number) => {
    const mision = misiones.find((m) => m.id === id);
    if (!mision || mision.completada || !mision.habilitada) return;

    setMisiones((prev) =>
      prev.map((m) => {
        if (m.id === id) return { ...m, completada: true };
        if (id === 2 && m.id === 3) return { ...m, habilitada: true };
        return m;
      }),
    );

    setPuntos((prev) => prev + mision.puntos);
  };

  useEffect(() => {
    const payload: EstadoGuardado = {
      points: puntos,
      missions: misiones.map((m) => ({ id: m.id, completed: m.completada })),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [puntos, misiones]);

  const total = misiones.length;
  const completadas = misiones.filter((m) => m.completada).length;
  const progreso = total === 0 ? 0 : completadas / total;

  return {
    puntos,
    misiones,
    completarMision,
    completadas,
    total,
    progreso,
  };
}
