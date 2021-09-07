//remove outliers from array of values
export const filterOutliers = (values) => {
  const filteredValues = [];
  const numValues = values.length;
  const sortedValues = values.sort((a, b) => a - b);
  const median = getMedian(values);
  const q1 = sortedValues[Math.floor((numValues / 4) * 1)];
  const q3 = sortedValues[Math.floor((numValues / 4) * 3)];
  const iqr = q3 - q1;
  const min = q1 - iqr * 1.5;
  const max = q3 + iqr * 1.5;
  for (let i = 0; i < numValues; i++) {
    if (sortedValues[i] >= min && sortedValues[i] <= max) {
      filteredValues.push(sortedValues[i]);
    }
  }
  return filteredValues;
};

export const getMedian = (values) => {
  const numValues = values.length;
  const sortedValues = values.sort((a, b) => a - b);
  return sortedValues[Math.floor(numValues / 2)];
};

export const getAverge = (values) => {
  const numValues = values.length;
  let sum = 0;
  for (let i = 0; i < numValues; i++) {
    sum += values[i];
  }
  return sum / numValues;
};

export const getMean = (values) => {
  return values.reduce((a, b) => a + b, 0) / values.length;
};

export const getStandardDeviation = (values) => {
  const mean = getMean(values);
  const squareDiffs = values.map(function (value) {
    const diff = value - mean;
    return diff * diff;
  });
  return Math.sqrt(getMean(squareDiffs));
};
