const fixZero = val => {
  let result = '00' + val;
  return result.slice(result.length - 2);
};

const getDateString = d => {
  return `${d.getFullYear()}-${fixZero(d.getMonth() + 1)}-${fixZero(d.getDate())}`;
};

const getTimeString = d => {
  return `${fixZero(d.getHours())}:${fixZero(d.getMinutes())}:${fixZero(d.getSeconds())}`;
};

export const dateFilter = (value, format = 'date') => {
  let d = new Date(value);
  let result;
  switch (format) {
    case 'date':
      result = getDateString(d);
      break;
    case 'time':
      result = getTimeString(d);
      break;
    case 'datetime':
      result = `${getDateString(d)} ${getTimeString(d)}`;
      break;
    default:
      result = value;
      break;
  }
  return result;
};
