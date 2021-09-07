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

  data.avg_time_to_close_issue = parseFloat(
    (
      data.all_issue_duration.reduce((a, b) => a + b, 0) /
      data.all_issue_duration.length
    ).toFixed(2)
  );
  data.min_time_to_close_issue = Math.min(...data.all_issue_duration);
  data.max_time_to_close_issue = Math.max(...data.all_issue_duration);
  data.avg_time_to_close_pr = parseFloat(
    (
      data.all_pr_duration.reduce((a, b) => a + b, 0) /
      data.all_pr_duration.length
    ).toFixed(2)
  );
  data.min_time_to_close_pr = Math.min(...data.all_pr_duration);
  data.max_time_to_close_pr = Math.max(...data.all_pr_duration);

  return data;
};
