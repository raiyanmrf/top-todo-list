import DOM from "./dom-stuff.js";
import Store from "./store.js";
import DateTime from "./date-time.js";

export default class Template {
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
  static todoListForm(todoList) {
    let form = DOM.create("form", { id: "todo-list-form", class: "form" }, [
      DOM.create("button", { class: "cross-btn" }, ["X"]),
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
    ]);
    return form;
  }
  static todoForm(todo) {
    let form = DOM.create("form", { id: "todo-form", class: "form" }, [
      DOM.create("button", { class: "cross-btn" }, ["X"]),

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
    ]);
    return form;
  }

  static todoList(todoListObj) {
    const { id, keyName, title } = todoListObj;

    const heading = DOM.create("h3", { class: "list-title" }, [title]);
    const todos = Store.everyItemsWith("listId", id).map((item) =>
      Template.todoTemplate(item),
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
      id: "mark",
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

  static submitEvent(selector) {
    const form = DOM.select(selector);

    DOM.createEvent("submit", form, function (e) {
      e.preventDefault();
      const formData = new FormData(form);
      let obj = {};
      for (const [key, value] of formData) {
        obj[key] = value;
      }
      obj.keyName = PREFIX + obj.title;
      Store.setItems([obj]);

      console.log(Store.getItem(obj.keyName));
    });
  }
  static actionEvent(selector) {
    let elem = DOM.select(selector);
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
      }
    });
  }
}
