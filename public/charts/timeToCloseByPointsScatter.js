document.addEventListener("DOMContentLoaded", () => {
  const scatterData = Object.keys(
    data.issuesByPoints.averageTimeToCloseByPoints
  ).map((k, index) => {
    colorIndex = index % utils.colors.backgroundColor.length;
    return {
      label: k,
      data: data.issuesByPoints.averageTimeToCloseByPoints[
        k
      ].allIssuesDuration.map((d) => ({ x: parseInt(k), y: d })),
      backgroundColor: utils.colors.backgroundColor[colorIndex],
      borderColor: utils.colors.borderColor[colorIndex],
      borderWidth: 1,
      pointRadius: 5,
      pointHoverRadius: 8,
    };
  });

  new Chart(document.getElementById("time-to-close-by-points-scatter"), {
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
});
