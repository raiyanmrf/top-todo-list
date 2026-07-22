export default class TodoList {
  #prefix = "{{todozz}}";
  constructor(name, desc = "") {
    this.name = name;
    this.desc = desc;
    this.status = "active";
    this.id = crypto.randomUUID();
    this.keyName = this.#prefix + name;
  }
}
