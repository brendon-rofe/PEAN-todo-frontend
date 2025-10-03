import type { Todo } from "../types/Todo";

const API_URL = "http://localhost:3000";
export async function fetchTodos(): Promise<Todo[]> {
  const res = await fetch(`${API_URL}/all`);
  if (!res.ok) {
    throw new Error("Failed to fetch todos");
  }
  return res.json();
};

export async function createTodo(description: string) {
  const res = await fetch(`${API_URL}/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ description }),
  });
  if (!res.ok) throw new Error(`Create failed: ${res.status}`);
  return res.json();
};

export async function deleteTodo(id: number) {
  const res = await fetch(`${API_URL}/delete/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error(`Delete failed: ${res.status}`);
};

export async function updateTodoStatus(id: number,) {
  const res = await fetch(`${API_URL}/update-status/${id}`, {
    method: "PUT",
  });
  if (!res.ok) throw new Error(`Delete failed: ${res.status}`);
};
