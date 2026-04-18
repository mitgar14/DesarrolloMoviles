import { LocalNotifications } from "@capacitor/local-notifications";

export async function prepararNotificaciones() {
  const estado = await LocalNotifications.checkPermissions();

  if (estado.display !== "granted") {
    await LocalNotifications.requestPermissions();
  }
}

async function enviarNotificacion(title: string, body: string) {
  await LocalNotifications.schedule({
    notifications: [
      {
        id: Date.now() % 1000000,
        title,
        body,
        schedule: { at: new Date(Date.now() + 500) },
      },
    ],
  });
}

export async function notificarMisionCompletada() {
  await enviarNotificacion("Misión completada", "Has completado una misión");
}

export async function notificarFaltaUnaMision() {
  await enviarNotificacion("Casi terminas", "Te falta 1 misión para completar");
}
