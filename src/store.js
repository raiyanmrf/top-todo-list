export default class Store {
  static set(obj) {
    localStorage.setItem(obj.name, JSON.stringify(obj));
  }
  static get(key) {
    const todoList = localStorage.getItem(key);
    return JSON.parse(todoList);
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
