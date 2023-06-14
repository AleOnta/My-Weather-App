// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";

const humOptions = {
  scales: {
    y: {
      type: "linear",
      beginAtZero: true,
      suggestedMax: 100,
      title: {
        display: true,
        text: "Recorded Humidity in '%'",
      },
    },
    x: {
      title: {
        display: true,
        text: "Date represented as 'yyyy-mm-dd'",
      },
    },
  },
};

export const HumidityChart = ({ chartData }) => {
  return <Bar data={chartData} options={humOptions} />;
};
