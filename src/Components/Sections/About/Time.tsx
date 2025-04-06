"use client";

import formatTime from "@/utils/timeCalculator";
import React, { useEffect, useState, memo } from "react";

const Time = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const date = new Date().getTime();
      const startDate = new Date("2019-08-5").getTime();
      const totalTime = date - startDate;

      setTime(formatTime(totalTime));
    };

    console.log("Time updated");
    updateTime();

    const id = setInterval(updateTime, 1000);

    return () => clearInterval(id);
  }, []);

  return (
    <div className="text-theme-xl md:text-theme-2xl text-theme-gray ">
      {time.split(" ").slice(0, 6).join(" ")}
      <br />
      {time.split(" ").slice(6).join(" ")}
    </div>
  );
};

export default memo(Time);
