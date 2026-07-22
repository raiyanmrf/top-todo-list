export default class DomStuff {
  static create(tag) {
    return document.createElement(tag);
  }

  static select(identifier) {
    return document.querySelector(identifier);
  }

  static selectAll(identifier) {
    return document.querySelectorAll(identifier);
  }
}
