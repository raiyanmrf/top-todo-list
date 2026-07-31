import DOM from "./dom-stuff.js";
import Store from "./store.js";
import DateTime from "./date-time.js";
import {
  ACTIVE_LIST,
  CONTENT_ID,
  LIST_PREFIX,
  MODAL_CLASS,
  MODAL_CONTENT_CLASS,
  SIDEBAR_ID,
} from "./asset/utility.js";
import TodoList from "./todo-list.js";

export default class Template {
  constructor() {
    this.main = DOM.select(CONTENT_ID);
    this.aside = DOM.select(SIDEBAR_ID);
    this.todoLists = Store.getByKey(LIST_PREFIX);
  }

  loadTodoLists() {
    this.todoLists.forEach((todoList) =>
      this.main.append(Template.todoList(todoList)),
    );
  }

  loadAside() {
    let links = [];
    this.todoLists.forEach((item) => {
      let btn = DOM.create("button", {}, [item.title]);
      links.push(DOM.create("div", { class: "link", id: item.id }, [btn]));
    });

    let addBtn = DOM.create("button", { class: "add-btn", id: "add-list" }, [
      "Add New List",
    ]);

    this.aside.append(...links, addBtn);

    Template.clickEvent(this.aside);
  }
  static radioBtns(items, defaultValue, name) {
    let radios = items.map((item) => {
      const label = DOM.create("label", { class: "radio-label", for: item }, [
        item,
      ]);
      const input = DOM.create("input", {
        type: "radio",
        name,
        value: item,
        id: item,
      });

      item === defaultValue ? (input.checked = true) : (input.checked = false);

      return DOM.create("span", { class: "radio-btn" }, [label, input]);
    });

    return DOM.create("span", { class: "radio-btns" }, [...radios]);
  }
  static textBox(tag, attrs) {
    const { type, name, placeholder, label, value, objName, children } = attrs;

    let labelElem = label
      ? DOM.create("label", { class: "input-label", for: objName + name }, [
          label,
        ])
      : "";

    let input = DOM.create(
      tag,
      {
        type,
        name,
        placeholder,
        id: objName + name,
        value,
      },
      children,
    );

    return DOM.create("div", { class: "textBox" }, [labelElem, input]);
  }
  static selectBox(children) {
    return DOM.create("div", { class: "selectBox" }, children);
  }
  static todoListForm(todoList = new TodoList()) {
    let form = DOM.create(
      "form",
      { id: "todo-list-form", class: "form" },
      [
        DOM.create("input", { type: "hidden", name: "id", value: todoList.id }),
        Template.formInputs([
          Template.textBox("input", {
            type: "text",
            name: "title",
            placeholder: "e.g. Office Equipments",
            label: "Title",
            value: todoList.title,
            objName: todoList.id,
            children: [],
          }),
          Template.textBox("textarea", {
            type: "",
            name: "desc",
            placeholder: "e.g. Get the coffee machine fixed.",
            label: "Desc..",
            value: todoList.desc,
            objName: todoList.id,
            children: [todoList.desc],
          }),
        ]),

        Template.formBtns(),
      ],
      "submit",
    );

    return form;
  }
  static todoForm(todo) {
    let form = DOM.create(
      "form",
      { id: "todo-form", class: "form" },
      [
        DOM.create("input", { type: "hidden", name: "id", value: todo.id }),
        DOM.create("input", {
          type: "hidden",
          name: "status",
          value: todo.status,
        }),
        DOM.create("input", {
          type: "hidden",
          name: "listId",
          value: todo.listId,
        }),

        Template.formInputs([
          Template.textBox("input", {
            type: "text",
            name: "title",
            placeholder: "e.g. Office Equipments",
            label: "Title",
            value: todo.title,
            objName: todo.id,
          }),
          Template.textBox("textarea", {
            type: "",
            name: "desc",
            placeholder: "e.g. Get the coffe machine fixed.",
            label: "Desc..",
            value: todo.desc,
            objName: todo.id,
          }),

          Template.selectBox([
            DOM.create(
              "input",
              { type: "date", value: todo.date, name: "date" },
              [todo.date],
            ),
            Template.radioBtns(
              ["low", "medium", "high"],
              todo.priority,
              "priority",
            ),
          ]),

          Template.textBox("textarea", {
            type: "",
            name: "note",
            placeholder: "e.g. Get the coffe machine fixed.",
            label: "Note..",
            value: todo.note,
            objName: todo.id,
          }),
        ]),
        Template.formBtns(),
      ],
      "submit",
    );
    return form;
  }

