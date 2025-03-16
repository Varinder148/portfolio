"use client";

import formatTime from "@/utils/timeCalculator";
import { useEffect, useState } from "react";

const Time = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const id = setInterval(() => {
      const date = new Date().getTime();
      const startDate = new Date("2019-08-5").getTime();
      const totalTime = date - startDate;

      console.log("triggered");
      setTime(formatTime(totalTime));
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return time;
};

export default Time;
