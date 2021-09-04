import Octokit from "@octokit/core";

export class Analyzer {
  owner = "huridocs";
  repo = "uwazi";
  octokit: Octokit.Octokit;

  constructor() {
    this.octokit = new Octokit.Octokit();
  }

  getSprintIssuesPerPage = async (page) => {
    const issues = await this.octokit.request(
      "GET /repos/{owner}/{repo}/issues",
      {
        owner: "huridocs",
        repo: "uwazi",
        per_page: 100,
        labels: "sprint",
        state: "closed",
        since: "2021-01-01T00:00:00Z",
        page,
      }
    );
    return issues;
  };

  getAllIssues = async () => {
    const allIssues = [];
    let page = 1;
    let issues = await this.getSprintIssuesPerPage(page);
    while (issues.data?.length > 0) {
      allIssues.push(...issues.data);
      page++;
      issues = await this.getSprintIssuesPerPage(page);
    }
    return allIssues;
  };

  main = async () => {
    console.log(Octokit);

    const issues = await this.getAllIssues();
    const events = await this.octokit.request(
      "GET /repos/{owner}/{repo}/issues/{issue_number}/events",
      {
        owner: "huridocs",
        repo: "uwazi",
        issue_number: issues[23].number,
      }
    );
    console.log(issues.length);
    console.log(events.data);
  };
}
