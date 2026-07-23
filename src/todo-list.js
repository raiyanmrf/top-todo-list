export default class TodoList {
  #prefix = "{{todozz}}";
  constructor(title, desc = "") {
    this.title = title;
    this.desc = desc;
    this.status = "active";
    this.id = crypto.randomUUID();
    this.keyName = this.#prefix + title;
  }
}
