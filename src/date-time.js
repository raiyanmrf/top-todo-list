import { formatRelative, isPast } from "date-fns";

export default class DateTime {
  static format(baseDate) {
    if (!baseDate) return "";
    let formattedDate = formatRelative(new Date(baseDate), new Date()).replace(
      /at\s\d+:\d+\s[A-Z]+/i,
      "",
    );
    console.log(formattedDate);
    return formattedDate;
  }

  static isLate(baseDate) {
    if (!baseDate) return false;
    let late = isPast(new Date(baseDate));
    console.log(late);
    return late;
  }
}
