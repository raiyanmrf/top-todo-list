import DOM from "./dom-stuff.js";
import Store from "./store.js";
import DateTime from "./date-time.js";
import {
  ACTIVE_LIST,
  CONTENT_ID,
  NOT_FIRST_TIME,
  LIST_PREFIX,
  MODAL_CLASS,
  MODAL_CONTENT_CLASS,
  SIDEBAR_ID,
  pencilSVG,
  trashSVG,
  plusSVG,
  closeSVG,
  bookMarkSVG,
} from "./asset/utility.js";
import TodoList from "./todo-list.js";
import Todo from "./todo.js";
import { hoursToMilliseconds } from "date-fns/fp";
import Events from "./event.js";

export default class Template {
  constructor() {
    Template.defaultState();
    Template.loadSidebar();
    Template.loadTodoList();
  }

  static defaultState() {
    if (!Store.isExists(NOT_FIRST_TIME)) {
      const defaultTodoList = Store.setItem(new TodoList("My Tasks"));
      Store.setOption(ACTIVE_LIST, defaultTodoList.id);
      Store.setOption(NOT_FIRST_TIME, true);
    }
  }
  static loadTodoList() {
    let activeList = Store.getItem(Store.getOption(ACTIVE_LIST));
    if (activeList) {
      const content = DOM.select(CONTENT_ID);
      const todoListTemplate = Template.todoList(activeList);

      if (!DOM.replaceWith(todoListTemplate, ".todo-list"))
        content.append(todoListTemplate);
    }
  }

  static loadSidebar() {
    const body = DOM.select("body");
    const todoLists = Store.getByKey(LIST_PREFIX);
    let links = [];
    todoLists.forEach((item) => {
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
      ["New List", DOM.HTMLtoElem(plusSVG)],
    );

    const newSidebar = DOM.create(
      "aside",
      { id: "sidebar" },
      [...links, addBtn],
      "click",
    );
    if (!DOM.replaceWith(newSidebar, SIDEBAR_ID)) body.append(newSidebar);
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
  static textBox(tag, attrs = {}, children = []) {
    const { type, name, placeholder, label, objName } = attrs;

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
        required: attrs.required ? attrs.required : false,
        maxlength: tag === "textarea" ? 200 : 100,
      },
      children,
    );

    attrs.value && input.setAttribute("value", attrs.value);
    return DOM.create("div", { class: "textbox" }, [labelElem, input]);
  }
  static selectbox(children) {
    return DOM.create("div", { class: "selectbox" }, children);
  }
  static todoListForm(todoList = new TodoList()) {
    let form = DOM.create(
      "form",
      { id: "todo-list-form", class: "form", "data-action": "save-todo-list" },
      [
        DOM.create("input", { type: "hidden", name: "id", value: todoList.id }),
        Template.formInputs([
          Template.textBox("input", {
            type: "text",
            name: "title",
            placeholder: "Title of the Task List",

            value: todoList.title,
            objName: todoList.id,
            required: true,
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
      { id: "todo-form", class: "form", "data-action": "save-todo" },
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
          value: DOM.select(".todo-list").id,
        }),

        Template.formInputs([
          Template.textBox("input", {
            type: "text",
            name: "title",
            placeholder: "Title of the Task",
            value: todo.title,
            objName: todo.id,
            required: true,
          }),
          Template.textBox(
            "textarea",
            {
              type: "",
              name: "desc",
              placeholder: "Description..",

              objName: todo.id,
            },
            [todo.desc],
          ),

          Template.selectbox([
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
        ]),
        Template.formBtns(),
      ],
      "submit",
    );
    return form;
  }

  static todoList(obj) {
    const { id, title } = obj;

    const todoListActions = DOM.create(
      "span",
      { class: "actions" },
      Template.actionButtons(false),
      "click",
    );
    const heading = DOM.create("h3", { class: "list-title" }, [title]);

    const todos = Store.itemsByProp("listId", id);

    const completeTodos = todos
      .filter((todo) => todo.status === "complete")
      .map((item) => Template.todoTemplate(item));
    const incompleteTodos = todos
      .filter((todo) => todo.status === "incomplete")
      .map((item) => Template.todoTemplate(item));
    // console.log(todos);
    const addBtn = DOM.create(
      "button",
      { class: "add-btn", id: "add-todo", "data-action": "add-todo" },
      [DOM.HTMLtoElem(plusSVG), "New Task"],
      "click",
    );
    const listHeader = DOM.create("div", { class: "list-header" }, [
      heading,
      addBtn,
      todoListActions,
    ]);
    const ul = DOM.create("ul", { class: "todos" }, [
      ...incompleteTodos,
      ...completeTodos,
    ]);

    const section = DOM.create(
      "section",
      {
        id,
        class: "todo-list",
      },
      [listHeader, ul],
    );

    // console.log(todos);

    return section;
  }

  static todoTemplate(todoObj) {
    // console.log(todoObj);
    let { id, title, priority, desc, date, label, status } = todoObj;

    const checkbox = DOM.create("input", {
      class: "checkbox",
      type: "checkbox",
      value: "1",
      id: "mark",
      "data-action": "mark",
      checked: status === "incomplete" ? false : true,
    });

    const statusClass = status === "incomplete" ? "complete" : "";

    const actions = DOM.create(
      "span",
      { class: "actions" },
      Template.actionButtons(),
    );

    title = DOM.create("span", { class: `title ${statusClass}` }, [title]);
    priority = DOM.create(
      "span",
      { class: `priority ${priority}`, title: priority },
      [DOM.HTMLtoElem(bookMarkSVG)],
    );
    desc = DOM.create("span", { class: "desc" }, [desc]);

    let dateFormat = DateTime.format(date).trim();
    let isToday = dateFormat === "today";
    let isPast = DateTime.isLate(date) && !isToday;
    date = DOM.create(
      "span",
      { class: `date ${isPast ? "txt-red" : isToday ? "txt-green" : ""}` },
      [dateFormat],
    );
    label = DOM.create("span", { class: "label" }, [label]);

    const upperSection = DOM.create("div", { class: "upper-todo-section" }, [
      checkbox,
      title,
      priority,
      date,
      actions,
    ]);
    const lowerSection =
      desc.textContent.length > 0
        ? DOM.create("div", { class: "lower-todo-section" }, [desc])
        : "";

    const div = DOM.create("div", { class: "todo-section" }, [
      upperSection,
      lowerSection,
    ]);
    const li = DOM.create(
      "li",
      {
        id,
        class: `todo  ${statusClass}`,
      },
      [div],
      "click",
    );

    // console.log(li);

    return li;
  }

  static actionButtons(isTodo = true) {
    let actionSuffix = isTodo ? "" : "-list";
    return [
      DOM.create(
        "button",
        {
          class: "action-btn edit-btn",
          "data-action": `edit-todo${actionSuffix}`,
        },
        [DOM.HTMLtoElem(pencilSVG)],
      ),
      DOM.create(
        "button",
        {
          class: "action-btn delete-btn",
          "data-action": `delete-todo${actionSuffix}`,
        },
        [DOM.HTMLtoElem(trashSVG)],
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
      { class: "close-btn", "data-action": "close" },
      [DOM.HTMLtoElem(closeSVG)],
      "click",
    );
    const modalContent = DOM.create("div", { class: "modal-content" }, [
      closeBtn,
      elem,
    ]);

    return DOM.create("div", { class: "modal" }, [closeBtn, modalContent]);
  }
}
