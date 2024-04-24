export const convertSecToMinAndSec = (time) => {
  const roundedTime = Math.round(time);
  const minutes = Math.floor(roundedTime / 60);
  let seconds = roundedTime % 60;
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return `${minutes}:${seconds}`;
};
