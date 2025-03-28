const formatTime = (ms: number) => {
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

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  return `${years} years ${months} months ${days} days ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

export default formatTime;
