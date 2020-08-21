export const filterDateTime = (timestamp) => {
  let dateTime;
  const date = timestamp.split(" ")[0];
  const time = timestamp.split(" ")[1];
  const dateArray = date.split("-");
  const year = parseInt(dateArray[2]);
  const month = parseInt(dateArray[1]) - 1;
  const day = parseInt(dateArray[0]);

  const dateCreated = new Date(year, month, day).setHours(0, 0, 0, 0);
  const todayDate = new Date().setHours(0, 0, 0, 0);
  if (dateCreated < todayDate) {
    dateTime =
      year < new Date(todayDate).getFullYear()
        ? `${day < 10 ? "0" + day : day}/${
            month + 1 < 10 ? "0" + (month + 1) : month + 1
          }/${year}`
        : `${day < 10 ? "0" + day : day}/${
            month + 1 < 10 ? "0" + (month + 1) : month + 1
          }`;
  } else {
    const hour = parseInt(time.split(":")[0]);
    const minute = parseInt(time.split(":")[1]);
    const AMPM = hour >= 12 ? "PM" : "AM";
    dateTime = `${
      hour > 12 || hour === 0 ? Math.abs(hour - 12) : hour
    }:${minute} ${AMPM}`;
  }
  return dateTime;
};

export const capilizeFirstLetter = (name) =>
  name.charAt(0).toUpperCase() + name.slice(1);

export const userFullName = (hasUser, firstName, middleName, lastName) =>
  hasUser
    ? `${capilizeFirstLetter(firstName)} ${capilizeFirstLetter(
        middleName
      )} ${capilizeFirstLetter(lastName)}`
    : "";
