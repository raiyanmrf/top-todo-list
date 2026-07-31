import Events from "./event.js";

export default class DOM {
  static create(tag, attrs = {}, children = [], event = "") {
    let elem = document.createElement(tag);

    if (attrs) {
      for (const [key, value] of Object.entries(attrs)) {
        elem.setAttribute(key, value);
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

  static svg(svgHTML) {
    let span = DOM.create("span", { class: "icon" });
    span.innerHTML = svgHTML;
    return span;
  }
}
