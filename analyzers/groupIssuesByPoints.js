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

export const average_time_to_close_by_points = (issues) => {
  const groupedIssues = groupIssuesByPoints(issues);
  const average_time_to_close_by_points = {};
  Object.keys(groupedIssues).forEach((points) => {
    const issues_with_points = groupedIssues[points];

    average_time_to_close_by_points[points] =
      analyzeTimeToClose(issues_with_points);
  });

  return {
    average_time_to_close_by_points,
    count_by_points: countGroupedIssues(groupedIssues),
  };
};
