import "./styles.css";
import TodoList from "./todo-list.js";
import Store from "./store.js";
import Todo from "./todo.js";

const todoList = new TodoList("abc");

console.log(todoList);

Store.setItem(todoList);

console.log(Store.getItem(todoList.name));

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

console.log(Store.getItem(todo.name));
