import { useState } from "react";
function TablaPacientes({
  pacientes,
  onEditar,
  onEliminar,
}: {
  pacientes: any[];
  onEditar: (paciente: any) => void;
  onEliminar: (id: string) => void;
}) {
  const [idAEliminar, setIdAEliminar] = useState<string | null>(null);

  return (
    <section>
      <table>
        <thead>
          <tr>
            <th>Nombre completo</th>
            <th>DNI</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map((p: any) => (
            <tr key={p.id}>
              <td>
                {p.nombre} {p.apellido}
              </td>
              <td>{p.dni}</td>
              <td>{p.telefono}</td>
              <td>
                <button onClick={() => onEditar(p)}>Editar</button>
                <button onClick={() => setIdAEliminar(p.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {idAEliminar && (
        <div className="modal-overlay">
          <div className="modal-caja">
            <p>¿Seguro que desea eliminar este paciente?</p>{" "}
            <button
              onClick={() => {
                onEliminar(idAEliminar);
                setIdAEliminar(null);
              }}
            >
              Confirmar
            </button>
            <button onClick={() => setIdAEliminar(null)}>Cancelar</button>
          </div>
        </div>
      )}
    </section>
  );
}

export default TablaPacientes;
