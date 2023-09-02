function timestampToDate(timestamp) {
  const date = timestamp.toDate();
  const day = date.getDate();
  let month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  if (month < 10) {
    month = '0' + month;
  }

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

export default timestampToDate;
