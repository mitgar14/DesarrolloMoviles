import { useNavigate } from "react-router-dom";
import { store, useStore } from "@/store/store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { relativeTime } from "@/lib/meta";
import type { NotificationKind } from "@/types";
import { Bell, BellRing, CheckCheck, CheckCircle2, MessageSquare, Package } from "lucide-react";
import { cn } from "@/lib/utils";

const ICONS: Record<NotificationKind, typeof Bell> = {
  "errand-accepted": CheckCircle2,
  "errand-status": MessageSquare,
  "item-found": Package,
  "item-claimed": CheckCheck,
  system: BellRing,
};

export default function Notifications() {
  const navigate = useNavigate();
  const notifications = useStore((s) => s.notifications);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display font-extrabold text-2xl">Notificaciones</h1>
          <p className="text-sm text-muted-foreground">Mantente al tanto de la actividad del campus.</p>
        </div>
        {notifications.some((n) => !n.read) && (
          <Button size="sm" variant="outline" onClick={() => store.markAllRead()}>
            <CheckCheck className="h-4 w-4 mr-1" /> Leer todas
          </Button>
        )}
      </div>

      <div className="space-y-2">
        {notifications.length === 0 ? (
          <Card className="p-8 text-center text-sm text-muted-foreground border-dashed">
            <Bell className="h-6 w-6 mx-auto mb-2 opacity-50" />
            Sin notificaciones por ahora.
          </Card>
        ) : (
          notifications.map((n) => {
            const Icon = ICONS[n.kind];
            return (
              <button
                key={n.id}
                onClick={() => {
                  store.markNotificationRead(n.id);
                  if (n.link) navigate(n.link);
                }}
                className={cn(
                  "w-full text-left bg-card rounded-2xl border border-border/60 p-4 hover:shadow-md transition flex gap-3",
                  !n.read && "bg-primary/5 border-primary/20"
                )}
              >
                <div className={cn("h-10 w-10 rounded-xl grid place-items-center shrink-0", !n.read ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-sm">{n.title}</p>
                    <span className="text-[11px] text-muted-foreground shrink-0">{relativeTime(n.createdAt)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{n.body}</p>
                </div>
                {!n.read && <span className="h-2 w-2 rounded-full bg-primary mt-2 shrink-0" />}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
