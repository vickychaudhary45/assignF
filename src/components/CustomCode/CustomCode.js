//  script to parse time and date and return in x days/weeks/months/years ago
export const parseTime = (time) => {
  let currentTime = new Date();
  let timeDiff = currentTime.getTime() - new Date(time).getTime();
  let diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));
  let diffHours = Math.floor(timeDiff / (1000 * 3600));
  let diffMins = Math.floor(timeDiff / (1000 * 60));
  let diffSecs = Math.floor(timeDiff / (1000));
  let diffWeeks = Math.floor(diffDays / 7);
  let diffMonths = Math.floor(diffDays / 30);
  let diffYears = Math.floor(diffDays / 365);
  let timeAgo = "";
  if (diffYears > 0) {
    timeAgo = diffYears + " years ago";
  }
  else if (diffMonths > 0) {
    timeAgo = diffMonths + " months ago";
  }
  else if (diffWeeks > 0) {
    timeAgo = diffWeeks + " weeks ago";
  }
  else if (diffDays > 0) {
    timeAgo = diffDays + " days ago";
  }
  else if (diffHours > 0) {
    timeAgo = diffHours + " hours ago";
  }
  else if (diffMins > 0) {
    timeAgo = diffMins + " mins ago";
  }
  else if (diffSecs > 0) {
    timeAgo = diffSecs + " secs ago";
  }
  return timeAgo;
}

export const sd = (date) => {
  if (date !== null) {
  let newDate = new Date(date);
  let dd = newDate.getDate();
  let mm = newDate.toLocaleString("default", { month: "short" });
  // let mm = newDate.getMonth() + 1;
  let yyyy = newDate.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  newDate = dd + " " + mm + ", " + yyyy;
  return newDate;
  }
  else
  {
    return "-";
  }
}
