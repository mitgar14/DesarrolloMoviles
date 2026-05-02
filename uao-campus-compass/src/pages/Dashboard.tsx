import { useNavigate } from "react-router-dom";
import { useStore, useCurrentUser } from "@/store/store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ItemCard } from "@/components/ItemCard";
import { ErrandCard } from "@/components/ErrandCard";
import { Briefcase, Package, PlusCircle, Sparkles, TrendingUp } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const user = useCurrentUser()!;
  const items = useStore((s) => s.items);
  const errands = useStore((s) => s.errands);

  const lost = items.filter((i) => i.status === "perdido").slice(0, 3);
  const found = items.filter((i) => i.status === "encontrado").slice(0, 3);
  const openErrands = errands.filter((e) => e.status === "abierta").slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Hero greeting */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-hero text-primary-foreground p-5 shadow-glow">
        <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "radial-gradient(circle at 80% 20%, white 1.5px, transparent 1.5px)", backgroundSize: "22px 22px" }} />
        <div className="relative">
          <p className="text-xs uppercase tracking-wider text-primary-foreground/80 font-semibold flex items-center gap-1">
            <Sparkles className="h-3.5 w-3.5" /> Bienvenido
          </p>
          <h1 className="font-display font-extrabold text-2xl mt-1">Hola, {user.name.split(" ")[0]} 👋</h1>
          <p className="text-sm text-primary-foreground/85 mt-1 max-w-xs">¿Perdiste algo o necesitas ayuda con una diligencia en el campus?</p>

          <div className="grid grid-cols-2 gap-2 mt-4">
            <Button onClick={() => navigate("/items/new")} variant="secondary" className="h-11 font-semibold">
              <Package className="h-4 w-4 mr-1.5" /> Publicar objeto
            </Button>
            <Button onClick={() => navigate("/errands/new")} variant="secondary" className="h-11 font-semibold">
              <Briefcase className="h-4 w-4 mr-1.5" /> Crear diligencia
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-3 gap-2">
        <Stat label="Perdidos" value={items.filter((i) => i.status === "perdido").length} tone="destructive" />
        <Stat label="Encontrados" value={items.filter((i) => i.status === "encontrado").length} tone="success" />
        <Stat label="Diligencias" value={errands.filter((e) => e.status === "abierta").length} tone="primary" />
      </section>

      {/* Lost recent */}
      <Section title="Objetos perdidos recientes" onSeeAll={() => navigate("/items?status=perdido")}>
        {lost.length === 0 ? <Empty text="Nada por aquí" /> : lost.map((i) => <ItemCard key={i.id} item={i} />)}
      </Section>

      {/* Found recent */}
      <Section title="Objetos encontrados recientes" onSeeAll={() => navigate("/items?status=encontrado")}>
        {found.length === 0 ? <Empty text="Sin reportes recientes" /> : found.map((i) => <ItemCard key={i.id} item={i} />)}
      </Section>

      {/* Open errands */}
      <Section title="Diligencias abiertas" onSeeAll={() => navigate("/errands")}>
        {openErrands.length === 0 ? <Empty text="No hay diligencias abiertas" /> : openErrands.map((e) => <ErrandCard key={e.id} errand={e} />)}
      </Section>
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: number; tone: "destructive" | "success" | "primary" }) {
  const toneClass = {
    destructive: "text-destructive",
    success: "text-success",
    primary: "text-primary",
  }[tone];
  return (
    <Card className="p-3 text-center">
      <div className={`flex items-center justify-center gap-1 ${toneClass}`}>
        <TrendingUp className="h-3.5 w-3.5" />
        <p className="font-display font-extrabold text-xl">{value}</p>
      </div>
      <p className="text-[11px] text-muted-foreground font-medium">{label}</p>
    </Card>
  );
}

function Section({ title, onSeeAll, children }: { title: string; onSeeAll?: () => void; children: React.ReactNode }) {
  return (
    <section>
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-display font-bold text-base">{title}</h2>
        {onSeeAll && <button onClick={onSeeAll} className="text-xs font-medium text-primary hover:underline">Ver todos</button>}
      </div>
      <div className="space-y-2">{children}</div>
    </section>
  );
}

function Empty({ text }: { text: string }) {
  return (
    <Card className="p-6 text-center text-sm text-muted-foreground border-dashed">
      <PlusCircle className="h-6 w-6 mx-auto mb-2 opacity-50" />
      {text}
    </Card>
  );
}
