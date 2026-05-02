import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { store, useCurrentUser, useStore } from "@/store/store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Briefcase, GraduationCap, LogOut, Package, RotateCcw, Save } from "lucide-react";
import { toast } from "sonner";

export default function Profile() {
  const navigate = useNavigate();
  const user = useCurrentUser()!;
  const items = useStore((s) => s.items);
  const errands = useStore((s) => s.errands);

  const myItems = items.filter((i) => i.userId === user.id);
  const myErrands = errands.filter((e) => e.creatorId === user.id || e.acceptedById === user.id);

  const [name, setName] = useState(user.name);
  const [career, setCareer] = useState(user.career);
  const [phone, setPhone] = useState(user.phone ?? "");

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    store.updateProfile({ name, career, phone: phone || undefined });
    toast.success("Perfil actualizado");
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-display font-extrabold text-2xl">Perfil</h1>
        <p className="text-sm text-muted-foreground">Tu información de estudiante UAO.</p>
      </div>

      <Card className="p-5 bg-gradient-card">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-2xl bg-gradient-primary text-primary-foreground font-display font-extrabold text-xl grid place-items-center shadow-glow">
            {user.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
          </div>
          <div className="min-w-0">
            <h2 className="font-display font-bold text-lg truncate">{user.name}</h2>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
            <p className="text-xs text-primary font-semibold mt-1 flex items-center gap-1"><GraduationCap className="h-3.5 w-3.5" />{user.career}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-4">
          <Stat icon={Package} label="Tus objetos" value={myItems.length} />
          <Stat icon={Briefcase} label="Tus diligencias" value={myErrands.length} />
        </div>
      </Card>

      <form onSubmit={save} className="space-y-3">
        <Card className="p-4 space-y-3">
          <div className="space-y-1.5">
            <Label htmlFor="n">Nombre</Label>
            <Input id="n" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="c">Carrera</Label>
            <Input id="c" value={career} onChange={(e) => setCareer(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="p">Teléfono</Label>
            <Input id="p" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="opcional" />
          </div>
          <Button type="submit" className="w-full"><Save className="h-4 w-4 mr-1.5" /> Guardar cambios</Button>
        </Card>
      </form>



      <Card className="p-4 space-y-2">
        <Button variant="outline" className="w-full" onClick={() => { store.reset(); toast.info("Datos demo restaurados"); navigate("/auth"); }}>
          <RotateCcw className="h-4 w-4 mr-1.5" /> Restablecer datos demo
        </Button>
        <Button variant="destructive" className="w-full" onClick={() => { store.logout(); navigate("/auth"); }}>
          <LogOut className="h-4 w-4 mr-1.5" /> Cerrar sesión
        </Button>
      </Card>
    </div>
  );
}

function Stat({ icon: Icon, label, value }: { icon: typeof Package; label: string; value: number }) {
  return (
    <div className="p-3 rounded-xl bg-background/60 border border-border/60">
      <Icon className="h-4 w-4 text-primary mb-1" />
      <p className="font-display font-extrabold text-xl">{value}</p>
      <p className="text-[11px] text-muted-foreground">{label}</p>
    </div>
  );
}
