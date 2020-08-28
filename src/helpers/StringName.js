export const capilizeFirstLetter = (name) =>
  name.charAt(0).toUpperCase() + name.slice(1);

export const formatUserFullName = (
  firstName,
  middleName,
  lastName
) => {
  return `${capilizeFirstLetter(firstName)} ${capilizeFirstLetter(middleName)} ${capilizeFirstLetter(lastName)}`;
};
