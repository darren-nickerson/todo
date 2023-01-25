import { useContext } from "react";
import { TodosContext } from "../contexts/todos";

const Footer = () => {
  // Get the todos state and dispatch function from TodosContext
  const [todosState, dispatch] = useContext(TodosContext);
  // Count the number of active todos
  const activeCount = todosState.todos.filter(
    (todo) => !todo.isCompleted
  ).length;
  // Determine the class to be applied when there are no todos
  const noTodosClass = todosState.todos.length === 0 ? "hidden" : "";
  // Determine the text to be displayed for the active todos count
  const itemsLeftText = activeCount === 1 ? "item left" : "items left";
  // Helper function to determine the class for the selected filter
  const getSelectedClass = (filterName) => {
    return todosState.filter === filterName ? "selected" : "";
  };

  // Event handler to handle filter change
  const changeFilter = (event, filterName) => {
    event.preventDefault();
    // Dispatch the action to change the filter
    dispatch({ type: "changeFilter", payload: filterName });
  };

  return (
    <footer className={`footer ${noTodosClass}`}>
      <span className="todo-count">
        <strong>
          {activeCount} &nbsp; {itemsLeftText}
        </strong>
      </span>
      <ul className="filters">
        <li>
          <a
            href="/"
            className={getSelectedClass("all")}
            onClick={(event) => changeFilter(event, "all")}
          >
            All
          </a>
        </li>
        <li>
          <a
            href="/"
            className={getSelectedClass("active")}
            onClick={(event) => changeFilter(event, "active")}
          >
            Active
          </a>
        </li>
        <li>
          <a
            href="/"
            className={getSelectedClass("completed")}
            onClick={(event) => changeFilter(event, "completed")}
          >
            Completed
          </a>
        </li>
      </ul>
    </footer>
  );
};
export default Footer;
