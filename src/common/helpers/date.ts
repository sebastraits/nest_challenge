import moment from 'moment';

export function findOneMonthAgoDate(): Date {
  const dateOneMonthAgo = moment()
    .subtract(1, 'months')
    .startOf('day')
    .toDate();
  return dateOneMonthAgo;
}
