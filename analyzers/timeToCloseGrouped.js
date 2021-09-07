export const timeToCloseGrouped = (issues, key = "started") => {
  const data = {
    "0 - 3": 0,
    "3 - 8": 0,
    "8 - 15": 0,
    "15 - 24": 0,
    "24 - 35": 0,
    "35 +": 0,
  };

  issues.forEach((issue) => {
    if (issue.started && issue.closed) {
      const duration =
        new Date(issue.closed).getTime() - new Date(issue[key]).getTime();
      const days = Math.round(duration / (1000 * 60 * 60 * 24));

      if (days < 3) {
        data["0 - 3"] += 1;
      } else if (days < 8) {
        data["3 - 8"] += 1;
      } else if (days < 15) {
        data["8 - 15"] += 1;
      } else if (days < 24) {
        data["15 - 24"] += 1;
      } else if (days < 35) {
        data["24 - 35"] += 1;
      } else {
        data["35 +"] += 1;
      }
    }
  });

  return data;
};
