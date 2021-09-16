document.addEventListener("DOMContentLoaded", () => {
  var timeToCloseChart = new Chart(
    document.getElementById("time-to-close-issue-chart"),
    {
      type: "bar",
      options: {
        ...utils.options(
          (label, parsed) => `${parsed.y} closed in ${label} days `
        ),
      },
      data: {
        labels: Object.keys(data.issuesGroupedByDaysToClose),
        datasets: [
          {
            data: Object.values(data.issuesGroupedByDaysToClose),
            ...utils.colors,
          },
        ],
      },
    }
  );

  actions = [
    {
      name: "Issues",
      handler(chart) {
        chart.data = {
          labels: Object.keys(data.issuesGroupedByDaysToClose),
          datasets: [
            {
              data: Object.values(data.issuesGroupedByDaysToClose),
              ...utils.colors,
            },
          ],
        };
        chart.update();
      },
    },

    {
      name: "Pull Request",
      handler(chart) {
        chart.data = {
          labels: Object.keys(data.prGroupedByDaysToClose),
          datasets: [
            {
              data: Object.values(data.prGroupedByDaysToClose),
              ...utils.colors,
            },
          ],
        };
        chart.update();
      },
    },
  ];
  utils.addActions(actions, "#time-to-close-actions", timeToCloseChart);
});
