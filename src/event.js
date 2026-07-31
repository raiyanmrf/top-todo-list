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
      Store.setItems([obj]);

      console.log(Store.getItem(obj.id));
    });
  }
  static click(elem) {
    console.log(elem);
    Events.create("click", elem, function (e) {
      e.stopPropagation();
      const target = e.target;
      const tagName = target.tagName;
      // console.log(target.tagName);

      let action = target.getAttribute("data-action");

      switch (action) {
        case "navigate":
          console.log("action name: navigate");
          break;
        case "mark":
          console.log("action name: mark");
          break;
        case "edit":
          console.log("action name: edit");
          break;
        case "delete":
          console.log("action name: delete");
          break;
        case "add-todo-list":
          Template.addFormToContent(Template.todoListForm());
          break;
        case "add-todo":
          Template.addFormToContent(Template.todoForm());
          break;
        case "close":
          elem.remove();
          break;

        default:
          console.log("action name: not specified");
          break;
      }
    });
  }
}
