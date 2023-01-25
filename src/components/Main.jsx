import { useContext, useState } from "react";
import { TodosContext } from "../contexts/todos";
import Todo from "./Todo";

const Main = () => {
  // Get the todo state and dispatch function from TodosContext
  const [todoState, dispatch] = useContext(TodosContext);
  // Keep track of the currently edited todo item
  const [editingId, setEditingId] = useState(null);

  // Determine the class to be applied when there are no todos
  const noTodosClass = todoState.todos.length === 0 ? "hidden" : "";

  // Helper function to filter the todos based on the current filter
  const getVisibleTodos = () => {
    if (todoState.filter === "active") {
      // Only return todos that are not completed
      return todoState.todos.filter((todo) => !todo.isCompleted);
    }
    if (todoState.filter === "completed") {
      // Only return todos that are completed
      return todoState.todos.filter((todo) => todo.isCompleted);
    }

    // If filter is not active or completed, return all todos
    return todoState.todos;
  };

  // Check if all todos are selected
  const isAllTodosSelected = todoState.todos.every((todo) => todo.isCompleted);

  // Event handler to toggle the completion status of all todos
  const onToggleAllTodos = (event) => {
    dispatch({ type: "toggleAll", payload: event.target.checked });
  };

  // Get the filtered todos based on the current filter
  const visibleTodos = getVisibleTodos();
  // Render the component


  return (
    <section className={`main ${noTodosClass}`}>
      <input
        id="toggle-all"
        className="toggle-all"
        type="checkbox"
        checked={isAllTodosSelected}
        onChange={onToggleAllTodos}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <ul className="todo-list">
        {visibleTodos.map((todo) => (
          <Todo
            todo={todo}
            isEditing={editingId === todo.id}
            setEditingId={setEditingId}
            key={todo.id}
          />
        ))}
      </ul>
    </section>
  );
};

export default Main;
