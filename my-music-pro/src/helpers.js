export const convertSecToMinAndSec = (time) => {
  const roundedTime = Math.round(time);
  const minutes = Math.floor(roundedTime / 60);
  let seconds = roundedTime % 60;
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  return `${minutes}:${seconds}`;
};

// export const mixArray = (array) => {
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
//   }
//   return array;
// };
