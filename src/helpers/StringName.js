export const capilizeFirstLetter = (name) =>
  name.charAt(0).toUpperCase() + name.slice(1);

export const userFullName = (hasUser, firstName, middleName, lastName) =>
  hasUser
    ? `${capilizeFirstLetter(firstName)} ${capilizeFirstLetter(
        middleName
      )} ${capilizeFirstLetter(lastName)}`
    : "";
