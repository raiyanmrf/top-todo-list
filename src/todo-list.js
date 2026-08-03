import { LIST_PREFIX } from "./asset/utility.js";

export default class TodoList {
  constructor(title = "", desc = "") {
    this.title = title;
    this.status = "active";
    this.id = LIST_PREFIX + crypto.randomUUID();
  }
}
