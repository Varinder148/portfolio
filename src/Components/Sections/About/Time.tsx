"use client";

import formatTime from "@/utils/timeCalculator";
import { parseDateSafely } from "@/utils/iosUtils";
import React, { useEffect, useState, memo, useMemo } from "react";
import { useViewport } from "@/Providers/ViewportProvider";

const Time = () => {
  const [time, setTime] = useState("");
  const { isMobile } = useViewport();

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

    // Reduce update frequency on mobile for better performance
    const updateInterval = isMobile ? 2000 : 1000;
    const id = setInterval(updateTime, updateInterval);

    return () => clearInterval(id);
  }, [isMobile]);

  // Memoize the formatted time display to prevent unnecessary re-renders
  const formattedTime = useMemo(() => {
    const timeParts = time.split(" ");
    return {
      firstLine: timeParts.slice(0, 6).join(" "),
      secondLine: timeParts.slice(6).join(" "),
    };
  }, [time]);

  return (
    <div className=" text-2xl md:text-3xl text-theme-ivory ">
      {formattedTime.firstLine}
      <br />
      {formattedTime.secondLine}
    </div>
  );
};

export default memo(Time);
