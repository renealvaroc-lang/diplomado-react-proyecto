import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getTasks,
  deleteTask,
  toggleTaskStatus,
} from "../../services/task.service";
import type { Task } from "../../services/task.service";

export const TaskPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const navigate = useNavigate();

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error("Error al cargar tareas:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (task: Task) => {
    try {
      await toggleTaskStatus(task.id, !task.done);
      await loadTasks();
    } catch (error) {
      console.error("Error al cambiar estado:", error);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm("¿Seguro que deseas eliminar esta tarea?");
    if (!confirmDelete) return;

    try {
      await deleteTask(id);
      await loadTasks();
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      (filter === "done" && task.done) ||
      (filter === "pending" && !task.done);

    return matchesSearch && matchesFilter;
  });

  if (loading) return <p className="text-center mt-5">Cargando tareas...</p>;

  return (
    <div className="container mt-4">
      <div className="card shadow border-0 rounded-4">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold mb-0">📋 Gestión de Tareas</h2>

            <button
              className="btn btn-primary rounded-pill px-4"
              onClick={() => navigate("/tasks/create")}
            >
              + Nueva Tarea
            </button>
          </div>

          <div className="row mb-4">
            <div className="col-md-8 mb-2">
              <input
                type="text"
                className="form-control rounded-pill"
                placeholder="🔍 Buscar tarea..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="col-md-4 mb-2">
              <select
                className="form-select rounded-pill"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">Todas</option>
                <option value="pending">Pendientes</option>
                <option value="done">Finalizadas</option>
              </select>
            </div>
          </div>

          {filteredTasks.length === 0 ? (
            <div className="alert alert-info text-center">
              No se encontraron tareas.
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>Tarea</th>
                    <th>Estado</th>
                    <th className="text-center">Acciones</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredTasks.map((task, index) => (
                    <tr key={task.id}>
                      <td>{index + 1}</td>
                      <td>{task.name}</td>
                      <td>
                        <span
                          className={`badge rounded-pill ${
                            task.done ? "bg-success" : "bg-warning text-dark"
                          }`}
                        >
                          {task.done ? "Finalizada" : "Pendiente"}
                        </span>
                      </td>

                      <td className="text-center">
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => navigate(`/tasks/edit/${task.id}`)}
                        >
                          Editar
                        </button>

                        <button
                          className="btn btn-secondary btn-sm me-2"
                          onClick={() => handleToggleStatus(task)}
                        >
                          Estado
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(task.id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};