import { ACTIVE_LIST } from "./asset/utility.js";
import DOM from "./dom-stuff.js";
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
      // console.log(Store.getItem(obj.id));
    });
  }
  static click(elem) {
    // console.log(elem);
    Events.create("click", elem, function (e) {
      e.stopPropagation();
      const target = e.target;

      // console.log(target.tagName);

      let action;

      if (target.tagName == "svg") {
        action = target.parentNode.getAttribute("data-action");
      } else if (target.tagName == "path") {
        action = target.parentNode.parentNode.getAttribute("data-action");
      } else action = target.getAttribute("data-action");
      switch (action) {
        case "navigate":
          Events.handleNavigation(target.id);
          break;
        case "add-todo-list":
          Template.addFormToContent(Template.todoListForm());
          break;
        case "edit-todo-list":
          Events.handleEditTodoList();
          break;
        case "delete-todo-list":
          Events.handleDeleteTodoList();
          break;
        case "add-todo":
          Template.addFormToContent(Template.todoForm());
          break;
        case "mark":
          Events.handleTaskComplete(target, elem);
          break;
        case "edit-todo":
          Events.handleEditTodo(elem.id);
          break;
        case "delete-todo":
          Events.handleDeleteTodo(elem.id);
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

  static handleEditTodoList() {
    const todoListID = DOM.select(".todo-list").id;
    Template.addFormToContent(Template.todoListForm(Store.getItem(todoListID)));
  }
  static handleEditTodo(id) {
    const todo = Store.getItem(id);
    console.log(todo);
    Template.addFormToContent(Template.todoForm(todo));
  }
  static handleTaskComplete(target, elem) {
    // console.log("clicked", target);
    // console.log("elem", elem);
    const todos = DOM.select(".todos");
    const statusValue = target.checked ? "complete" : "incomplete";
    const liClass = target.checked ? "todo complete" : "todo";
    Store.setProp("status", statusValue, elem.id);

    DOM.update(elem, { class: liClass });
    const clone = DOM.update(
      elem.cloneNode(true),
      { class: liClass },
      [],
      "click",
    );
    console.log("clone", clone);
    setTimeout(() => {
      elem.remove();
      if (statusValue === "complete") todos.append(clone);
      else todos.prepend(clone);
    }, 300);
  }
  static handleNavigation(id) {
    Store.setOption(ACTIVE_LIST, id);
    Template.loadTodoList();
    const modal = DOM.select(".modal");
    modal && modal.remove();
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
  static handleDeleteTodoList() {
    if (
      !confirm(
        "Deleting this tasklist will also delete all the tasks under it. Do we want to proceed?",
      )
    )
      return;
    const todoListID = DOM.select(".todo-list").id;
    Store.removeMatchingItemsWithProp("listId", todoListID);
    Store.removeItem(todoListID);
    Store.setOption(ACTIVE_LIST, "");
    location.reload();
  }
  static handleDeleteTodo(id) {
    Store.removeItem(id);
    Template.loadTodoList();
  }
}
