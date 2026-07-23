import { format, formatDate, formatRelative, subDays } from "date-fns";

export default class DateTime {
  static format(baseDate) {
    let formattedDate = formatRelative(new Date(baseDate), new Date());
    console.log(formattedDate);
    return formattedDate;
  }
}
