import Store from "./store.js";

export default class Todo {
  constructor(
    name,
    listId,
    desc = "",
    dueDate = null,
    priority = 0,
    note = "",
  ) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.desc = desc;
    this.dueDate = dueDate;
    this.status = "incomplete";
    this.priority = priority;
    this.listId = listId;
    this.note = note;
  }

  set() {
    let obj = ({ name, desc, id, status, listId, note, dueDate, priority } =
      this);
    Store.setItem(obj);
  }

  get() {
    return Store.getItem(this.name);
  }

  delete() {
    Store.removeItem(this.name);
  }

  setPriority(value) {
    Store.setProp("priority", +value, this.name);
    this.priority = +value;
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

  setNote(value) {
    Store.setProp("note", value, this.name);
    this.note = value;
  }

  setList(value) {
    Store.setProp("listId", value, this.name);
    this.listId = value;
  }

  setStatus(value) {
    Store.setProp("status", value, this.name);
    this.status = value;
  }
  setDueDate(value) {
    Store.setProp("dueDate", value, this.name);
    this.dueDate = value;
  }
  getPriority(value) {
    return Store.getPropValue("priority", this.name);
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

  getList(value) {
    return Store.getPropValue("listId", this.name);
  }

  getStatus(value) {
    return Store.getPropValue("status", this.name);
  }
  getDueDate(value) {
    return Store.getPropValue("dueDate", this.name);
  }
}
