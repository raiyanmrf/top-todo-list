export default class TodoList {
  constructor(name, desc = "") {
    this.name = name;
    this.desc = desc;
    this.status = "active";
    this.id = crypto.randomUUID();
  }
}
