import { TODO_PREFIX } from "./asset/utility.js";

export default class Todo {
  constructor(
    title = "",
    listId = "",
    desc = "",
    date = "",
    priority = "low",
    label = "",
    note = "",
  ) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.desc = desc;
    this.date = date;
    this.status = "incomplete";
    this.priority = priority;
    this.listId = listId;
    this.note = note;
    this.keyName = TODO_PREFIX + title;
    this.label = label;
  }
}
