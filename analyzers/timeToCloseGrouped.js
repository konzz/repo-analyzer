export const timeToCloseGrouped = (issues, key = "started") => {
  const data = {
    "0 - 3": 0,
    "3 - 6": 0,
    "6 - 9": 0,
    "9 - 12": 0,
    "12 - 15": 0,
    "15 - 18": 0,
    "18 - 21": 0,
    "21 +": 0,
  };

  issues.forEach((issue) => {
    if (issue.started && issue.closed) {
      const duration =
        new Date(issue.closed).getTime() - new Date(issue[key]).getTime();
      const days = Math.round(duration / (1000 * 60 * 60 * 24));
      if (days < 3) {
        data["0 - 3"] += 1;
      } else if (days >= 3 && days < 6) {
        data["3 - 6"] += 1;
      } else if (days >= 6 && days < 9) {
        data["6 - 9"] += 1;
      } else if (days >= 9 && days < 12) {
        data["9 - 12"] += 1;
      } else if (days >= 12 && days < 15) {
        data["12 - 15"] += 1;
      } else if (days >= 15 && days < 18) {
        data["15 - 18"] += 1;
      } else if (days >= 18 && days < 21) {
        data["18 - 21"] += 1;
      }
      if (days >= 21) {
        data["21 +"] += 1;
      }
    }
  });

  return data;
};
