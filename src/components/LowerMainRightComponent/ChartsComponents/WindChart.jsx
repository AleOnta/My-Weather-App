// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from "chart.js/auto";
import { Line } from "react-chartjs-2";

const windOptions = {
  scales: {
    y: {
      beginAtZero: true,
      suggestedMax: 5,
      title: {
        display: true,
        text: "Effective speed expressed in 'Km/h'",
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

export const WindChart = ({ chartData }) => {
  return <Line data={chartData} options={windOptions} />;
};
