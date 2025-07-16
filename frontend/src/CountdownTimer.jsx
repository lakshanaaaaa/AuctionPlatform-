import React, { useEffect, useState } from "react";

const CountdownTimer = ({ initialMinutes = 60, initialSeconds = 0 }) => {
  const [time, setTime] = useState(() => {
    return initialMinutes * 60 + initialSeconds;
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    return [
      hrs.toString().padStart(2, "0"),
      mins.toString().padStart(2, "0"),
      secs.toString().padStart(2, "0"),
    ].join(":");
  };

  return (
    <p className="text-gray-700 font-mono font-semibold mt-2">
      ⏳ Time Left: {formatTime(time)}
    </p>
  );
};

export default CountdownTimer;
