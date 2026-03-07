function Dashboard({
  usuario,
  onLogout,
}: {
  usuario: any;
  onLogout: () => void;
}) {
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
            <p>Sección de estadísticas va aqui</p>
          </section>
        )}

        {usuario.rol !== "medico" && (
          <section>
            <h2>Alta de pacientes</h2>
            <p>Formulario de alta va aqui</p>
          </section>
        )}

        <section>
          <h2>Pacientes</h2>
          <p>Buscador + tabla va aqui</p>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
