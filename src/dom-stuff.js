import Template from "./template.js";

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
        Template.clickEvent(elem);
        break;

      case "submit":
        Template.submitEvent(elem);
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

  static createEvent(event, elem, callback) {
    elem.addEventListener(event, callback);
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
