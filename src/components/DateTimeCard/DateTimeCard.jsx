import useClock from '../../utils/useClock';

import css from './DateTimeCard.module.css';

export const DateTimeCard = ({ id }) => {
  const costaRicaTime = useClock('America/Costa_Rica');

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getDayName = () => {
    return capitalizeFirstLetter(
      costaRicaTime.toLocaleString('es-ES', { weekday: 'long' })
    );
  };

  const getMonthName = () => {
    return capitalizeFirstLetter(
      costaRicaTime.toLocaleString('es-ES', { month: 'long' })
    );
  };

  const formatTime = (time) => {
    return time < 10 ? '0' + time : time;
  };

  const day = costaRicaTime.getDate();
  const month = getMonthName();
  const year = costaRicaTime.getFullYear();
  const dayName = getDayName();
  const hours = costaRicaTime.getHours();
  const minutes = costaRicaTime.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const twelveHourFormat = hours % 12 || 12;

  return (
    <div className={css.DateTimeCard} id={id}>
      <span className={css.currentDate}>
        {day} {month} {year}
      </span>
      <h1 className={css.dayLabel}>{dayName}</h1>
      <h2 className={css.timeLabel}>
        {twelveHourFormat}:{formatTime(minutes)} {ampm}
      </h2>
    </div>
  );
};
