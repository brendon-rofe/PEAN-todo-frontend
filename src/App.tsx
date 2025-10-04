import { useEffect, useState } from "react";
import Header from "./components/Header";
import AddTask from "./components/AddTask";
import TodoList from "./components/TodoList";
import EmptyState from "./components/EmptyState";
import type { Todo } from "./types/Todo";
import { fetchTodos, createTodo, deleteTodo, updateTodoStatus } from "./api/todos";

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

   useEffect(() => {
    (async () => {
      try {
        const data = await fetchTodos();
        console.log(data);
        setTodos(data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  async function handleAdd(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    const created: Todo = await createTodo(trimmed);
    setTodos(prev => [...prev, created]);
  }

  const handleTodoStatusChange = async (id: number) => {
    const prev = todos;
    setTodos(list => list.map(t => (t.id === id ? { ...t, done: !t.done } : t)));

    try {
      const updated: Todo | void = await updateTodoStatus(id);
      setTodos(list => list.map(t => (t.id === id ? (updated as unknown as Todo) : t)));
    } catch (err) {
      console.error(err);
      setTodos(prev);
    }
  };

  const handleEditLocal = (id: number, nextText: string) => {
    setTodos((list) =>
      list.map((t) => (t.id === id ? { ...t, description: nextText } : t))
    );
  };

  async function handleDelete(id: number) {
    await deleteTodo(id);
    setTodos(todos.filter(t => t.id !== id));
  };

  const selectAll = () => {
    setTodos(todos.map(t => ({ ...t, done: true })));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(t => !t.done));
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col items-center px-4 py-10">
      <div className="w-full max-w-[960px]">
        <Header />
        <AddTask onAdd={handleAdd} />
        {todos.length > 0 ? (
          <>
            <TodoList
              todos={todos}
              onToggle={handleTodoStatusChange}
              onDelete={handleDelete}
              onEdit={handleEditLocal}
            />
            <div className="flex justify-end gap-3 px-4 py-3">
              <button
                onClick={selectAll}
                className="h-12 px-5 border border-gray-600 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg text-base font-bold cursor-pointer"
                aria-label="Select all todos"
              >
                Select All
              </button>
              <button
                onClick={clearCompleted}
                className="h-12 px-5 border border-gray-600 text-gray-400 hover:bg-gray-800 hover:text-white rounded-lg text-base font-bold"
              >
                Clear Completed
              </button>
            </div>
          </>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}
