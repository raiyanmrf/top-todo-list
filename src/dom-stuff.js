import { PREFIX } from "./index.js";

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

  static createEvent(event, elem, callback) {
    elem.addEventListener(event, callback);
  }
}
