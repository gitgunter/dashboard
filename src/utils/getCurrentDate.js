function getCurrentDate() {
  const date = new Date();
  const day = date.getDate();
  const months = [
    'Ene',
    'Feb',
    'Mar',
    'Abr',
    'May',
    'Jun',
    'Jul',
    'Ago',
    'Sep',
    'Oct',
    'Nov',
    'Dic',
  ];
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = date.getHours() % 12 || 12;
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const period = date.getHours() >= 12 ? 'PM' : 'AM';

  return `${day} ${month}, ${year}, ${hours}:${minutes} ${period}`;
}

export default getCurrentDate;