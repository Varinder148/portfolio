"use client";

import formatTime from "@/utils/timeCalculator";
import { parseDateSafely } from "@/utils/iosUtils";
import React, { useEffect, useState, memo } from "react";

const Time = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      try {
        const date = new Date().getTime();

        // Use safer date parsing for iOS Safari
        const startDateObj = parseDateSafely("2019-08-05");
        if (!startDateObj) {
          console.error("Invalid start date");
          setTime("0 years 0 months 0 days 00:00:00");
          return;
        }

        const startDate = startDateObj.getTime();

        // Check if date parsing was successful
        if (isNaN(startDate)) {
          console.error("Invalid start date");
          setTime("0 years 0 months 0 days 00:00:00");
          return;
        }

        const totalTime = date - startDate;

        // Check if calculation is valid
        if (isNaN(totalTime) || totalTime < 0) {
          console.error("Invalid time calculation");
          setTime("0 years 0 months 0 days 00:00:00");
          return;
        }

        setTime(formatTime(totalTime));
      } catch (error) {
        console.error("Error calculating time:", error);
        setTime("0 years 0 months 0 days 00:00:00");
      }
    };

    updateTime();

    const id = setInterval(updateTime, 1000);

    return () => clearInterval(id);
  }, []);

  return (
    <div className=" text-2xl md:text-3xl text-theme-ivory ">
      {time.split(" ").slice(0, 6).join(" ")}
      <br />
      {time.split(" ").slice(6).join(" ")}
    </div>
  );
};

export default memo(Time);
