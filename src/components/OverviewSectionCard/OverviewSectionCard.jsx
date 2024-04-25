import { Link } from 'react-router-dom';
import css from './OverviewSectionCard.module.css';

export const OverviewSectionCard = ({ title, action, actionPath, id, children }) => {
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
      <div className={css.cardContent}>
        {children}
      </div>
    </div>
  );
};
