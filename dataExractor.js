import { Octokit } from "@octokit/core";
import fs from "fs";

const getSprintIssuesPerPage = async (page, octokit, initialDate) => {
  const issues = await octokit.request("GET /repos/{owner}/{repo}/issues", {
    owner: "huridocs",
    repo: "uwazi",
    per_page: 100,
    labels: "sprint",
    state: "closed",
    since: initialDate, // first recorded sprint with estimations
    page,
  });
  return issues;
};

const processIssue = async (issue, octokit) => {
  const timeline = await octokit.request(
    "GET /repos/{owner}/{repo}/issues/{issue_number}/timeline",
    {
      owner: "huridocs",
      repo: "uwazi",
      issue_number: issue.number,
      mediaType: {
        previews: ["mockingbird"],
      },
    }
  );
  const PR = timeline.data
    .filter(
      (item) =>
        item.event === "cross-referenced" && item.source.issue.pull_request
    )
    .pop();
  const labelSprint = timeline.data
    .filter(
      (event) =>
        event.event === "labeled" &&
        (event.label.name === "Sprint" || event.label.name === "Status: Sprint")
    )
    .pop();
  const closed = timeline.data
    .filter((event) => event.event === "closed")
    .pop();

  let pr_started = null;

  if (PR) {
    const PR_timeline = await octokit.request(
      "GET /repos/{owner}/{repo}/issues/{issue_number}/timeline",
      {
        owner: "huridocs",
        repo: "uwazi",
        issue_number: PR.source.issue.number,
        mediaType: {
          previews: ["mockingbird"],
        },
      }
    );
    const PR_Ready = PR_timeline.data.find(
      (event) => event.event === "ready_for_review"
    );

    pr_started = PR_Ready?.created_at || PR.created_at;
  }

  const points = issue.title.match(/\(\s?(\d*).*\)/);

  const time_to_close =
    new Date(closed?.created_at).getTime() -
    new Date(labelSprint?.created_at).getTime();
  const days_to_close = parseFloat(
    (time_to_close / (1000 * 60 * 60 * 24)).toFixed(2)
  );

  const time_to_close_pr =
    new Date(closed?.created_at).getTime() - new Date(pr_started).getTime();
  const days_to_close_pr = parseFloat(
    (time_to_close_pr / (1000 * 60 * 60 * 24)).toFixed(2)
  );
  return {
    ...issue,
    started: labelSprint?.created_at,
    closed: closed?.created_at,
    pr_started,
    points: points ? points[1] : 0,
    timeline: timeline.data,
    time_to_close,
    days_to_close,
    time_to_close_pr,
    days_to_close_pr,
  };
};

const getAllIssues = async (initialDate) => {
  const octokit = new Octokit({
    auth: "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",
  });
  const allIssues = [];
  let page = 1;
  let issues = await getSprintIssuesPerPage(page, octokit, initialDate);
  while (issues.data?.length > 0) {
    allIssues.push(...issues.data);
    page++;
    issues = await getSprintIssuesPerPage(page, octokit, initialDate);
  }
  return Promise.all(
    allIssues.map(async (issue) => processIssue(issue, octokit))
  );
};

export const getData = async (initialDate, fileName = "data") => {
  const rawData = fs.readFileSync(`./${fileName}`, "utf-8");
  if (rawData) {
    return JSON.parse(rawData);
  }
  const unfilteredData = await getAllIssues(initialDate);
  const data = unfilteredData.filter(
    (issue) => issue.days_to_close > 0 && issue.days_to_close_pr > 0
  );
  fs.writeFileSync(`./${fileName}`, JSON.stringify(data));
  return data;
};
