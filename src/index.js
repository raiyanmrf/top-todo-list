import "./styles.css";
import Store from "./store.js";
import DOM from "./dom-stuff.js";
import TodoList from "./todo-list.js";
import Todo from "./todo.js";
import DateTime from "./date-time.js";
export const PREFIX = "{{todozz}}";
const todoList = new TodoList("abc");

// console.log(todoList);

// const todo = new Todo(
//   "cde",
//   todoList.id,
//   "this is a test",
//   "2026-07-24T00:35",
//   0,
//   "#work",
//   "this is a test",
// );

// console.log(todo);

// Store.setItems([todoList, todo]);

// console.log(Store.getItem(todoList.keyName));
// console.log(Store.getItem(todo.keyName));
// Store.setProp("priority", 1, todo.keyName);

// console.log(Store.getItem(todo.keyName));

// console.log(Store.getPropValue("keyName", todo.keyName));

// const arr = Store.everyItemsWith("listId", todoList.id);

// console.log(arr);

// let main = DOM.select("#content");
// main.appendChild(DOM.todoListTemplate(todoList));

// main.appendChild(DOM.todoListForm(new TodoList()));

// DOM.submitEvent("#todo-list-form");

const App = () => {
  let main = DOM.select("#content");
  let defaultTodoList = new TodoList(
    "My Todo List",
    "Description of My Todo List",
  );
  let defaultTodo = new Todo(
    "My Todo",
    defaultTodoList.id,
    "Description of My Todo.",
    "2026-07-24T00:35",
    "High",
    "#work",
    "this is a test",
  );
  Store.setItems([defaultTodoList, defaultTodo]);
  main.appendChild(DOM.todoListTemplate(defaultTodoList));

  main.appendChild(DOM.todoListForm(defaultTodoList));

  DOM.submitEvent("#todo-list-form");
};

App();
