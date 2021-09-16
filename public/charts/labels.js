document.addEventListener("DOMContentLoaded", () => {
  new Chart(document.getElementById("labels-chart"), {
    type: "pie",
    data: {
      labels: Object.keys(data.labels),
      datasets: [
        {
          data: Object.values(data.labels).map((label) => label.amount),
          backgroundColor: Object.values(data.labels).map((label) => {
            const rgb = utils.hexToRgb(label.color);
            return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.3)`;
          }),
          borderColor: Object.values(data.labels).map((label) => {
            const rgb = utils.hexToRgb(label.color);
            return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
          }),
          borderWidth: 1,
        },
      ],
    },
  });
});
