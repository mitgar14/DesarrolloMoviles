import { useNavigate, useParams } from "react-router-dom";
import { store, useCurrentUser, useStore } from "@/store/store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CAMPUS_LOCATIONS } from "@/data/campus";
import { errandStatusMeta, errandTypeMeta, formatCOP, relativeTime } from "@/lib/meta";
import { ArrowLeft, ArrowRight, CheckCircle2, Coins, MapPin, MessageCircle, Phone, PlayCircle, XCircle } from "lucide-react";
import { toast } from "sonner";
import type { ErrandStatus } from "@/types";

export default function ErrandDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const errand = useStore((s) => s.errands.find((e) => e.id === id));
  const creator = useStore((s) => s.users.find((u) => u.id === errand?.creatorId));
  const acceptor = useStore((s) => s.users.find((u) => u.id === errand?.acceptedById));
  const me = useCurrentUser()!;

  if (!errand) return (
    <div className="text-center py-12">
      <p className="text-muted-foreground">Diligencia no encontrada.</p>
      <Button variant="link" onClick={() => navigate("/errands")}>Volver</Button>
    </div>
  );

  const t = errandTypeMeta[errand.type];
  const st = errandStatusMeta[errand.status];
  const origin = CAMPUS_LOCATIONS.find((l) => l.id === errand.originId);
  const dest = CAMPUS_LOCATIONS.find((l) => l.id === errand.destinationId);

  const isMine = errand.creatorId === me.id;
  const isAcceptor = errand.acceptedById === me.id;

  const changeStatus = (next: ErrandStatus) => {
    store.setErrandStatus(errand.id, next);
    toast.success(`Estado: ${errandStatusMeta[next].label}`);
  };

  return (
    <div className="space-y-4">
      <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Volver
      </button>

      <Card className="p-5 bg-gradient-card border-border/60">
        <div className="flex items-start gap-3 mb-3">
          <div className="h-12 w-12 rounded-2xl bg-primary/10 grid place-items-center text-primary border border-primary/20">
            <t.icon className="h-6 w-6" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <Badge variant="outline" className={st.className}>{st.label}</Badge>
              <span className="text-xs text-muted-foreground">{relativeTime(errand.createdAt)}</span>
            </div>
            <h1 className="font-display font-extrabold text-xl leading-tight">{errand.title}</h1>
            <p className="text-xs text-muted-foreground mt-0.5">{t.label}</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{errand.description}</p>

        {errand.reward ? (
          <div className="mt-4 flex items-center gap-2 px-3 py-2 rounded-xl bg-primary/5 border border-primary/15">
            <Coins className="h-4 w-4 text-primary" />
            <p className="text-sm"><span className="font-semibold text-primary">{formatCOP(errand.reward)}</span> de recompensa</p>
          </div>
        ) : null}
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
            <div className="min-w-0">
              <p className="text-[10px] uppercase font-semibold text-muted-foreground">Origen</p>
              <p className="text-sm font-semibold truncate">{origin?.name}</p>
            </div>
          </div>
          <ArrowRight className="h-4 w-4 text-primary shrink-0" />
          <div className="flex items-center gap-2 min-w-0">
            <MapPin className="h-4 w-4 text-primary shrink-0" />
            <div className="min-w-0">
              <p className="text-[10px] uppercase font-semibold text-muted-foreground">Destino</p>
              <p className="text-sm font-semibold truncate">{dest?.name}</p>
            </div>
          </div>
        </div>
      </Card>

      {creator && (
        <Card className="p-4">
          <p className="text-[10px] uppercase font-semibold text-muted-foreground mb-2">Solicitante</p>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-primary text-primary-foreground font-semibold grid place-items-center">
              {creator.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm">{creator.name}</p>
              <p className="text-xs text-muted-foreground truncate">{creator.career}</p>
            </div>
            {!isMine && (
              <div className="flex gap-1">
                <Button size="icon" variant="outline" onClick={() => toast.info("Mensaje enviado")}>
                  <MessageCircle className="h-4 w-4" />
                </Button>
                {creator.phone && (
                  <Button size="icon" variant="outline" onClick={() => window.open(`tel:${creator.phone!.replace(/\s/g, "")}`)}>
                    <Phone className="h-4 w-4" />
                  </Button>
                )}
              </div>
            )}
          </div>
        </Card>
      )}

      {acceptor && (
        <Card className="p-4">
          <p className="text-[10px] uppercase font-semibold text-muted-foreground mb-2">Aceptada por</p>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-success/15 text-success font-semibold grid place-items-center">
              {acceptor.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm">{acceptor.name}</p>
              <p className="text-xs text-muted-foreground truncate">{acceptor.career}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Actions */}
      <div className="space-y-2">
        {errand.status === "abierta" && !isMine && (
          <Button className="w-full h-12 bg-gradient-primary shadow-glow font-semibold" onClick={() => { store.acceptErrand(errand.id); toast.success("Aceptaste la diligencia"); }}>
            <CheckCircle2 className="h-4 w-4 mr-1.5" /> Aceptar diligencia
          </Button>
        )}
        {errand.status === "aceptada" && (isAcceptor || isMine) && (
          <Button className="w-full h-12 font-semibold" variant="default" onClick={() => changeStatus("en-progreso")}>
            <PlayCircle className="h-4 w-4 mr-1.5" /> Marcar en progreso
          </Button>
        )}
        {errand.status === "en-progreso" && (isAcceptor || isMine) && (
          <Button className="w-full h-12 bg-success hover:bg-success/90 text-success-foreground font-semibold" onClick={() => changeStatus("completada")}>
            <CheckCircle2 className="h-4 w-4 mr-1.5" /> Marcar completada
          </Button>
        )}
        {(errand.status === "abierta" || errand.status === "aceptada" || errand.status === "en-progreso") && isMine && (
          <Button variant="outline" className="w-full h-11" onClick={() => changeStatus("cancelada")}>
            <XCircle className="h-4 w-4 mr-1.5" /> Cancelar diligencia
          </Button>
        )}
      </div>
    </div>
  );
}
