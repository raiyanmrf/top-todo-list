import Events from "./event.js";

export default class DOM {
  static create(tag, attrs = {}, children = [], event = "") {
    let elem = document.createElement(tag);

    return DOM.update(elem, attrs, children, event);
  }
  static update(elem, attrs = {}, children = [], event = "") {
    if (attrs) {
      for (const [key, value] of Object.entries(attrs)) {
        if (typeof value === "boolean") {
          // console.log(key, value);
          elem[key] = value;
        } else elem.setAttribute(key, value);
      }
    }

    if (children) {
      elem.append(...children);
    }

    switch (event) {
      case "click":
        Events.click(elem);
        break;

      case "submit":
        Events.submit(elem);
        break;
    }
    return elem;
  }

  static select(identifier) {
    return document.querySelector(identifier);
  }

  static selectAll(identifier) {
    return document.querySelectorAll(identifier);
  }

  static replaceWith(newElem, oldElemSelector) {
    const oldElem = DOM.select(oldElemSelector);
    if (oldElem) {
      oldElem.replaceWith(newElem);

      return true;
    }

    return false;
  }

  static HTMLtoElem(stringHTML) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(stringHTML, "text/html");

    return doc.body.firstElementChild;
  }

  static scrollIntoView(elem) {
    elem.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }
}
