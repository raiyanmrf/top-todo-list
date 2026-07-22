export default class Store {
  static #prefix = "{{todozz}}";

  static #addPrefix(name) {
    return Store.#prefix + name;
  }
  static #removePrefix(name) {
    return name.replace(Store.#prefix);
  }

  static setItem(obj) {
    localStorage.setItem(obj.keyName, JSON.stringify(obj));
  }
  static getItem(key) {
    const todoList = localStorage.getItem(key);
    return JSON.parse(todoList);
  }

  static isExists(key) {
    return localStorage.getItem(key) !== null;
  }
  static removeItem(key) {
    localStorage.removeItem(key);
  }

  static rename(newKey, oldKey) {
    const value = Store.get(oldKey);
    Store.remove(oldKey);
    Store.set(newKey, value);
  }

  static setProp(prop, value, itemName) {
    const item = Store.getItem(itemName);
    // console.log(item);
    item[prop] = value;
    Store.setItem(item);
    // console.log(Store.getItem(item.name));
  }
  static getPropValue(prop, itemName) {
    const item = Store.getItem(itemName);
    const value = item[prop];
    return value;
  }

  //   static everyItemWith(prop, propValue){
  // let items = [];

  // for (const key of Object.keys(localStorage)) {
  //   if(item[prop] && value === propValue) {

  //   }
  // }
  //   }
}
