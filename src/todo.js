export default class Todo {
  #prefix = "{{todozz}}";

  constructor(
    name,
    listId,
    desc = "",
    date = "",
    priority = 0,
    label = "",
    note = "",
  ) {
    this.id = crypto.randomUUID();
    this.name = name;
    this.desc = desc;
    this.date = date;
    this.status = "incomplete";
    this.priority = priority;
    this.listId = listId;
    this.note = note;
    this.keyName = this.#prefix + name;
    this.label = label;
  }
}
