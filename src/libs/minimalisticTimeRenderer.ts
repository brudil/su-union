import getMinutes from 'date-fns/getMinutes';
import formatDate from 'date-fns/format';

export default function minimalisticTimeRenderer(date: Date) {
  if (getMinutes(date) === 0) {
    return formatDate(date, 'haa').toLocaleLowerCase();
  }

  return formatDate(date, 'h:mmaa').toLocaleLowerCase();
}
