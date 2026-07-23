import { format, formatDate, formatRelative, isPast, subDays } from "date-fns";

export default class DateTime {
  static format(baseDate) {
    let formattedDate = formatRelative(new Date(baseDate), new Date());
    console.log(formattedDate);
    return formattedDate;
  }

  static isLate(baseDate) {
    let late = isPast(new Date(baseDate));
    console.log(late);
    return late;
  }
}
