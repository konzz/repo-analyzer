document.addEventListener("DOMContentLoaded", () => {
  const cardValues = ["1", "2", "3", "5", "8", "13", "20", "40", "100"];

  new Chart(document.getElementById("issues-by-points-distribution"), {
    type: "bar",
    options: {
      ...utils.options(),
    },
    data: {
      labels: Object.keys(data.issuesByPoints.countByPoints).map(
        (k) => k.toString() + " points"
      ),
      datasets: [
        {
          data: Object.values(data.issuesByPoints.countByPoints),
          backgroundColor: Object.keys(data.issuesByPoints.countByPoints).map(
            (k) => {
              if (cardValues.includes(k)) {
                return "rgba(75, 192, 192, 0.3)";
              }

              return "rgba(201, 203, 207, 0.3)";
            }
          ),
          borderColor: Object.keys(data.issuesByPoints.countByPoints).map(
            (k) => {
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
});
