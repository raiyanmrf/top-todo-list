import Store from "./store.js";

export default class TodoList {
  constructor(name, desc = "") {
    this.name = name;
    this.desc = desc;
    this.status = "active";
    this.id = crypto.randomUUID();
  }

  set() {
    let obj = ({ name, desc, id, status } = this);
    Store.setItem(obj);
  }

  get() {
    return Store.getItem(this.name);
  }

  delete() {
    Store.removeItem(this.name);
  }

  setDesc(value) {
    Store.setProp("desc", value, this.name);
    this.desc = value;
  }
  setName(value) {
    Store.setProp("name", value, this.name);
    Store.rename(value, this.name);
    this.name = this.name;
  }

  setStatus(value) {
    Store.setProp("status", value, this.name);
    this.status = value;
  }

  getDesc(value) {
    return Store.getPropValue("desc", this.name);
  }
  getId(value) {
    return Store.getPropValue("id", this.name);
  }

  getNote(value) {
    return Store.getPropValue("note", this.name);
  }

  getStatus(value) {
    return Store.getPropValue("status", this.name);
  }
  getDueDate(value) {
    return Store.getPropValue("dueDate", this.name);
  }
}
