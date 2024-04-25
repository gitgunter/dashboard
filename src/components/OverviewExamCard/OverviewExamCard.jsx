import { Link } from 'react-router-dom';
import css from './OverviewExamCard.module.css';

export const OverviewExamCard = ({ title, action, actionPath, id }) => {
  return (
    <div className={css.OverviewSectionCard} id={id}>
      <div className={css.cardHeader}>
        <h1 className={css.headerTitle}>{title}</h1>
        {action && (
          <Link to={actionPath} className={css.headerAction}>
            {action}
          </Link>
        )}
      </div>
      <div className={css.cardContent}>content</div>
    </div>
  );
};
