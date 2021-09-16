document.addEventListener("DOMContentLoaded", () => {
  new Chart(document.getElementById("points-per-sprint"), {
    type: "line",
    options: {
      ...utils.options(),
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
