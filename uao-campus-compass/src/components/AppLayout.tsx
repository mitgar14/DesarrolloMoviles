import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Bell, Home, MapPin, Package, Briefcase } from "lucide-react";
import { useCurrentUser, useStore, store } from "@/store/store";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

const tabs = [
  { to: "/", label: "Inicio", icon: Home },
  { to: "/items", label: "Objetos", icon: Package },
  { to: "/errands", label: "Diligencias", icon: Briefcase },
  { to: "/map", label: "Mapa", icon: MapPin },
];

export default function AppLayout() {
  const user = useCurrentUser();
  const navigate = useNavigate();
  const location = useLocation();
  const unread = useStore((s) => s.notifications.filter((n) => !n.read).length);

  useEffect(() => {
    if (!user) navigate("/auth", { replace: true });
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Top bar */}
      <header className="sticky top-0 z-30 bg-background/85 backdrop-blur-xl border-b border-border/60">
        <div className="mx-auto max-w-2xl px-4 h-14 flex items-center justify-between">
          <button onClick={() => navigate("/")} className="flex items-center gap-2 group">
            <div className="h-8 w-8 rounded-xl bg-gradient-primary grid place-items-center shadow-glow">
              <span className="text-primary-foreground font-display font-extrabold text-sm">U</span>
            </div>
            <div className="leading-tight text-left">
              <p className="font-display font-bold text-sm">UAO Conecta</p>
              <p className="text-[10px] text-muted-foreground -mt-0.5">Campus · {user.name.split(" ")[0]}</p>
            </div>
          </button>

          <div className="flex items-center gap-1">
            <button
              onClick={() => navigate("/notifications")}
              aria-label="Notificaciones"
              className="relative h-10 w-10 grid place-items-center rounded-full hover:bg-muted transition"
            >
              <Bell className="h-5 w-5" />
              {unread > 0 && (
                <span className="absolute top-1.5 right-1.5 h-4 min-w-4 px-1 rounded-full bg-primary text-primary-foreground text-[10px] font-semibold grid place-items-center">
                  {unread}
                </span>
              )}
            </button>
            <button
              onClick={() => navigate("/profile")}
              aria-label="Perfil"
              className="h-9 w-9 rounded-full bg-gradient-primary text-primary-foreground font-semibold text-sm grid place-items-center"
            >
              {user.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-2xl px-4 py-5 safe-bottom animate-fade-in" key={location.pathname}>
        <Outlet />
      </main>

      {/* Bottom nav */}
      <nav
        aria-label="Navegación principal"
        className="fixed bottom-0 inset-x-0 z-40 border-t border-border/60 bg-background/90 backdrop-blur-xl"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="mx-auto max-w-2xl grid grid-cols-4 h-16">
          {tabs.map((t) => (
            <NavLink
              key={t.to}
              to={t.to}
              end={t.to === "/"}
              className={({ isActive }) =>
                cn(
                  "flex flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <div className={cn("h-9 w-12 grid place-items-center rounded-full transition", isActive && "bg-primary/10")}>
                    <t.icon className={cn("h-5 w-5", isActive && "scale-110")} />
                  </div>
                  <span>{t.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}

// small util for typed logout from anywhere
export const logout = () => store.logout();
