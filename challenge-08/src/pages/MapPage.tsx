import { useState, useEffect, useRef } from "react";
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonButton, IonButtons, IonBackButton, IonToggle, IonLabel,
  IonItem, IonList, IonToast, IonIcon, IonChip,
} from "@ionic/react";
import {
  mapOutline, locateOutline, navigateOutline, saveOutline,
  locationOutline, closeCircleOutline,
} from "ionicons/icons";
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";

import { useGeolocation } from "../hooks/useGeolocation";
import { useAccelerometer } from "../hooks/useAccelerometer";
import { useDevice } from "../hooks/useDevice";
import { useHaptics } from "../hooks/useHaptics";
import { useNetwork } from "../hooks/useNetwork";
import { useFilesystem } from "../hooks/useFilesystem";
import { getAddress, searchNearby } from "../services/opencagedata";

import "../components/MapComponent.css";

// (b) RecenterMap: componente hijo de MapContainer para mover la vista
const RecenterMap = ({ position }: { position: any }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView([position.latitude, position.longitude]);
    }
  }, [position]);
  return null;
};

const MapPage: React.FC = () => {
  const { position, error, watchId, getCurrentLocation, startTracking, stopTracking } = useGeolocation();
  const { isMoving } = useAccelerometer({ threshold: 20, interval: 200 });
  const { battery } = useDevice();
  const { vibrate } = useHaptics();
  const { isConnected } = useNetwork();
  const { writeFile } = useFilesystem();

  const [path, setPath] = useState<[number, number][]>([]);
  const [ready, setReady] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [nearbyPlaces, setNearbyPlaces] = useState<any[]>([]);
  const [autoTrack, setAutoTrack] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Refs para controlar notificaciones inteligentes
  const lastMoveTime = useRef(Date.now());
  const idleNotified = useRef(false);
  const lowBatteryNotified = useRef(false);
  const disconnectNotified = useRef(false);
  const isTracking = watchId !== null;

  // (a) WiFi check: obtener ubicación solo si hay conexión
  useEffect(() => {
    if (isConnected) {
      getCurrentLocation();
    } else {
      setToast("Sin conexión WiFi. Conecta para usar el mapa.");
    }
  }, []);

  // Marcar mapa como listo y acumular path
  useEffect(() => {
    if (position) {
      setReady(true);
      setPath((prev) => [...prev, [position.latitude, position.longitude]]);
    }
  }, [position]);

  // (b) Auto-tracking por movimiento del acelerómetro
  useEffect(() => {
    if (!autoTrack) return;

    if (isMoving && !isTracking) {
      handleStartTracking();
    } else if (!isMoving && isTracking) {
      const timeout = setTimeout(() => {
        handleStopTracking();
        setToast("Tracking detenido: sin movimiento detectado.");
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [isMoving, autoTrack]);

  // (f) Detener tracking si batería baja (<15%)
  useEffect(() => {
    if (!battery || !isTracking) return;
    if (battery.batteryLevel < 0.15 && !lowBatteryNotified.current) {
      lowBatteryNotified.current = true;
      handleStopTracking();
      setToast(`Batería baja (${Math.round(battery.batteryLevel * 100)}%). Tracking detenido.`);
    }
  }, [battery, isTracking]);

  // (g) Notificación inteligente: sin conexión durante tracking
  useEffect(() => {
    if (!isConnected && isTracking && !disconnectNotified.current) {
      disconnectNotified.current = true;
      setToast("Sin conexión durante tracking. Los datos se guardan localmente.");
    }
    if (isConnected) {
      disconnectNotified.current = false;
    }
  }, [isConnected, isTracking]);

  // (g) Notificación inteligente: idle (30s sin movimiento mientras trackea)
  useEffect(() => {
    if (!isTracking) return;

    if (isMoving) {
      lastMoveTime.current = Date.now();
      idleNotified.current = false;
    }

    const interval = setInterval(() => {
      const idleTime = Date.now() - lastMoveTime.current;
      if (idleTime > 30000 && !idleNotified.current) {
        idleNotified.current = true;
        setToast("Llevas más de 30 segundos quieto con el tracking activo.");
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isTracking, isMoving]);

  // (g) Notificación inteligente: movimiento rápido
  useEffect(() => {
    if (!position?.speed || !isTracking) return;
    if (position.speed > 10) {
      setToast(`Movimiento rápido detectado: ${position.speed.toFixed(1)} m/s`);
    }
  }, [position?.speed]);

  // (e) Vibrar al iniciar tracking
  const handleStartTracking = async () => {
    await vibrate(300);
    await startTracking();
    setToast("Tracking iniciado");
  };

  const handleStopTracking = async () => {
    await stopTracking();
  };

  // (h) Obtener dirección actual con OpenCage
  const handleGetAddress = async () => {
    if (!position) return;
    try {
      const data = await getAddress(position.latitude, position.longitude);
      setAddress(data.results?.[0]?.formatted || "Dirección no encontrada");
    } catch {
      setToast("Error al obtener dirección");
    }
  };

  // (h) Lugares cercanos con OpenCage
  const handleNearbyPlaces = async () => {
    if (!position) return;
    try {
      setToast("Buscando lugares cercanos...");
      const places = await searchNearby(position.latitude, position.longitude);
      setNearbyPlaces(places as any[]);
    } catch {
      setToast("Error al buscar lugares cercanos");
    }
  };

  // (c) Guardar ruta en JSON
  const handleSaveRoute = async () => {
    if (path.length === 0) {
      setToast("No hay ruta para guardar");
      return;
    }
    const routeData = {
      date: new Date().toISOString(),
      points: path,
      totalPoints: path.length,
    };
    const filename = `tracking_${Date.now()}.json`;
    await writeFile(filename, routeData);
    setToast(`Ruta guardada: ${filename}`);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Mapa</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {/* Barra de estado con indicadores de sensores */}
        <div className="status-bar">
          <span className="status-item">
            <span className={`status-dot ${isConnected ? "green" : "red"}`} />
            {isConnected ? "WiFi" : "Sin red"}
          </span>
          <span className="status-item">
            <span className={`status-dot ${battery && battery.batteryLevel > 0.2 ? "green" : "yellow"}`} />
            {battery ? `${Math.round(battery.batteryLevel * 100)}%` : "..."}
          </span>
          <span className="status-item">
            <span className={`status-dot ${isMoving ? "blue" : "red"}`} />
            {isMoving ? "En movimiento" : "Quieto"}
          </span>
          {isTracking && (
            <IonChip color="success" style={{ height: 24, fontSize: 12 }}>
              <IonIcon icon={navigateOutline} />
              <IonLabel>Tracking ({path.length} pts)</IonLabel>
            </IonChip>
          )}
        </div>

        {/* Mapa */}
        {ready && position ? (
          <MapContainer
            center={[position.latitude, position.longitude]}
            zoom={18}
            className="map-container"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <RecenterMap position={position} />
            <Marker position={[position.latitude, position.longitude]} />
            {path.length > 1 && <Polyline positions={path} color="blue" />}
          </MapContainer>
        ) : (
          <div className="map-container" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <p>{error ? `Error: ${error.message || error}` : "Obteniendo ubicación..."}</p>
          </div>
        )}

        {/* Dirección actual */}
        {address && (
          <div className="address-display">
            <IonIcon icon={locationOutline} /> {address}
          </div>
        )}

        {/* Botones de acción */}
        <div style={{ padding: "0 8px" }}>
          <IonButton expand="block" color="success" onClick={handleStartTracking} disabled={isTracking}>
            <IonIcon icon={navigateOutline} slot="start" />
            Iniciar Tracking
          </IonButton>
          <IonButton expand="block" color="danger" onClick={handleStopTracking} disabled={!isTracking}>
            <IonIcon icon={closeCircleOutline} slot="start" />
            Detener Tracking
          </IonButton>

          <div style={{ display: "flex", gap: 8 }}>
            <IonButton expand="block" style={{ flex: 1 }} onClick={handleGetAddress} disabled={!position}>
              <IonIcon icon={locateOutline} slot="start" />
              Dirección
            </IonButton>
            <IonButton expand="block" style={{ flex: 1 }} onClick={handleSaveRoute} disabled={path.length === 0}>
              <IonIcon icon={saveOutline} slot="start" />
              Guardar ruta
            </IonButton>
          </div>

          <IonButton expand="block" color="tertiary" onClick={handleNearbyPlaces} disabled={!position}>
            <IonIcon icon={mapOutline} slot="start" />
            Lugares cercanos
          </IonButton>

          {/* (b) Toggle de auto-tracking */}
          <IonItem>
            <IonLabel>Auto-tracking por movimiento</IonLabel>
            <IonToggle checked={autoTrack} onIonChange={(e) => setAutoTrack(e.detail.checked)} />
          </IonItem>
        </div>

        {/* (h) Lista de lugares cercanos */}
        {nearbyPlaces.length > 0 && (
          <IonList className="nearby-list">
            {nearbyPlaces.map((place, i) => (
              <IonItem key={i}>
                <IonIcon icon={locationOutline} slot="start" color="tertiary" />
                <IonLabel className="ion-text-wrap">
                  <p>{place.formatted}</p>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}

        <IonToast
          isOpen={!!toast}
          message={toast || ""}
          duration={3000}
          onDidDismiss={() => setToast(null)}
        />
      </IonContent>
    </IonPage>
  );
};

export default MapPage;
