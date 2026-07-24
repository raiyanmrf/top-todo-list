import DateTime from "./date-time.js";
import Store from "./store.js";

export default class DOM {
  static create(tag, attrs = {}, children = []) {
    let elem = document.createElement(tag);

    if (attrs) {
      for (const [key, value] of Object.entries(attrs)) {
        elem.setAttribute(key, value);
      }
    }

    if (children) {
      elem.append(...children);
    }
    return elem;
  }

  static select(identifier) {
    return document.querySelector(identifier);
  }

  static selectAll(identifier) {
    return document.querySelectorAll(identifier);
  }

  static todoListTemplate(todoListObj) {
    const { id, keyName, title } = todoListObj;

    const heading = DOM.create("h3", { class: "list-title" }, [title]);
    const todos = Store.everyItemsWith("listId", id).map((item) =>
      DOM.todoTemplate(item),
    );
    const ul = DOM.create("ul", { class: "todos" }, todos);

    const section = DOM.create(
      "section",
      {
        id,
        "data-key": keyName,
        class: "todo-list",
      },
      [heading, ul],
    );

    console.log(todos);

    return section;
  }

  static todoTemplate(todoObj) {
    console.log(todoObj);
    let { id, keyName, title, priority, desc, date, note, label } = todoObj;

    const checkbox = DOM.create("input", {
      class: "checkbox",
      type: "checkbox",
      value: "1",
    });
    const actions = DOM.create("span", { class: "actions" }, DOM.actionBtns());

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
        "data-key": keyName,
        class: "todo",
      },
      [checkbox, title, actions, date, priority, label],
    );

    console.log(li);

    return li;
  }

  static actionBtns() {
    return [
      DOM.create("button", { class: "edit" }, ["E"]),
      DOM.create("button", { class: "delete" }, ["D"]),
      DOM.create("button", { class: "note" }, ["N"]),
    ];
  }
  static formBtns() {
    return DOM.create("div", { class: "form-submit" }, [
      DOM.create("button", { typr: "submit-btn" }, ["Save"]),
      DOM.create("button", { class: "cancel-btn" }, ["cancel"]),
    ]);
  }

  static formInputs(children) {
    return DOM.create("div", { class: "form-input" }, children);
  }

  static textBox(tag, attrs) {
    const { type, name, placeholder, label, value, objName } = attrs;

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
      },
      [value],
    );

    return DOM.create("div", { class: "input-wrapper" }, [labelElem, input]);
  }
  static todoListForm(todoList) {
    let form = DOM.create(
      "form",
      { id: "todo-list-form", class: "form", "data-id": todoList.id },
      [
        DOM.create("button", { class: "cross-btn" }, ["X"]),
        DOM.formInputs([
          DOM.textBox("input", {
            type: "text",
            name: "title",
            placeholder: "e.g. Office Equipments",
            label: "Title",
            value: todoList.title,
            objName: todoList.keyName,
          }),
          DOM.textBox("textarea", {
            type: "",
            name: "desc",
            placeholder: "e.g. Get the coffe machine fixed.",
            label: "Desc..",
            value: todoList.desc,
            objName: todoList.keyName,
          }),
        ]),
        DOM.formBtns(),
      ],
    );
    return form;
  }

  static createEvent(event, elem, callback) {
    elem.addEventListener(event, callback);
  }

  static submitEvent(selector) {
    const form = DOM.select(selector);

    DOM.createEvent("submit", form, function (e) {
      e.preventDefault();
      const formData = new FormData(form);

      console.log(formData);
    });
  }
}