  static todoList(obj) {
    const { id, title } = obj;

    const heading = DOM.create("h3", { class: "list-title" }, [title]);
    const todos = Store.itemsByProp("listId", id).map((item) =>
      Template.todoTemplate(item),
    );

    const addBtn = DOM.create(
      "button",
      { class: "add-todo", id: id },
      ["+"],
      "click",
    );

    const ul = DOM.create("ul", { class: "todos" }, todos);

    const section = DOM.create(
      "section",
      {
        id,
        "data-key": id,
        class: "todo-list",
      },
      [heading, ul],
    );

    // console.log(todos);

    return section;
  }

  static todoTemplate(todoObj) {
    // console.log(todoObj);
    let { id, title, priority, desc, date, note, label } = todoObj;

    const checkbox = DOM.create("input", {
      class: "checkbox",
      type: "checkbox",
      value: "1",
      id: "mark",
    });
    const actions = DOM.create(
      "span",
      { class: "actions" },
      Template.actionBtns(),
      "click",
    );

    title = DOM.create("span", { class: "title" }, [title]);
    priority = DOM.create("span", { class: "priority" }, [priority]);
    desc = DOM.create("span", { class: "desc" }, [desc]);
    date = DOM.create(
      "span",
      { class: `date ${DateTime.isLate(date) ? "txt-red" : ""}` },
      [DateTime.format(date)],
    );
    label = DOM.create("span", { class: "label" }, [label]);

    const li = DOM.create(
      "li",
      {
        id,
        "data-key": id,
        class: "todo",
      },
      [checkbox, title, actions, date, priority, label],
    );

    // console.log(li);

    return li;
  }

  static actionBtns() {
    return [
      DOM.create("button", { id: "edit", class: "action-btn" }, ["E"]),
      DOM.create("button", { id: "delete", class: "action-btn" }, ["D"]),
    ];
  }
  static formBtns() {
    return DOM.create("div", { class: "form-submit" }, [
      DOM.create("button", { typr: "submit-btn" }, ["Save"]),
    ]);
  }

  static formInputs(children) {
    return DOM.create("div", { class: "form-inputs" }, children);
  }

  static submitEvent(elem) {
    DOM.createEvent("submit", elem, function (e) {
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
  static clickEvent(elem) {
    console.log(elem);
    DOM.createEvent("click", elem, function (e) {
      e.stopPropagation();
      const target = e.target;
      const tagName = target.tagName;
      // console.log(target.tagName);

      let action = target.id;

      switch (action) {
        case "mark":
          console.log("action name: mark");
          break;
        case "edit":
          console.log("action name: edit");
          break;
        case "delete":
          console.log("action name: delete");
          break;
        case "add-list":
          Template.addFormToContent(Template.todoListForm());
          break;
        case "close-btn":
          elem.remove();
        default:
          console.log("action name: navigate");
          break;
      }
    });
  }

  static addFormToContent(form) {
    const modal = Template.createModal(form);

    if (!DOM.replaceWith(modal, MODAL_CLASS)) {
      const content = DOM.select(CONTENT_ID);
      content.append(modal);
    }
  }

  static createModal(elem) {
    const closeBtn = DOM.create("span", { id: "close-btn" }, ["\u00D7"]);
    const modalContent = DOM.create("div", { class: "modal-content" }, [
      closeBtn,
      elem,
    ]);

    return DOM.create(
      "div",
      { class: "modal" },
      [closeBtn, modalContent],
      "click",
    );
  }
}
