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
import { UserData } from "@/types/userdata.type";
import { useTheme } from "@/context/ThemeContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const MemberLineChart = ({ member }: { member: UserData[] }) => {
  const registrationCounts = Array(12).fill(0);
  const { darkTheme } = useTheme();

  member.forEach((user) => {
    const registrationDate = new Date(user.joindate);
    const month = registrationDate.getMonth();
    registrationCounts[month]++;
  });

  console.log(member.length);
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
        label: "Members",
        data: registrationCounts,
        borderColor: "#1A56DB",
        backgroundColor: "rgba(26, 86, 219, 0.5)",
        fill: true,
        tension: 0.4,
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

  console.log(member.length);

  return (
    <div className="h-[90%] flex flex-col justify-between">
      {member.length == 0 ? (
        <>
          <div className="flex">
            <p
              className={`font-semibold text-base mt-2 ${
                darkTheme ? "text-white" : "text-black"
              }`}
            >
              Rs. 0
            </p>
            
          </div>
          <div className="flex flex-col justify-end h-full">
            <hr className="border-[#1089FF]"/>
            <span
              className={`text-center ${
                darkTheme ? "text-white" : "text-black"
              }`}
              style={{ fontSize: "9px", marginTop: "8px" }}
            >
              No sales recorded.
            </span>
          </div>
        </>
      ) : (
        <>
          <div>
            <p
              className={`font-semibold text-xs mt-2 ${
                darkTheme ? "text-white" : "text-black"
              }`}
            >
              Total Members: {member.length}
            </p>
          </div>
          <div className="flex flex-col justify-end h-full pb-6">
            <Line data={data} options={options} />
            <span
              className={`text-center ${
                darkTheme ? "text-white" : "text-black"
              }`}
              style={{ fontSize: "9px", marginTop: "8px" }}
            >
              Registration trends over the year.
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default MemberLineChart;
