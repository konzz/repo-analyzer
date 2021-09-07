import { filterOutliers, getAverge } from "./mathHelpers";

export const analyzeTimeToClose = (issues) => {
  const data = {
    avg_time_to_close_issue: 0,
    min_time_to_close_issue: 0,
    max_time_to_close_issue: 0,
    avg_time_to_close_pr: 0,
    min_time_to_close_pr: 0,
    max_time_to_close_pr: 0,
    all_issue_duration: [],
    all_pr_duration: [],
  };

  issues.forEach((issue) => {
    if (issue.started && issue.closed) {
      data.all_issue_duration.push(issue.days_to_close);
    }

    if (issue.pr_started && issue.pr_started) {
      data.all_pr_duration.push(issue.days_to_close_pr);
    }
  });

  data.filtered_all_issue_duration = filterOutliers(data.all_issue_duration);
  data.filtered_all_pr_duration = filterOutliers(data.all_pr_duration);

  data.avg_time_to_close_issue = getAverge(
    data.filtered_all_issue_duration
  ).toFixed(2);
  data.min_time_to_close_issue = Math.min(...data.filtered_all_issue_duration);
  data.max_time_to_close_issue = Math.max(...data.filtered_all_issue_duration);

  data.avg_time_to_close_pr = getAverge(data.filtered_all_pr_duration).toFixed(
    2
  );
  data.min_time_to_close_pr = Math.min(...data.filtered_all_pr_duration);
  data.max_time_to_close_pr = Math.max(...data.filtered_all_pr_duration);

  return data;
};
