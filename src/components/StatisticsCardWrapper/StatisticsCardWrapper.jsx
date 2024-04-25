import correctIcon from '../../assets/images/thumbs-up-solid-rounded.svg';
import incorrectIcon from '../../assets/images/thumbs-down-solid-rounded.svg';
import examsIcon from '../../assets/images/note-solid-rounded.svg';
import modesIcon from '../../assets/images/puzzle-solid-rounded.svg';

import css from './StatisticsCardWrapper.module.css';

export const StatisticsCardWrapper = ({
  aciertos,
  fallos,
  examenes,
  modalidades,
  id,
}) => {
  return (
    <div className={css.StatisticsCardWrapper} id={id}>
      <StatCard icon={correctIcon} label='Aciertos' number={aciertos} />
      <StatCard icon={incorrectIcon} label='Fallos' number={fallos} />
      <StatCard icon={examsIcon} label='Exámenes' number={examenes} />
      <StatCard icon={modesIcon} label='Modalidades' number={modalidades} />
    </div>
  );
};

export const StatCard = ({ icon, label, number }) => {
  return (
    <div className={css.StatCard}>
      <div className={css.statIcon}>
        <img src={icon} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h2 className={css.statTitle}>{label}</h2>
        <h1 className={css.statNumber}>{number}</h1>
      </div>
    </div>
  );
};
