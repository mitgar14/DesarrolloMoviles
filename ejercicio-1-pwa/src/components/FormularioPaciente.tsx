import { useState, useEffect } from "react";

function FormularioPaciente({
  pacienteAEditar,
  onGuardar,
}: {
  pacienteAEditar: any;
  onGuardar: (paciente: any) => void;
}) {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState("");
  const [telefono, setTelefono] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (pacienteAEditar) {
      setNombre(pacienteAEditar.nombre);
      setApellido(pacienteAEditar.apellido);
      setDni(pacienteAEditar.dni);
      setTelefono(pacienteAEditar.telefono);
    } else {
      setNombre("");
      setApellido("");
      setDni("");
      setTelefono("");
    }
  }, [pacienteAEditar]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre.trim() || !apellido.trim() || !dni.trim()) {
      setError("Nombre, apellido y DNI son obligatorios");
      return;
    }

    if (!/^\d{7,8}$/.test(dni)) {
      setError("DNI debe tener entre 7 y 8 dígitos");
      return;
    }

    setError("");
    onGuardar({
      id: pacienteAEditar ? pacienteAEditar.id : Date.now().toString(),
      nombre: nombre.trim(),
      apellido: apellido.trim(),
      dni: dni.trim(),
      telefono: telefono.trim(),
      fechaAlta: pacienteAEditar
        ? pacienteAEditar.fechaAlta
        : new Date().toISOString(),
    });

    if (!pacienteAEditar) {
      setNombre("");
      setApellido("");
      setDni("");
      setTelefono("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{pacienteAEditar ? "Editar paciente" : "Alta de paciente"}</h2>
      <input
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <input
        placeholder="Apellido"
        value={apellido}
        onChange={(e) => setApellido(e.target.value)}
      />
      <input
        placeholder="DNI"
        value={dni}
        onChange={(e) => setDni(e.target.value)}
      />
      <input
        placeholder="Teléfono"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit">
        {pacienteAEditar ? "Guardar cambios" : "Agregar paciente"}
      </button>
    </form>
  );
}

export default FormularioPaciente;
