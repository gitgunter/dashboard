import css from './Breadcrumbs.module.css';

import { ArrowLeft02 } from '@icons/index';

export const Breadcrumbs = ({ onGoBack, paths }) => {
  return (
    <div className={css.Breadcrumbs}>
      {onGoBack && (
        <button type='button' className={css.goBackBtn} onClick={onGoBack}>
          <ArrowLeft02 size={20} className={css.icon} />
        </button>
      )}
      {paths.map((path, index) => (
        <div className={css.breadcrumbItem} key={index}>
          {path}
          {index !== paths.length - 1 && (
            <span className={css.separator}>/</span>
          )}
        </div>
      ))}
    </div>
  );
};
