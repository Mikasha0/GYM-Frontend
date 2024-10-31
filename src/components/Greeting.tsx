import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";

const Greeting = () => {
  const [greeting, setGreeting] = useState("");
  const [icon, setIcon] = useState("/sun.png");
  const { darkTheme } = useTheme();

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      setGreeting("Good Morning");
      setIcon("/sun.png");
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting("Good Afternoon");
      setIcon("/sunset.png");
    } else {
      setGreeting("Good Evening");
      setIcon("/moon.png");
    }
  }, []);

  return (
    <div className="flex">
      <h1 className={`flex ${darkTheme ? "text-white" : "text-black"}`}>
        {greeting}, Aniket
        <Image
          src={icon}
          width={24}
          height={24}
          alt={greeting}
          style={{ marginLeft: "8px" }}
        />
      </h1>
    </div>
  );
};

export default Greeting;
