import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LocationPicker } from "@/components/LocationPicker";
import { itemCategoryMeta } from "@/lib/meta";
import { store } from "@/store/store";
import type { CampusLocationId, ItemCategory, ItemStatus } from "@/types";
import { ArrowLeft, Camera, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

export default function NewItem() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<ItemStatus>("perdido");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<ItemCategory>("otros");
  const [locationId, setLocationId] = useState<CampusLocationId | undefined>();
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [photoUrl, setPhotoUrl] = useState<string | undefined>();

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => setPhotoUrl(reader.result as string);
    reader.readAsDataURL(file);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !locationId) {
      toast.error("Completa título, descripción y ubicación");
      return;
    }
    const item = store.createItem({
      title, description, category, status,
      locationId, date: new Date(date).toISOString(), photoUrl,
    });
    toast.success("Publicación creada");
    navigate(`/items/${item.id}`);
  };

  return (
    <div className="space-y-4">
      <button onClick={() => navigate(-1)} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Volver
      </button>
      <div>
        <h1 className="font-display font-extrabold text-2xl">Publicar objeto</h1>
        <p className="text-sm text-muted-foreground">Cuéntanos los detalles para que la comunidad UAO pueda ayudar.</p>
      </div>

      <Tabs value={status} onValueChange={(v) => setStatus(v as ItemStatus)}>
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="perdido">Perdí algo</TabsTrigger>
          <TabsTrigger value="encontrado">Encontré algo</TabsTrigger>
        </TabsList>
      </Tabs>

      <form onSubmit={submit} className="space-y-4">
        <Card className="p-4 space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="t">Título *</Label>
            <Input id="t" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ej. Audífonos negros JBL" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="d">Descripción *</Label>
            <Textarea id="d" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} placeholder="Describe el objeto y dónde lo viste por última vez" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Categoría</Label>
              <Select value={category} onValueChange={(v) => setCategory(v as ItemCategory)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.entries(itemCategoryMeta).map(([k, v]) => (
                    <SelectItem key={k} value={k}>{v.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="dt">Fecha</Label>
              <Input id="dt" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
          </div>
        </Card>

        <Card className="p-4 space-y-3">
          <Label>Foto</Label>
          {photoUrl ? (
            <div className="relative rounded-xl overflow-hidden">
              <img src={photoUrl} alt="preview" className="w-full h-48 object-cover" />
              <button type="button" onClick={() => setPhotoUrl(undefined)} className="absolute top-2 right-2 px-2 py-1 text-xs bg-background/90 rounded-md font-medium">Quitar</button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center gap-2 h-32 border-2 border-dashed border-border rounded-xl cursor-pointer hover:bg-muted/40 transition">
              <Camera className="h-6 w-6 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Toca para subir una foto</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              />
            </label>
          )}
        </Card>

        <Card className="p-4 space-y-3">
          <div>
            <Label>Ubicación aproximada *</Label>
            <p className="text-xs text-muted-foreground mt-0.5">Selecciona el lugar del campus.</p>
          </div>
          <LocationPicker value={locationId} onChange={setLocationId} />
        </Card>

        <Button type="submit" className="w-full h-12 bg-gradient-primary shadow-glow font-semibold">
          <ImageIcon className="h-4 w-4 mr-1.5" /> Publicar
        </Button>
      </form>
    </div>
  );
}
