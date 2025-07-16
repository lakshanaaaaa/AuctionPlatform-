import React, { useState, useEffect } from "react";

const CountdownTimer = ({ initialMinutes, initialSeconds }) => {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prev) => prev - 1);
      } else {
        if (minutes === 0) {
          clearInterval(timer);
        } else {
          setMinutes((prev) => prev - 1);
          setSeconds(59);
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [minutes, seconds]);

  return (
    <div className="text-red-600 font-semibold">
      {minutes === 0 && seconds === 0
        ? "Auction Ended"
        : `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`}
    </div>
  );
};

export default CountdownTimer;
