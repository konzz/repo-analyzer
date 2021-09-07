export const countLabels = (issues) => {
  const labels = {};
  issues.forEach((issue) => {
    issue.labels.forEach((label) => {
      if (label.name === "Sprint" || label.name === "Sprint-Ready") {
        return;
      }
      if (labels[label.name]) {
        labels[label.name].amount++;
      } else {
        labels[label.name] = { amount: 1, color: label.color };
      }
    });
  });
  return labels;
};
