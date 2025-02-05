export const capitalize = (str: string) => {
  const formattedStr = str.replace('_', ' ').toLowerCase();

  return formattedStr.charAt(0).toUpperCase() + formattedStr.slice(1);
};
