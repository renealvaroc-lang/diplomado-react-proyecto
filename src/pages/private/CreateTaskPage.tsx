import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTask } from "../../services/task.service";

export const CreateTaskPage = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("El nombre de la tarea es obligatorio");
      return;
    }

    try {
      setLoading(true);

      await createTask({ name });

      alert("Tarea creada correctamente");
      setName("");

      navigate("/tasks");
    } catch (error) {
      console.error(error);
      alert("Error al crear tarea");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow border-0 rounded-4">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold mb-0">➕ Crear Nueva Tarea</h2>

            <button
              className="btn btn-outline-secondary rounded-pill"
              onClick={() => navigate("/tasks")}
            >
              ← Volver
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="form-label fw-semibold">
                Nombre de la tarea
              </label>
              <input
                type="text"
                className="form-control form-control-lg rounded-3"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej: Estudiar React"
              />
            </div>

            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-primary btn-lg rounded-pill"
                disabled={loading}
              >
                {loading ? "Guardando..." : "Crear tarea"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};