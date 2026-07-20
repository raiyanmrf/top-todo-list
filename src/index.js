import "./styles.css";
import TodoList from "./todo-list.js";

const name = "todo1";
const newName = "Raiyan";
TodoList.new(name);

console.log(TodoList.get(name));
TodoList.rename(newName, name);
console.log(TodoList.get(newName));
