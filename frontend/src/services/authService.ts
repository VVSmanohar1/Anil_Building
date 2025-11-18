import api from "./api";

export const loginUser = async (email: string, password: string) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};

export const signupUser = async (name: string, email: string, password: string) => {
  const response = await api.post("/auth/signup", { name, email, password });
  return response.data;
};
