document.addEventListener("DOMContentLoaded", () => {
  new Chart(document.getElementById("avg-time-to-close-by-points"), {
    type: "line",
    data: {
      labels: Object.keys(data.issuesByPoints.averageTimeToCloseByPoints).map(
        (k) => k.toString() + " points"
      ),
      datasets: [
        {
          label: "Issues",
          data: Object.keys(data.issuesByPoints.averageTimeToCloseByPoints).map(
            (k) => {
              return data.issuesByPoints.averageTimeToCloseByPoints[k]
                .avgTimeToCloseIssue;
            }
          ),
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.3)",
        },
        {
          label: "Pull Request",
          data: Object.keys(data.issuesByPoints.averageTimeToCloseByPoints).map(
            (k) => {
              return data.issuesByPoints.averageTimeToCloseByPoints[k]
                .avgTimeToClosePr;
            }
          ),
          borderColor: "rgb(54, 162, 235)",
          backgroundColor: "rgba(54, 162, 235, 0.3)",
        },
      ],
    },
  });
});
