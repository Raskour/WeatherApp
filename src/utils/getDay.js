function getDay(dateString) {
  // Create a Date object from the input string
  const date = new Date(dateString);

  // Define an array of weekday names
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  // Get the day index (0-6) from the Date object
  const dayIndex = date.getDay();

  // Get the weekday name from the array based on the day index
  const dayOfWeek = weekdays[dayIndex];

  return dayOfWeek;
}

export default getDay;
