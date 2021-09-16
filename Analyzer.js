import { getData } from "./dataExractor";
import { analyzeTimeToClose } from "./analyzers/timeToClose";
import { countLabels } from "./analyzers/countLabels";
import { timeToCloseGrouped } from "./analyzers/timeToCloseGrouped";
import { averageTimeToCloseByPoints } from "./analyzers/groupIssuesByPoints";
import { groupIssuesBySprint } from "./analyzers/sprints";

export class Analyzer {
  owner = "huridocs";
  repo = "uwazi";
  initialDate = "2021-02-23T00:00:00Z"; // first recorded sprint with estimations

  main = async () => {
    const issues = await getData(this.initialDate);
    const sprints = groupIssuesBySprint(issues, this.initialDate);

    const timeToClose = analyzeTimeToClose(issues);

    const pointsDone = issues.reduce(
      (total, issue) => total + parseFloat(issue.points || 0),
      0
    );
    const totalDays = timeToClose.filteredAllIssueDuration
      .reduce((total, days) => total + days, 0)
      .toFixed(2);

    const data = {
      date: new Date(this.initialDate).toLocaleDateString(),
      issuesClosed: issues.length,
      pointsDone,
      totalDays,
      averageTimePerPoint: (totalDays / pointsDone).toFixed(2),
      labels: countLabels(issues),
      ...timeToClose,
      issuesGroupedByDaysToClose: timeToCloseGrouped(issues),
      prGroupedByDaysToClose: timeToCloseGrouped(issues, "pr_started"),
      issuesByPoints: averageTimeToCloseByPoints(issues),
      sprints,
    };

    return data;
  };
}
