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
    const { id, keyName, name } = todoListObj;

    const title = DOM.create("h3", { class: "list-title" }, [name]);
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
      [title, ul],
    );

    console.log(todos);

    return section;
  }

  static todoTemplate(todoObj) {
    console.log(todoObj);
    let { id, keyName, name, priority, desc, date, note, label } = todoObj;

    const actions = DOM.create("span", { class: "actions" }, [
      DOM.create("button", { class: "edit" }, ["E"]),
      DOM.create("button", { class: "delete" }, ["D"]),
      DOM.create("button", { class: "note" }, ["N"]),
    ]);

    name = DOM.create("span", { class: "name" }, [name]);
    priority = DOM.create("span", { class: "priority" }, [priority]);
    desc = DOM.create("span", { class: "desc" }, [desc]);
    date = DOM.create("span", { class: "date" }, [date]);
    label = DOM.create("span", { class: "label" }, [label]);

    const li = DOM.create(
      "li",
      {
        id,
        "data-key": keyName,
        class: "todo",
      },
      [name, actions, date, priority, label],
    );

    console.log(li);

    return li;
  }
}
