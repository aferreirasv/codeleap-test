// SMALLER THAN MOMENT.JS
const timeHelper = (date) => {
  const intervals = {
    31536000: "years",
    2592000: "months",
    86400: "days",
    3600: "hours",
    60: "minutes",
  };
  var seconds = Math.floor((new Date() - date) / 1000);
  for (let interval of Object.keys(intervals).reverse()) {
    let i = seconds / interval;
    if (i > 1) return Math.floor(i) + " " + intervals[interval];
  }
  if (seconds < 5) {
    return "Right now";
  }
  return Math.floor(seconds) + " seconds";
};

export default timeHelper;
