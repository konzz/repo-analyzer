import {
  filterOutliers,
  getAverge,
  getStandardDeviation,
  getMean,
} from "./mathHelpers";

export const analyzeTimeToClose = (issues) => {
  const data = {
    avgTimeToCloseIssue: 0,
    minTimeToCloseIssue: 0,
    maxTimeToCloseIssue: 0,
    avgTimeToClosePr: 0,
    minTimeToClosePr: 0,
    maxTimeToClosePr: 0,
    allIssuesDuration: [],
    filteredAllIssueDuration: [],
    allPrsDuration: [],
    filteredAllPrsDuration: [],
    mean: 0,
    standardDeviation: 0,
  };

  issues.forEach((issue) => {
    if (issue.started && issue.closed) {
      data.allIssuesDuration.push(issue.days_to_close);
    }

    if (issue.pr_started && issue.pr_started) {
      data.allPrsDuration.push(issue.days_to_close_pr);
    }
  });

  data.filteredAllIssueDuration = filterOutliers(data.allIssuesDuration);
  data.filteredAllPrsDuration = filterOutliers(data.allPrsDuration);

  data.avgTimeToCloseIssue = parseFloat(
    getAverge(data.filteredAllIssueDuration).toFixed(2)
  );

  data.mean = parseFloat(getMean(data.filteredAllIssueDuration).toFixed(2));
  data.standardDeviation = parseFloat(
    getStandardDeviation(data.filteredAllIssueDuration).toFixed(2)
  );

  data.minTimeToCloseIssue = Math.min(...data.filteredAllIssueDuration);
  data.maxTimeToCloseIssue = Math.max(...data.filteredAllIssueDuration);

  data.avgTimeToClosePr = parseFloat(
    getAverge(data.filteredAllPrsDuration).toFixed(2)
  );
  data.minTimeToClosePr = Math.min(...data.filteredAllPrsDuration);
  data.maxTimeToClosePr = Math.max(...data.filteredAllPrsDuration);

  return data;
};
