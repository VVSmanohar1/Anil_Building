import api from "./api";

export const getTasks = async (token: string) => {
  const response = await api.get("/tasks", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const createTask = async (token: string, task: any) => {
  const response = await api.post("/tasks", task, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateTask = async (token: string, id: string, data: any) => {
  const response = await api.put(`/tasks/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const deleteTask = async (token: string, id: string) => {
  const response = await api.delete(`/tasks/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
