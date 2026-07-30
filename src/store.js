import { TODO_PREFIX } from "./asset/utility.js";

export default class Store {
  static setItems(items) {
    items.forEach((item) => {
      localStorage.setItem(item.id, JSON.stringify(item));
    });
  }
  static setOption(key, value) {
    localStorage.setItem(key, value);
  }

  static getItem(key) {
    const todoList = localStorage.getItem(key);
    return JSON.parse(todoList);
  }

  static getOption(key) {
    return localStorage.getItem(key);
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
    Store.setItems([item]);
    // console.log(Store.getItem(item.title));
  }
  static getPropValue(prop, itemName) {
    const item = Store.getItem(itemName);
    const value = item[prop];
    return value;
  }

  static itemsByProp(prop, propValue, prefix = TODO_PREFIX) {
    let items = [];

    for (const key of Object.keys(localStorage)) {
      if (!key.includes(prefix)) continue;
      // console.log(key);
      if (Store.getPropValue(prop, key) === propValue)
        items.push(Store.getItem(key));
    }

    return items;
  }
  static getByKey(prefix) {
    let items = [];

    for (const key of Object.keys(localStorage)) {
      if (!key.includes(prefix)) continue;
      // console.log(key);
      items.push(Store.getItem(key));
    }

    return items;
  }
}
