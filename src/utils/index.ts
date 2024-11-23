export function getTodayTime(format = '-') {
  const tody = new Date();
  const year = tody.getFullYear();
  const month = padZero(tody.getMonth() + 1);
  const day = padZero(tody.getDate());
  return `${year}${format}${month}${format}${day}`;
}

function padZero(num: number) {
  return num < 10 ? '0' + num : num;
}