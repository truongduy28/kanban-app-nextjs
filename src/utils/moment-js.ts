import moment from "moment";

export const formatTimes = (time: string): string => {
  const inputDate = moment(time);
  const threeDaysAgo = moment().subtract(3, "days");

  if (inputDate.isBefore(threeDaysAgo)) {
    return inputDate.format("DD/MM/YYYY HH:mm:ss");
  } else {
    return inputDate.fromNow();
  }
};
