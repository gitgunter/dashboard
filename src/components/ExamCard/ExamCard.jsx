import { Link } from 'react-router-dom';

import { Delete01 } from '@icons/index';

import css from './ExamCard.module.css';

export const ExamCard = ({
  name,
  status,
  score,
  correct,
  incorrect,
  path,
  onDelete,
}) => {
  const isExamStatus = score < 70 ? css.failed : css.approved;

  const handleDeleteClick = (event) => {
    event.stopPropagation();
    event.preventDefault();
    
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <Link to={path} className={`${css.ExamCard} ${isExamStatus}`}>
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span className={`${css.examScore} ${isExamStatus}`}>
          {score}
          <h2>Nota</h2>
        </span>
        <button
          type='button'
          className={css.deleteExamBtn}
          onClick={handleDeleteClick}
        >
          <Delete01 className={css.deleteIcon} />
        </button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h1 className={css.examName}>{name}</h1>
        <h2 className={`${css.examStatus} ${isExamStatus}`}>{status}</h2>
      </div>
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div className={css.correct}>
          <h2 className={css.label}>Aciertos</h2>
          <h1 className={css.number}>{correct}</h1>
        </div>
        <div className={css.incorrect}>
          <h2 className={css.label}>Fallos</h2>
          <h1 className={css.number}>{incorrect}</h1>
        </div>
      </div>
    </Link>
  );
};
