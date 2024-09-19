/* Format Date Function */
export const formatDateTime = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = `0${d.getMonth() + 1}`.slice(-2);
  const day = `0${d.getDate()}`.slice(-2);
  let hours = d.getHours();
  const minutes = `0${d.getMinutes()}`.slice(-2);
  const seconds = `0${d.getSeconds()}`.slice(-2);

  /* Determine AM/PM suffix */
  const ampm = hours >= 12 ? "PM" : "AM";
  /* Convert hours to 12-hour format */
  hours = hours % 12;
  hours = hours ? hours : 12; /* the hour '0' should be '12' */

  return `${hours}:${minutes}:${seconds} ${ampm} - ${day}/${month}/${year}`;
};