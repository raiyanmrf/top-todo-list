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
    this.id = TODO_PREFIX + crypto.randomUUID();
    this.title = title;
    this.desc = desc;
    this.date = date;
    this.status = "incomplete";
    this.priority = priority;
    this.listId = listId;
    this.note = note;
    this.label = label;
  }
}
