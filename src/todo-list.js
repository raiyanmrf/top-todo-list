import { LIST_PREFIX } from "./asset/utility.js";

export default class TodoList {
  constructor(title = "", desc = "") {
    this.title = title;
    this.desc = desc;
    this.status = "active";
    this.id = crypto.randomUUID();
    this.keyName = LIST_PREFIX + title;
  }
}
