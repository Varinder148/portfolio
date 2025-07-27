const formatTime = (ms: number) => {
  // Validate input
  if (isNaN(ms) || ms < 0) {
    return "0 years 0 months 0 days 00:00:00";
  }

  // Ensure ms is a valid number
  ms = Math.floor(ms);

  const years = Math.floor(ms / (1000 * 60 * 60 * 24 * 365));
  ms -= years * (1000 * 60 * 60 * 24 * 365);
  const months = Math.floor(ms / (1000 * 60 * 60 * 24 * 30));
  ms -= months * (1000 * 60 * 60 * 24 * 30);
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  ms -= days * (1000 * 60 * 60 * 24);
  const hours = Math.floor(ms / (1000 * 60 * 60));
  ms -= hours * (1000 * 60 * 60);
  const minutes = Math.floor(ms / (1000 * 60));
  ms -= minutes * (1000 * 60);
  const seconds = Math.floor(ms / 1000);

  // Ensure all values are valid numbers
  const safeYears = isNaN(years) ? 0 : years;
  const safeMonths = isNaN(months) ? 0 : months;
  const safeDays = isNaN(days) ? 0 : days;
  const safeHours = isNaN(hours) ? 0 : hours;
  const safeMinutes = isNaN(minutes) ? 0 : minutes;
  const safeSeconds = isNaN(seconds) ? 0 : seconds;

  const formattedHours = safeHours.toString().padStart(2, "0");
  const formattedMinutes = safeMinutes.toString().padStart(2, "0");
  const formattedSeconds = safeSeconds.toString().padStart(2, "0");

  return `${safeYears} years ${safeMonths} months ${safeDays} days ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

export default formatTime;
