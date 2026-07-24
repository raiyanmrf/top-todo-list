import { PREFIX } from "./index.js";

export default class Store {
  static #addPrefix(title) {
    return PREFIX + title;
  }
  static #removePrefix(title) {
    return title.replace(PREFIX);
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

  static retitle(newKey, oldKey) {
    const value = Store.get(oldKey);
    Store.remove(oldKey);
    Store.set(newKey, value);
  }

  static setProp(prop, value, itemName) {
    const item = Store.getItem(itemName);
    // console.log(item);
    item[prop] = value;
    Store.setItem(item);
    // console.log(Store.getItem(item.title));
  }
  static getPropValue(prop, itemName) {
    const item = Store.getItem(itemName);
    const value = item[prop];
    return value;
  }

  static everyItemsWith(prop, propValue) {
    let items = [];

    for (const key of Object.keys(localStorage)) {
      if (!key.includes(PREFIX)) continue;
      // console.log(key);
      if (Store.getPropValue(prop, key) === propValue)
        items.push(Store.getItem(key));
    }

    return items;
  }
}
