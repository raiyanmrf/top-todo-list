export default class Store {
  static set(key, value = "") {
    localStorage.setItem(key, value);
  }
  static get(key) {
    const todoList = localStorage.getItem(key);
    return todoList;
  }

  static isExists(key) {
    return localStorage.getItem(key) !== null;
  }
  static remove(key) {
    localStorage.removeItem(key);
  }

  static rename(newKey, oldKey) {
    const value = Store.get(oldKey);
    Store.remove(oldKey);
    Store.set(newKey, value);
  }
}
