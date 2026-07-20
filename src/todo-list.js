export default class TodoList {
  static new(name, value = []) {
    localStorage.setItem(name, JSON.stringify(value));

    return name;
  }
  static get(name) {
    const todoList = JSON.parse(localStorage.getItem(name));
    return todoList;
  }

  static isExists(name) {
    return localStorage.getItem(name) !== null;
  }
  static remove(name) {
    localStorage.removeItem(name);
  }

  static rename(newName, oldName) {
    const value = TodoList.get(oldName);
    TodoList.remove(oldName);
    TodoList.new(newName, value);
  }
}
