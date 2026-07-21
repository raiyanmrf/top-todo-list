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
}
