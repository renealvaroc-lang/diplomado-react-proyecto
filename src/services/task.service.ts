import { axiosClient } from "../lib/axiosCliente";

export type Task = {
  id: number;
  name: string;
  done: boolean;
};

export const getTasks = async (): Promise<Task[]> => {
  const response = await axiosClient.get("/tasks");

  console.log("RESPUESTA TASKS:", response.data);

  if (response.data && Array.isArray(response.data.data)) {
    return response.data.data;
  }

  if (Array.isArray(response.data)) {
    return response.data;
  }

  return [];
};

export const createTask = async (task: { name: string }) => {
  const response = await axiosClient.post("/tasks", task);
  return response.data;
};

export const updateTask = async (
  id: number,
  task: { name: string; done: boolean }
) => {
  const response = await axiosClient.put(`/tasks/${id}`, task);
  return response.data;
};

export const deleteTask = async (id: number) => {
  const response = await axiosClient.delete(`/tasks/${id}`);
  return response.data;
};

export const toggleTaskStatus = async (id: number, done: boolean) => {
  const response = await axiosClient.patch(`/tasks/${id}`, {
    done,
  });

  return response.data;
};