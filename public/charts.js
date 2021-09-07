function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

const colors = {
  backgroundColor: [
    "rgba(75, 192, 192, 0.3)",
    "rgba(54, 162, 235, 0.3)",
    "rgba(153, 102, 255, 0.3)",
    "rgba(201, 203, 207, 0.3)",
    "rgba(142, 124, 68, 0.3)",
    "rgba(255, 205, 86, 0.3)",
    "rgba(255, 159, 64, 0.3)",
    "rgba(255, 99, 132, 0.3)",
  ],
  borderColor: [
    "rgb(75, 192, 192)",
    "rgb(54, 162, 235)",
    "rgb(153, 102, 255)",
    "rgb(201, 203, 207)",
    "rgb(142, 124, 68)",
    "rgb(255, 205, 86)",
    "rgb(255, 159, 64)",
    "rgb(255, 99, 132)",
  ],
  borderWidth: 1,
};

const options = (cb) => {
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: false,
      },
      legend: { display: false },
    },
  };

  if (cb) {
    options.tooltips = {
      callbacks: {
        label: function (context) {
          return cb(context.label, context.parsed);
        },
      },
    };
  }
  return options;
};

addActions = (actions, selector, chart) => {
  actions.forEach((action) => {
    const button = document.createElement("Button");
    button.addEventListener("click", () => {
      action.handler(chart);
    });
    button.innerText = action.name;
    document.querySelector(selector).appendChild(button);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  var labels_chart = new Chart(document.getElementById("labels_chart"), {
    type: "pie",
    data: {
      labels: Object.keys(data.labels),
      datasets: [
        {
          data: Object.values(data.labels).map((label) => label.amount),
          backgroundColor: Object.values(data.labels).map((label) => {
            const rgb = hexToRgb(label.color);
            return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.3)`;
          }),
          borderColor: Object.values(data.labels).map((label) => {
            const rgb = hexToRgb(label.color);
            return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
          }),
          borderWidth: 1,
        },
      ],
    },
  });

  var time_to_close_chart = new Chart(
    document.getElementById("time_to_close_issue_chart"),
    {
      type: "bar",
      options: {
        ...options((label, parsed) => `${parsed.y} closed in ${label} days `),
      },
      data: {
        labels: Object.keys(data.issues_time_closed_grouped),
        datasets: [
          {
            data: Object.values(data.issues_time_closed_grouped),
            ...colors,
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
          labels: Object.keys(data.issues_time_closed_grouped),
          datasets: [
            {
              data: Object.values(data.issues_time_closed_grouped),
              ...colors,
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
          labels: Object.keys(data.pr_time_closed_grouped),
          datasets: [
            {
              data: Object.values(data.pr_time_closed_grouped),
              ...colors,
            },
          ],
        };
        chart.update();
      },
    },
  ];
  addActions(actions, "#time_to_close_actions", time_to_close_chart);

  new Chart(document.getElementById("points_distribution"), {
    type: "bar",
    options: {
      ...options(),
    },
    data: {
      labels: Object.keys(data.issues_by_points.count_by_points).map(
        (k) => k.toString() + " points"
      ),
      label: "culo",
      datasets: [
        {
          data: Object.values(data.issues_by_points.count_by_points),
          backgroundColor: Object.keys(
            data.issues_by_points.count_by_points
          ).map((k) => {
            cardValues = ["1", "2", "3", "5", "8", "13", "20", "40", "100"];
            if (cardValues.includes(k)) {
              return "rgba(75, 192, 192, 0.3)";
            }

            return "rgba(201, 203, 207, 0.3)";
          }),
          borderColor: Object.keys(data.issues_by_points.count_by_points).map(
            (k) => {
              cardValues = ["1", "2", "3", "5", "8", "13", "20", "40", "100"];
              if (cardValues.includes(k)) {
                return "rgb(75, 192, 192)";
              }

              return "rgb(201, 203, 207)";
            }
          ),
          borderWidth: 1,
        },
      ],
    },
  });

  const scatterData = Object.keys(
    data.issues_by_points.average_time_to_close_by_points
  ).map((k, index) => {
    colorIndex = index % colors.backgroundColor.length;
    return {
      label: k,
      data: data.issues_by_points.average_time_to_close_by_points[
        k
      ].all_issue_duration.map((d) => ({ x: parseInt(k), y: d })),
      backgroundColor: colors.backgroundColor[colorIndex],
      borderColor: colors.borderColor[colorIndex],
      borderWidth: 1,
      pointRadius: 5,
      pointHoverRadius: 8,
    };
  });

  new Chart(document.getElementById("time_to_close_by_points_distribution"), {
    type: "scatter",
    options: {
      plugins: {
        legend: {
          title: {
            display: true,
            text: "Estimated points",
          },
        },
      },
    },
    data: {
      datasets: scatterData,
    },
  });

  new Chart(document.getElementById("avg_time_to_close_by_points"), {
    type: "line",
    data: {
      labels: Object.keys(
        data.issues_by_points.average_time_to_close_by_points
      ).map((k) => k.toString() + " points"),
      datasets: [
        {
          label: "Issues",
          data: Object.keys(
            data.issues_by_points.average_time_to_close_by_points
          ).map((k) => {
            return data.issues_by_points.average_time_to_close_by_points[k]
              .avg_time_to_close_issue;
          }),
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.3)",
        },
        {
          label: "Pull Request",
          data: Object.keys(
            data.issues_by_points.average_time_to_close_by_points
          ).map((k) => {
            return data.issues_by_points.average_time_to_close_by_points[k]
              .avg_time_to_close_pr;
          }),
          borderColor: "rgb(54, 162, 235)",
          backgroundColor: "rgba(54, 162, 235, 0.3)",
        },
      ],
    },
  });

  new Chart(document.getElementById("points_per_sprint"), {
    type: "line",
    options: {
      ...options(),
    },
    data: {
      labels: data.sprints.map((sprint) => {
        return new Date(sprint.start).toLocaleDateString();
      }),
      datasets: [
        {
          data: data.sprints.map((sprint) => sprint.points),
          borderColor: "rgb(75, 192, 192)",
          backgroundColor: "rgba(75, 192, 192, 0.3)",
        },
      ],
    },
  });
});
