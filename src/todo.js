export default class Todo {
  #prefix = "{{todozz}}";

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
    this.keyName = this.#prefix + name;
  }
}
