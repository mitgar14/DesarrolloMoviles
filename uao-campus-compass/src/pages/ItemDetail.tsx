import { useNavigate, useParams } from "react-router-dom";
import { store, useStore } from "@/store/store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CAMPUS_LOCATIONS } from "@/data/campus";
import { itemCategoryMeta, itemStatusMeta, relativeTime } from "@/lib/meta";
import { ArrowLeft, CheckCircle2, MapPin, MessageCircle, Phone, User } from "lucide-react";
import { toast } from "sonner";

export default function ItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = useStore((s) => s.items.find((i) => i.id === id));
  const owner = useStore((s) => s.users.find((u) => u.id === item?.userId));

  if (!item) return (
    <div className="text-center py-12">
      <p className="text-muted-foreground">Objeto no encontrado.</p>
      <Button variant="link" onClick={() => navigate("/items")}>Volver a la lista</Button>
    </div>
  );

  const cat = itemCategoryMeta[item.category];
  const st = itemStatusMeta[item.status];
  const loc = CAMPUS_LOCATIONS.find((l) => l.id === item.locationId);

  return (
    <div className="space-y-4">
      <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Volver
      </button>

      <div className="aspect-[16/10] rounded-2xl bg-muted overflow-hidden">
        {item.photoUrl ? (
          <img src={item.photoUrl} alt={item.title} className="w-full h-full object-cover" />
        ) : (
          <div className="h-full w-full grid place-items-center text-muted-foreground">
            <cat.icon className="h-16 w-16" />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="outline" className={st.className}>{st.label}</Badge>
          <Badge variant="outline" className="bg-muted">{cat.label}</Badge>
          <span className="text-xs text-muted-foreground">{relativeTime(item.date)}</span>
        </div>
        <h1 className="font-display font-extrabold text-2xl">{item.title}</h1>
        <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
      </div>

      <Card className="p-4 space-y-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary/10 grid place-items-center text-primary">
            <MapPin className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Ubicación</p>
            <p className="font-semibold text-sm">{loc?.name}</p>
            <p className="text-xs text-muted-foreground">{loc?.description}</p>
          </div>
        </div>
      </Card>

      {owner && (
        <Card className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-full bg-gradient-primary text-primary-foreground font-semibold grid place-items-center">
              {owner.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm">{owner.name}</p>
              <p className="text-xs text-muted-foreground truncate">{owner.career}</p>
            </div>
            <User className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" onClick={() => toast.info("Mensaje enviado", { description: `Notificamos a ${owner.name.split(" ")[0]} sobre tu interés.` })}>
              <MessageCircle className="h-4 w-4 mr-1.5" /> Mensaje
            </Button>
            <Button
              variant="outline"
              disabled={!owner.phone}
              onClick={() => owner.phone && window.open(`tel:${owner.phone.replace(/\s/g, "")}`)}
            >
              <Phone className="h-4 w-4 mr-1.5" /> {owner.phone ?? "Sin tel."}
            </Button>
          </div>
        </Card>
      )}

      {item.status !== "reclamado" && (
        <Button
          className="w-full h-12 bg-success hover:bg-success/90 text-success-foreground font-semibold"
          onClick={() => {
            store.setItemStatus(item.id, "reclamado");
            toast.success("Objeto marcado como reclamado");
          }}
        >
          <CheckCircle2 className="h-4 w-4 mr-1.5" /> Marcar como reclamado
        </Button>
      )}
    </div>
  );
}
