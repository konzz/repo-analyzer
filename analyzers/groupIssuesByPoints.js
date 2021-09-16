import { analyzeTimeToClose } from "./timeToClose.js";

export const groupIssuesByPoints = (issues) => {
  const groupedIssues = {};
  issues.forEach((issue) => {
    const { points } = issue;
    if (points) {
      if (!groupedIssues[points]) {
        groupedIssues[points] = [];
      }
      groupedIssues[points].push(issue);
    }
  });
  return groupedIssues;
};

const countGroupedIssues = (groupedIssues) => {
  const count = {};
  Object.keys(groupedIssues).forEach((key) => {
    count[key] = groupedIssues[key].length;
  });
  return count;
};

export const averageTimeToCloseByPoints = (issues) => {
  const groupedIssues = groupIssuesByPoints(issues);
  const averageTimeToCloseByPoints = {};

  Object.keys(groupedIssues).forEach((points) => {
    const issues_with_points = groupedIssues[points];

    averageTimeToCloseByPoints[points] = analyzeTimeToClose(issues_with_points);
  });

  return {
    averageTimeToCloseByPoints,

    countByPoints: countGroupedIssues(groupedIssues),
  };
};
