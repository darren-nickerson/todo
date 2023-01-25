import { useContext, useEffect, useRef, useState } from "react";
import { enterCode, escCode } from "../helpers/keycodes";
import { TodosContext } from "../contexts/todos";

const Todo = ({ todo, isEditing, setEditingId }) => {
  // useContext hook is used to access the global state managed by the TodosContext
  const [, dispatch] = useContext(TodosContext);
  // useState hook is used to keep track of the current value of the input field
  const [editText, setEditText] = useState(todo.text);
  // creating a variable for the class name for the li element
  const editingClass = isEditing ? "editing" : "";
  const completedClass = todo.isCompleted ? "completed" : "";

  // useRef hook is used to access the DOM element of the input field
  const editInputEl = useRef(null);

  // toggleTodo function is used to dispatch an action to toggle the isCompleted value of the todo
  const toggleTodo = () => {
    dispatch({ type: "toggleTodo", payload: todo.id });
  };

  // removeTodo function is used to dispatch an action to remove the todo
  const removeTodo = () => {
    dispatch({ type: "removeTodo", payload: todo.id });
  };

  // setTodoInEditingMode function is used to set the state of the component to editing mode
  const setTodoInEditingMode = () => {
    setEditingId(todo.id);
  };

  // changeEditInput function is used to update the state of the component with the current value of the input field
  const changeEditInput = (value) => {
    setEditText(value.target.value);
  };

  // keyDownEditInput function is used to handle the keydown event on the input field
  const keyDownEditInput = (event) => {
    if (event.keyCode === enterCode) {
      // Dispatch an action to change the text of the todo
      dispatch({
        type: "changeTodo",
        payload: { id: todo.id, text: event.target.value },
      });
      // exit editing mode
      setEditingId(null);
    }

    if (event.keyCode === escCode) {
      // reset the input field value to original value
      setEditText(todo.text);
      // exit editing mode
      setEditingId(null);
    }
  };

  // useEffect hook is used to focus the input field when the component is in editing mode
  useEffect(() => {
    if (isEditing) {
      editInputEl.current.focus();
    }
  }, [isEditing]);

  return (
    <li className={`${editingClass} ${completedClass}`}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          value={todo.isCompleted}
          onChange={toggleTodo}
        />
        <label onDoubleClick={setTodoInEditingMode}>{todo.text}</label>
        <button className="destroy" onClick={removeTodo}></button>
      </div>
      {isEditing && (
        <input
          ref={editInputEl}
          className="edit"
          value={editText}
          onChange={changeEditInput}
          onKeyDown={keyDownEditInput}
        />
      )}
    </li>
  );
};
export default Todo;
