import type { Todo } from "../types/Todo";

const API_URL = "http://localhost:3000"; // adjust to your backend URL

export async function fetchTodos(): Promise<Todo[]> {
  const res = await fetch(`${API_URL}/all`);
  if (!res.ok) {
    throw new Error("Failed to fetch todos");
  }
  return res.json();
}
