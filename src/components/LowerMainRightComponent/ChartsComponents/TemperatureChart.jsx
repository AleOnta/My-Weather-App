// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";

const tempOptions = {
  scales: {
    y: {
      beginAtZero: false,
      suggestedMin: 0,
      suggestedMax: 45,
      title: {
        display: true,
        text: "Recorded Temperature in 'C°'",
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

export const TemperatureChart = ({ chartData }) => {
  return <Bar data={chartData} options={tempOptions} />;
};
