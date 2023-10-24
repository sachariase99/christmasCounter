// ChristmasCountdown.js
import React, { useState, useEffect } from 'react';

function ChristmasCountdown() {
  const [daysUntilChristmas, setDaysUntilChristmas] = useState(0);

  useEffect(() => {
    const christmasDate = new Date(new Date().getFullYear(), 11, 25);
    const today = new Date();
    const timeUntilChristmas = christmasDate - today;
    const daysUntilChristmas = Math.ceil(timeUntilChristmas / (1000 * 60 * 60 * 24));
    setDaysUntilChristmas(daysUntilChristmas);
  }, []);

  return (
    <div>
      <h1>Christmas Countdown</h1>
      <p>There are {daysUntilChristmas} days until Christmas!</p>
    </div>
  );
}

export default ChristmasCountdown;