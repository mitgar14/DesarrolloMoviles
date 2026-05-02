import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LocationPicker } from "@/components/LocationPicker";
import { errandTypeMeta } from "@/lib/meta";
import { store } from "@/store/store";
import type { CampusLocationId, ErrandType } from "@/types";
import { ArrowLeft, ArrowRight, Coins, Send } from "lucide-react";
import { toast } from "sonner";

export default function NewErrand() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<ErrandType>("recoger-documento");
  const [originId, setOriginId] = useState<CampusLocationId | undefined>();
  const [destinationId, setDestinationId] = useState<CampusLocationId | undefined>();
  const [reward, setReward] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !originId || !destinationId) {
      toast.error("Completa todos los campos requeridos");
      return;
    }
    const errand = store.createErrand({
      title, description, type, originId, destinationId,
      reward: reward ? parseInt(reward) : undefined,
    });
    toast.success("Diligencia publicada");
    navigate(`/errands/${errand.id}`);
  };

  return (
    <div className="space-y-4">
      <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Volver
      </button>
      <div>
        <h1 className="font-display font-extrabold text-2xl">Nueva diligencia</h1>
        <p className="text-sm text-muted-foreground">Pídele a la comunidad UAO una mano dentro del campus.</p>
      </div>

      <form onSubmit={submit} className="space-y-4">
        <Card className="p-4 space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="t">Título *</Label>
            <Input id="t" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ej. Recoger acta firmada" />
          </div>
          <div className="space-y-1.5">
            <Label>Tipo de diligencia</Label>
            <Select value={type} onValueChange={(v) => setType(v as ErrandType)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {Object.entries(errandTypeMeta).map(([k, v]) => (
                  <SelectItem key={k} value={k}>{v.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="d">Descripción *</Label>
            <Textarea id="d" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} placeholder="Detalles de lo que necesitas" />
          </div>
        </Card>

        <Card className="p-4 space-y-3">
          <Label>Punto de origen *</Label>
          <LocationPicker value={originId} onChange={setOriginId} />
        </Card>

        <Card className="p-4 space-y-3">
          <Label className="flex items-center gap-2"><ArrowRight className="h-4 w-4 text-primary" /> Punto de destino *</Label>
          <LocationPicker value={destinationId} onChange={setDestinationId} />
        </Card>

        <Card className="p-4 space-y-2">
          <Label htmlFor="r" className="flex items-center gap-2"><Coins className="h-4 w-4 text-primary" /> Recompensa (opcional)</Label>
          <Input id="r" type="number" min={0} step={500} value={reward} onChange={(e) => setReward(e.target.value)} placeholder="Ej. 5000" />
          <p className="text-[11px] text-muted-foreground">Monto sugerido en pesos colombianos.</p>
        </Card>

        <Button type="submit" className="w-full h-12 bg-gradient-primary shadow-glow font-semibold">
          <Send className="h-4 w-4 mr-1.5" /> Publicar diligencia
        </Button>
      </form>
    </div>
  );
}
