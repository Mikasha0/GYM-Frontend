import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const SalesLineChart = () => {
  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "Novermber",
      "December",
    ],
    datasets: [
      {
        label: "Sales",
        data: [
          6500, 6418, 6456, 6526, 6356, 6456, 6600, 6500, 6418, 6456, 6526,
          6356, 6456, 6600,
        ],
        borderColor: "#1A56DB",
        backgroundColor: "rgba(26, 86, 219, 0.5)",
        fill: true,
        tension: 0.4, // Smooth line
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        display: false,
        title: {
          display: false,
        },
      },
      y: {
        display: false,
        title: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="h-full">
      <p className="font-bold text-sm mt-1">Rs. 12,321</p>
      <Line data={data} options={options} />
      <span className="" style={{ fontSize: "9px" }}>
        Sales have increased by 17.1% compared to last month.
      </span>
    </div>
  );
};

export default SalesLineChart;
