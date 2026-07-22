import "./styles.css";
import Store from "./store.js";
import TodoList from "./todo-list.js";
import Todo from "./todo.js";

const todoList = new TodoList("abc");

console.log(todoList);

Store.setItem(todoList);

console.log(Store.getItem(todoList.keyName));

const todo = new Todo(
  "cde",
  todoList.id,
  "this is a test",
  null,
  0,
  "this is a test",
);

console.log(todo);

Store.setItem(todo);

// console.log(Store.getItem(todo.keyName));
Store.setProp("priority", 1, todo.keyName);

// console.log(Store.getItem(todo.keyName));

console.log(Store.getPropValue("keyName", todo.keyName));

const arr = Store.everyItemsWith("listId", todoList.id);

console.log(arr);
