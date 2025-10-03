import type { Todo } from "../types/Todo";

const API_URL = "http://localhost:3000"; // adjust to your backend URL

export async function fetchTodos(): Promise<Todo[]> {
  const res = await fetch(`${API_URL}/all`);
  if (!res.ok) {
    throw new Error("Failed to fetch todos");
  }
  return res.json();
}

export async function createTodo(description: string) {
  const res = await fetch(`${API_URL}/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ description }),
  });
  if (!res.ok) throw new Error(`Create failed: ${res.status}`);
  return res.json(); // returns created Todo
}

