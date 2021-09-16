utils = {
  hexToRgb: function (hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  },
  colors: {
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
  },

  options: (cb) => {
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
  },
  addActions: (actions, selector, chart) => {
    actions.forEach((action) => {
      const button = document.createElement("Button");
      button.addEventListener("click", () => {
        action.handler(chart);
      });
      button.innerText = action.name;
      document.querySelector(selector).appendChild(button);
    });
  },
};
