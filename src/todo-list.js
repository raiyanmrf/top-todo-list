export default class TodoList {
  constructor(name, value = []) {
    this.name = name;
    this.value = value;
    TodoList.store(name, value);
  }

  static store(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  static get(key) {
    const todoList = JSON.parse(localStorage.getItem(key));
    return todoList;
  }

  static isExists(key) {
    return localStorage.getItem(key) !== null;
  }
  static remove(key) {
    localStorage.removeItem(key);
  }

  static updateName;
}
