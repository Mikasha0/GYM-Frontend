import React from "react";
import { useQuery } from "@tanstack/react-query";

export const fetchTime = async () => {
  const response = await fetch("https://corsproxy.io/?https://worldtimeapi.org/api/ip");
  if (!response.ok) {
    throw new Error("Failed to fetch time");
  }
  return response.json();
};

const Greeting = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["greeting"],
    queryFn: fetchTime,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching time</div>;

  const currentHour = new Date(data.datetime).getHours();

  let greeting;
  if (currentHour < 12) {
    greeting = "Good Morning 🌞";
  } else if (currentHour < 18) {
    greeting = "Good Afternoon 👋🌞";
  } else {
    greeting = "Good Evening 🌛";
  }

  return (
    <div>
      <h1>{greeting} , Aniket</h1>
    </div>
  );
};

export default Greeting;
