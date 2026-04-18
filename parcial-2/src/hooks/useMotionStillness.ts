import { useState } from "react";
import { Motion } from "@capacitor/motion";
import { Haptics } from "@capacitor/haptics";

export function useMotionStillness() {
  const [running, setRunning] = useState(false);

  const waitStillAndVibrate = async () => {
    if (running) return false;
    setRunning(true);

    let moved = false;
    let listener: any = null;

    try {
      listener = await Motion.addListener("accel", (event) => {
        const x = Math.abs(event.acceleration?.x ?? 0);
        const y = Math.abs(event.acceleration?.y ?? 0);
        const z = Math.abs(event.acceleration?.z ?? 0);

        if (x > 0.35 || y > 0.35 || z > 0.35) {
          moved = true;
        }
      });

      await new Promise<void>((resolve) => setTimeout(resolve, 10000));

      if (!moved) {
        await Haptics.vibrate({ duration: 300 });
        return true;
      }

      return false;
    } finally {
      if (listener) {
        await listener.remove();
      }
      setRunning(false);
    }
  };

  return { running, waitStillAndVibrate };
}
