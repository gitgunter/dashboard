import css from './ExamTableCard.module.css';

export const ExamTableCard = ({ name, status, score, onClick }) => {
  const isExamStatus = score < 70 ? css.failed : css.approved;

  return (
    <div className={`${css.ExamTableCard} ${isExamStatus}`} onClick={onClick}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h1 className={css.examName}>{name}</h1>
        <h2 className={`${css.examStatus} ${isExamStatus}`}>{status}</h2>
      </div>
      <span className={`${css.examScore} ${isExamStatus}`}>
        {score}
      </span>
    </div>
  );
};
