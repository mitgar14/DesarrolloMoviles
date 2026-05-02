import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { store, useCurrentUser } from "@/store/store";
import { toast } from "sonner";
import { useEffect } from "react";
import { GraduationCap } from "lucide-react";

export default function Auth() {
  const navigate = useNavigate();
  const user = useCurrentUser();

  useEffect(() => { if (user) navigate("/", { replace: true }); }, [user, navigate]);

  const [loginEmail, setLoginEmail] = useState("demo@uao.edu.co");
  const [loginPwd, setLoginPwd] = useState("demo1234");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [career, setCareer] = useState("");
  const [phone, setPhone] = useState("");
  const [pwd, setPwd] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const u = store.login(loginEmail);
    if (!u) {
      toast.error("Usuario no encontrado", { description: "Prueba con demo@uao.edu.co o crea una cuenta." });
      return;
    }
    toast.success(`Hola ${u.name.split(" ")[0]}`);
    navigate("/", { replace: true });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !career || !pwd) {
      toast.error("Completa los campos requeridos");
      return;
    }
    store.register({ name, email, career, phone: phone || undefined });
    toast.success("Cuenta creada");
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex flex-col">
      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero" />
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 30% 30%, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="relative z-10 max-w-2xl mx-auto px-6 pt-12 text-primary-foreground">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-10 w-10 rounded-2xl bg-white/15 backdrop-blur grid place-items-center border border-white/30">
              <GraduationCap className="h-5 w-5" />
            </div>
            <span className="font-display font-bold text-lg">UAO Conecta</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl leading-tight">Tu campus,<br/>mejor conectado.</h1>
          <p className="text-sm text-primary-foreground/85 mt-2 max-w-sm">
            Publica objetos perdidos, encuentra los tuyos y resuelve diligencias entre estudiantes UAO.
          </p>
        </div>
      </div>

      <div className="flex-1 max-w-2xl mx-auto w-full px-4 -mt-10 relative z-20 pb-10">
        <Card className="p-5 shadow-lg border-border/60">
          <Tabs defaultValue="login">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="login">Iniciar sesión</TabsTrigger>
              <TabsTrigger value="register">Registrarse</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="mt-5">
              <form onSubmit={handleLogin} className="space-y-3">
                <div className="space-y-1.5">
                  <Label htmlFor="le">Correo institucional</Label>
                  <Input id="le" type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} placeholder="tucorreo@uao.edu.co" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="lp">Contraseña</Label>
                  <Input id="lp" type="password" value={loginPwd} onChange={(e) => setLoginPwd(e.target.value)} required />
                </div>
                <Button type="submit" className="w-full h-11 mt-2 bg-gradient-primary shadow-glow">Entrar</Button>
                <p className="text-[11px] text-muted-foreground text-center pt-1">
                  Demo: <code className="bg-muted px-1 rounded">demo@uao.edu.co</code>
                </p>
              </form>
            </TabsContent>

            <TabsContent value="register" className="mt-5">
              <form onSubmit={handleRegister} className="space-y-3">
                <div className="space-y-1.5">
                  <Label htmlFor="rn">Nombre completo *</Label>
                  <Input id="rn" value={name} onChange={(e) => setName(e.target.value)} placeholder="Tu nombre" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="re">Correo *</Label>
                  <Input id="re" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tucorreo@uao.edu.co" required />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="rc">Carrera *</Label>
                    <Input id="rc" value={career} onChange={(e) => setCareer(e.target.value)} placeholder="Ing. Software" required />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="rp">Teléfono</Label>
                    <Input id="rp" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="opcional" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="rpw">Contraseña *</Label>
                  <Input id="rpw" type="password" value={pwd} onChange={(e) => setPwd(e.target.value)} required minLength={6} />
                </div>
                <Button type="submit" className="w-full h-11 mt-2 bg-gradient-primary shadow-glow">Crear cuenta</Button>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
