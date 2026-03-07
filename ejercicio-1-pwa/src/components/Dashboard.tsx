import { useState } from 'react';
import FormularioPaciente from './FormularioPaciente';

const pacientes = [
    {
        id: "1",
        nombre: "Pepito",
        apellido: "Pérez",
        dni: "12345678",
        telefono: "300123456789",
        fechaAlta: "2026-03-01"
    },
    {
        id: "2",
        nombre: "Pepita",
        apellido: "Pérez",
        dni: "87654321",
        telefono: "300987654321",
        fechaAlta: "2026-03-02"
    },
]

function Dashboard({
  usuario,
  onLogout,
}: {
  usuario: any;
  onLogout: () => void;
}) {

    const [pacientes, setPacientes] = useState(() => {
        const pacientesGuardados = localStorage.getItem("medicare_pacientes");
        return pacientesGuardados ? JSON.parse(pacientesGuardados) : [];
    });

    const [pacienteEditando, setPacienteEditando] = useState(null);

    const guardarPaciente = (paciente: any) => {
        let nuevosPacientes;
        if (pacienteEditando) {
            nuevosPacientes = pacientes.map((p: any) => p.id === paciente.id ? paciente : p);
        } else {
            nuevosPacientes = [...pacientes, paciente];
        }
        setPacientes(nuevosPacientes);
        localStorage.setItem("medicare_pacientes", JSON.stringify(nuevosPacientes));
        setPacienteEditando(null);
    };

  return (
    <div>
      <header>
        <h1>MediCare+ Admin</h1>
        <span>
          {usuario.nombre} ({usuario.rol})
        </span>
        <button onClick={onLogout}>Cerrar sesión</button>
      </header>

      <main>
        {usuario.rol !== "recepcionista" && (
          <section>
            <h2>Estadísticas</h2>
            <p>Total de pacientes: {pacientes.length}</p>
          </section>
        )}

        {usuario.rol !== "medico" && (
            <FormularioPaciente pacienteAEditar={pacienteEditando} onGuardar={guardarPaciente} />
        )}

        <section>
          <h2>Pacientes</h2>
          <p>Buscador y tabla va aqui</p>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
