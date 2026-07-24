import "./styles.css";
import Store from "./store.js";
import TodoList from "./todo-list.js";
import Todo from "./todo.js";
import Template from "./template.js";
export const PREFIX = "{{todozz}}";

const App = () => {
  let main = document.querySelector("#content");
  let defaultTodoList = new TodoList(
    "My Todo List",
    "Description of My Todo List",
  );
  let defaultTodo = new Todo(
    "My Todo",
    defaultTodoList.id,
    "Description of My Todo.",
    "2026-07-24",
    "low",
    "#work",
    "this is a test",
  );
  Store.setItems([defaultTodoList, defaultTodo]);
  main.appendChild(Template.todoList(defaultTodoList));

  main.appendChild(Template.todoListForm(defaultTodoList));
  main.appendChild(Template.todoForm(defaultTodo));

  // Template.submitEvent("#todo-list-form");
  Template.submitEvent("#todo-form");
};

App();
