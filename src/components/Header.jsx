import { useState, useContext } from "react";
import { enterCode } from "../helpers/keycodes";
import { TodosContext } from "../contexts/todos";

const Header = () => {
  // State to keep track of the input text
  const [text, setText] = useState("");
  // Get the dispatch function from TodosContext
  const [, dispatch] = useContext(TodosContext);

  // Event handler to update the input text
  const changeText = (event) => {
    setText(event.target.value);
  };

  // Event handler to handle the keydown event on the input
  const keyDownText = (event) => {
    const isEnter = event.keyCode === enterCode;
    // Trim the input text
    const newText = text.trim();
    // Check if the input text is present
    const isTextPresent = newText.length > 0;
    if (isEnter && isTextPresent) {
      // Dispatch action to add the task
      dispatch({ type: "addTask", payload: newText });
      // Clear the input text
      setText("");
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <input
        className="new-todo"
        placeholder="Whats needs to be done"
        autoFocus
        value={text}
        onChange={changeText}
        onKeyDown={keyDownText}
      />
    </header>
  );
};

export default Header;
