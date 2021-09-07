import { getData } from "./dataExractor";
import { analyzeTimeToClose } from "./analyzers/timeToClose";
import { countLabels } from "./analyzers/countLabels";
import { timeToCloseGrouped } from "./analyzers/timeToCloseGrouped";
import { average_time_to_close_by_points } from "./analyzers/groupIssuesByPoints";

export class Analyzer {
  owner = "huridocs";
  repo = "uwazi";
  initialDate = "2021-02-23T00:00:00Z"; // first recorded sprint with estimations

  main = async () => {
    const issues = await getData(this.initialDate);
    const points_done = issues.reduce(
      (total, issue) => total + parseFloat(issue.points || 0),
      0
    );
    const total_days = issues
      .reduce((total, issue) => total + issue.days_to_close, 0)
      .toFixed(2);

    console.log(total_days);

    const data = {
      date: new Date(this.initialDate).toLocaleDateString(),
      issues_closed: issues.length,
      points_done,
      total_days,
      average_time_per_point: (total_days / points_done).toFixed(2),
      labels: countLabels(issues),
      ...analyzeTimeToClose(issues),
      issues_time_closed_grouped: timeToCloseGrouped(issues),
      pr_time_closed_grouped: timeToCloseGrouped(issues, "pr_started"),
      issues_by_points: average_time_to_close_by_points(issues),
    };

    return data;
  };
}
