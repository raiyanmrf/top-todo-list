import { format, formatDate, formatRelative, isPast, subDays } from "date-fns";

export default class DateTime {
  static format(baseDate) {
    if (!baseDate) return "";
    let formattedDate = formatRelative(new Date(baseDate), new Date());
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
