import useClock from '../../utils/useClock';

import css from './RestrictionCard.module.css';

export const RestrictionCard = ({ id }) => {
  const costaRicaTime = useClock('America/Costa_Rica');

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getDayName = () => {
    return capitalizeFirstLetter(
      costaRicaTime.toLocaleString('es-ES', { weekday: 'long' })
    );
  };

  const dayName = getDayName();

  const RESTRICTIONS = [
    '1 - 2',
    '3 - 4',
    '5 - 6',
    '7 - 8',
    '9 - 0',
    'Sin restricción',
  ];

  const isRestriction = (currentDay) => {
    if (currentDay === 'Lunes') {
      return RESTRICTIONS[0];
    } else if (currentDay === 'Martes') {
      return RESTRICTIONS[1];
    } else if (currentDay === 'Miércoles') {
      return RESTRICTIONS[2];
    } else if (currentDay === 'Jueves') {
      return RESTRICTIONS[3];
    } else if (currentDay === 'Viernes') {
      return RESTRICTIONS[4];
    } else {
      return RESTRICTIONS[5];
    }
  };

  return (
    <div className={css.RestrictionCard} id={id}>
      <h1 className={css.cardTitle}>Restricción</h1>
      <h2 className={css.restrictionNumber}>Placas: {isRestriction(dayName)}</h2>
    </div>
  );
};
