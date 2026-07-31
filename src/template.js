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
import Todo from "./todo.js";
import { hoursToMilliseconds } from "date-fns/fp";
import Events from "./event.js";

export default class Template {
  constructor() {
    this.main = DOM.select(CONTENT_ID);
    this.aside = DOM.select(SIDEBAR_ID);
    this.todoLists = Store.getByKey(LIST_PREFIX);
    this.activeListKey = Store.getOption(ACTIVE_LIST);
  }

  loadTodoList() {
    let activeList = Store.getItem(this.activeListKey);
    if (activeList) this.main.append(Template.todoList());
  }

  loadAside() {
    let links = [];
    this.todoLists.forEach((item) => {
      links.push(
        DOM.create(
          "button",
          { class: "link", id: item.id, "data-action": "navigate" },
          [item.title],
        ),
      );
    });

    let addBtn = DOM.create(
      "button",
      { class: "add-btn", "data-action": "add-todo-list" },
      ["Add New List"],
    );

    this.aside.append(...links, addBtn);

    Events.click(this.aside);
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
  static todoForm(todo = new Todo()) {
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

    console.log(todos);
    const addBtn = DOM.create(
      "button",
      { class: "add-btn", id: "add-todo", "data-action": "add-todo" },
      ["Add New Task"],
      "click",
    );

    const ul = DOM.create("ul", { class: "todos" }, todos);

    const section = DOM.create(
      "section",
      {
        id,
        class: "todo-list",
      },
      [heading, addBtn, ul],
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
      "data-action": "mark",
    });
    const actions = DOM.create(
      "span",
      { class: "actions" },
      Template.actionBtns(),
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
        class: "todo",
      },
      [checkbox, title, actions, date, priority, label],
      "click",
    );

    // console.log(li);

    return li;
  }

  static actionBtns() {
    return [
      DOM.create(
        "button",
        { id: "edit", class: "action-btn", "data-action": "edit" },
        ["E"],
      ),
      DOM.create(
        "button",
        { id: "delete", class: "action-btn", "data-action": "delete" },
        ["D"],
      ),
    ];
  }
  static formBtns() {
    return DOM.create("div", { class: "form-submit" }, [
      DOM.create("button", { type: "submit", "data-action": "save" }, ["Save"]),
    ]);
  }

  static formInputs(children) {
    return DOM.create("div", { class: "form-inputs" }, children);
  }

  static addFormToContent(form) {
    const modal = Template.createModal(form);

    if (!DOM.replaceWith(modal, MODAL_CLASS)) {
      const content = DOM.select(CONTENT_ID);
      content.append(modal);
    }
  }

  static createModal(elem) {
    const closeBtn = DOM.create(
      "span",
      { id: "close-btn", "data-action": "close" },
      ["\u00D7"],
    );
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
