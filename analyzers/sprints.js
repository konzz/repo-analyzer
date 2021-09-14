//function that returns 2 week sprints from an initial date until today
export const createSprints = (startDate) => {
  const sprints = [];
  const today = new Date();
  let start = new Date(startDate);
  let end = new Date(startDate);
  end.setDate(end.getDate() + 14);

  while (start <= today) {
    sprints.push({
      start: start.getTime(),
      end: end.getTime(),
    });

    start = new Date(end);
    end.setDate(end.getDate() + 14);
  }

  return sprints;
};

//function that returns the issues divided by the sprint where it started
export const groupIssuesBySprint = (issues, startDate) => {
  const sprints = createSprints(startDate);
  issues.forEach((issue) => {
    const sprint = sprints.find((sprint) => {
      return (
        new Date(issue.closed) >= new Date(sprint.start) &&
        new Date(issue.closed) <= new Date(sprint.end)
      );
    });

    if (sprint) {
      if (!sprint.issues) {
        sprint.issues = [];
      }
      sprint.issues.push(issue);
    }
  });

  return sprints.map((sprint) => {
    sprint.points = sprint.issues?.reduce((acc, issue) => {
      if (!issue.points) return acc;
      return acc + parseInt(issue.points, 10);
    }, 0);

    return sprint;
  });
};
