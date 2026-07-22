export default class DomStuff {
  constructor(tag) {
    this.elem = DomStuff.create(tag);
  }
  static create(tag) {
    return document.createElement(tag);
  }

  static select(identifier) {
    return document.querySelector(identifier);
  }

  static selectAll(identifier) {
    return document.querySelectorAll(identifier);
  }

  setClass(className, action = "add") {
    this.elem.classList[action](className);
  }

  setId(id) {
    this.elem.id = id;
  }
}
