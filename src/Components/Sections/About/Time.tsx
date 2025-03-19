import formatTime from "@/utils/timeCalculator";
import { useEffect, useState } from "react";

const Time = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const date = new Date().getTime();
      const startDate = new Date("2019-08-5").getTime();
      const totalTime = date - startDate;

      setTime(formatTime(totalTime));
    };

    updateTime(); // Set the initial time immediately

    const id = setInterval(updateTime, 1000);

    return () => clearInterval(id);
  }, []);

  return <span className="text-3xl text-black-light about-body ">{time}</span>;
};

export default Time;
