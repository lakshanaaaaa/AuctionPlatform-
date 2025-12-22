import React, { useEffect, useState } from "react";

const CountdownTimer = ({ initialMinutes = 60, initialSeconds = 0, isDefault = false, endTime = null }) => {
  const [time, setTime] = useState(() => {
    if (isDefault) {
      // For default products, create a realistic but infinite timer
      const randomMinutes = Math.floor(Math.random() * 30) + 15; // 15-45 minutes
      const randomSeconds = Math.floor(Math.random() * 60);
      return randomMinutes * 60 + randomSeconds;
    }
    
    if (endTime) {
      const now = new Date().getTime();
      const end = endTime.toDate ? endTime.toDate().getTime() : new Date(endTime).getTime();
      return Math.max(0, Math.floor((end - now) / 1000));
    }
    
    return initialMinutes * 60 + initialSeconds;
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (isDefault) {
          // For default products, reset to a new random time when it reaches 0
          if (prevTime <= 0) {
            const randomMinutes = Math.floor(Math.random() * 30) + 15;
            const randomSeconds = Math.floor(Math.random() * 60);
            return randomMinutes * 60 + randomSeconds;
          }
          return prevTime - 1;
        }
        
        // For real auctions, countdown normally
        return prevTime > 0 ? prevTime - 1 : 0;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isDefault]);

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