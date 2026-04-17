import { useEffect, useState } from "react";
import { Network } from "@capacitor/network";

export const useNetwork = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [connectionType, setConnectionType] = useState<string>("unknown");

  useEffect(() => {
    Network.getStatus().then((status) => {
      setIsConnected(status.connected);
      setConnectionType(status.connectionType);
    });

    const handler = Network.addListener("networkStatusChange", (status) => {
      setIsConnected(status.connected);
      setConnectionType(status.connectionType);
    });

    return () => {
      handler.then((h) => h.remove());
    };
  }, []);

  return { isConnected, connectionType };
};
