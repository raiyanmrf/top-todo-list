import "./styles.css";
import Store from "./store.js";
import TodoList from "./todo-list.js";
import Todo from "./todo.js";
import Template from "./template.js";
export const PREFIX = "{{todozz}}";

const App = () => {
  const template = new Template();
  template.loadTodoLists();
};

App();
