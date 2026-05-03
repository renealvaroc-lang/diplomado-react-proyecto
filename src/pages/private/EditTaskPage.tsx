import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getTasks,
  updateTask,
  toggleTaskStatus,
} from "../../services/task.service";

export const EditTaskPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadTask();
  }, []);

  const loadTask = async () => {
    try {
      const tasks = await getTasks();
      const task = tasks.find((t) => t.id === Number(id));

      if (task) {
        setName(task.name);
        setDone(task.done);
      }
    } catch (error) {
      console.error("Error al cargar tarea:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await updateTask(Number(id), { name, done });

      const currentTasks = await getTasks();
      const updatedTask = currentTasks.find((t) => t.id === Number(id));

      if (updatedTask && updatedTask.done !== done) {
        await toggleTaskStatus(Number(id), done);
      }

      navigate("/tasks");
    } catch (error) {
      console.error("Error al actualizar tarea:", error);
      alert("Error al actualizar tarea");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow border-0 rounded-4">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold mb-0">✏️ Editar Tarea</h2>

            <button
              className="btn btn-outline-secondary rounded-pill"
              onClick={() => navigate("/tasks")}
            >
              ← Volver
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="form-label fw-semibold">Nombre</label>
              <input
                type="text"
                className="form-control form-control-lg rounded-3"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-check form-switch mb-4">
              <input
                type="checkbox"
                className="form-check-input"
                checked={done}
                onChange={(e) => setDone(e.target.checked)}
              />
              <label className="form-check-label fw-semibold">
                {done ? "Finalizada" : "Pendiente"}
              </label>
            </div>

            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-primary btn-lg rounded-pill"
                disabled={loading}
              >
                {loading ? "Guardando..." : "Guardar cambios"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};