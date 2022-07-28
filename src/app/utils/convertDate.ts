export default (date: String): Date => {
  console.log(date);
  const [day, month, year] = date.split('/');
  return new Date(+year, +month - 1, +day);
};
