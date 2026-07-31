import { ACTIVE_LIST } from "./asset/utility.js";
import Store from "./store.js";
import Template from "./template.js";

export default class Events {
  static create(event, elem, callback) {
    elem.addEventListener(event, callback);
  }

  static submit(elem) {
    Events.create("submit", elem, function (e) {
      e.preventDefault();

      const formData = new FormData(elem);
      let obj = {};
      for (const [key, value] of formData) {
        obj[key] = value;
      }

      const action = elem.getAttribute("data-action");

      switch (action) {
        case "save-todo-list":
          Events.handleSaveTodoList(obj);
          break;

        case "save-todo":
          Events.handleSaveTodo(obj);
          break;
      }
      elem.parentNode.parentNode.remove(); // form > modal-content > modal
      console.log(Store.getItem(obj.id));
    });
  }
  static click(elem) {
    console.log(elem);
    Events.create("click", elem, function (e) {
      e.stopPropagation();
      const target = e.target;

      // console.log(target.tagName);

      let action = target.getAttribute("data-action");

      switch (action) {
        case "navigate":
          Store.setOption(ACTIVE_LIST, target.id);
          Template.loadTodoList();
          break;
        case "mark":
          console.log("action name: mark");
          break;
        case "edit":
          console.log("action name: edit");
          break;
        case "delete-todo":
          Events.handleDeleteTodo(elem.id);
          break;
        case "add-todo-list":
          Template.addFormToContent(Template.todoListForm());

          break;
        case "add-todo":
          Template.addFormToContent(Template.todoForm());

          break;
        case "close":
          elem.parentNode.remove();
          break;

        default:
          console.log("action name: not specified");
          break;
      }
    });
  }

  static handleSaveTodoList(obj) {
    Store.setItems([obj]);
    Store.setOption(ACTIVE_LIST, obj.id);
    Template.loadSidebar();
    Template.loadTodoList();
  }
  static handleSaveTodo(obj) {
    Store.setItems([obj]);
    Template.loadTodoList();
  }
  static handleDeleteTodo(id) {
    Store.removeItem(id);
    Template.loadTodoList();
  }
}
