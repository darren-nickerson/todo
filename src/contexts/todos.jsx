import { createContext, useReducer } from "react";

const initialState = {
  todos: [],
  filter: "all",
};

// Reducer function to handle different actions
const reducer = (state, action) => {
  switch (action.type) {
    case "addTask": {
      // Add a new task to the todos array
      const newTask = {
        id: Math.random().toString(16), // Generate a random id
        text: action.payload,
        isCompleted: false,
      };
      return {
        ...state,
        todos: [...state.todos, newTask],
      };
    }

    case "toggleAll": {
      // Update all todos to have the same completion status
      const updatedTodos = state.todos.map((todo) => ({
        ...todo,
        isCompleted: action.payload,
      }));
      return {
        ...state,
        todos: updatedTodos,
      };
    }
    case "changeFilter": {
      // Update the filter value
      return {
        ...state,
        filter: action.payload,
      };
    }
    case "changeTodo": {
      // Update a specific todo's text
      const updatedTodos = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            text: action.payload.text,
          };
        }

        return todo;
      });

      return {
        ...state,
        todos: updatedTodos,
      };
    }

    case "toggleTodo": {
      // Toggle a specific todo's completion status
      const updatedTodos = state.todos.map((todo) => {
        if (todo.id === action.payload) {
          return {
            ...todo,
            isCompleted: !todo.isCompleted,
          };
        }

        return todo;
      });

      return {
        ...state,
        todos: updatedTodos,
      };
    }

    case "removeTodo": {
      // Remove a specific todo
      const updateTodos = state.todos.filter(
        (todo) => todo.id !== action.payload
      );
      return {
        ...state,
        todos: updateTodos,
      };
    }

    default:
      return state;
  }
};

// Create a context for the todos
export const TodosContext = createContext();

// Provider component to provide the state and reducer function
export const TodosProvider = ({ children }) => {
  const value = useReducer(reducer, initialState);
  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};
