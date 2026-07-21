import "./styles.css";
import TodoList from "./todo-list.js";
import Store from "./store.js";

const todoList = new TodoList("abc");

console.log(todoList);

Store.set(todoList);

console.log(Store.get(todoList.name));
