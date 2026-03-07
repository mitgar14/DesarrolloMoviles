import { useState } from "react";

import FormularioPaciente from "./FormularioPaciente";
import TablaPacientes from "./TablaPacientes";
import PerfilUsuario from "./PerfilUsuario";

const pacientes_iniciales = [
  {
    id: "1",
    nombre: "Pepito",
    apellido: "Pérez",
    dni: "12345678",
    telefono: "300123456789",
    fechaAlta: "2026-03-01",
  },
  {
    id: "2",
    nombre: "Pepita",
    apellido: "Pérez",
    dni: "87654321",
    telefono: "300987654321",
    fechaAlta: "2026-03-02",
  },
];

function Dashboard({
  usuario,
  onLogout,
}: {
  usuario: any;
  onLogout: () => void;
}) {
  const [pacientes, setPacientes] = useState(() => {
    const pacientesGuardados = localStorage.getItem("medicare_pacientes");
    return pacientesGuardados
      ? JSON.parse(pacientesGuardados)
      : pacientes_iniciales;
  });

  const [pacienteEditando, setPacienteEditando] = useState(null);

  const [busqueda, setBusqueda] = useState("");

  const guardarPaciente = (paciente: any) => {
    let nuevosPacientes;
    if (pacienteEditando) {
      nuevosPacientes = pacientes.map((p: any) =>
        p.id === paciente.id ? paciente : p,
      );
    } else {
      nuevosPacientes = [...pacientes, paciente];
    }
    setPacientes(nuevosPacientes);
    localStorage.setItem("medicare_pacientes", JSON.stringify(nuevosPacientes));
    setPacienteEditando(null);
  };

  const eliminarPaciente = (id: string) => {
    const nuevosPacientes = pacientes.filter((p: any) => p.id !== id);
    setPacientes(nuevosPacientes);
    localStorage.setItem("medicare_pacientes", JSON.stringify(nuevosPacientes));
  };

  const pacientesFiltrados = pacientes.filter((p: any) => {
    const texto = busqueda.toLowerCase();
    return (
      p.nombre.toLowerCase().includes(texto) ||
      p.apellido.toLowerCase().includes(texto) ||
      p.dni.includes(texto)
    );
  });

  return (
    <div>
      <header>
        <h1>MediCare+ Admin</h1>
        <div className="header-usuario">
          <PerfilUsuario usuario={usuario} />
          <span>
            {usuario.nombre} ({usuario.rol})
          </span>
          <button onClick={onLogout}>Cerrar sesión</button>
        </div>
      </header>

      <main>
        {usuario.rol !== "recepcionista" && (
          <section>
            <h2>Estadísticas</h2>
            <p>Total de pacientes: {pacientes.length}</p>
          </section>
        )}

        {usuario.rol !== "medico" && (
          <FormularioPaciente
            pacienteAEditar={pacienteEditando}
            onGuardar={guardarPaciente}
          />
        )}

        <section>
          <h2>Pacientes</h2>

          <input
            placeholder="Buscar por nombre, apellido o DNI"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />

          {/* Justificación: La razón por la cual el estado de búsqueda se coloca acá en Dashboard es porque 
          este elemento debe ubicarse en una locación central para poder pasarle el filtro de una forma directa y sencilla.
          Después de todo, este es el componente padre que tiene en común tanto el buscador y la tabla de pacientes */}
          <TablaPacientes
            pacientes={pacientesFiltrados}
            onEditar={setPacienteEditando}
            onEliminar={eliminarPaciente}
          />
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
