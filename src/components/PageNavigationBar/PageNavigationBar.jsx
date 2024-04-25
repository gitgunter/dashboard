import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs';

import css from './PageNavigationBar.module.css';

export const PageNavigationBar = ({
  title,
  number,
  caption,
  breadcrumbs,
  onGoBack,
  children,
}) => {
  return (
    <div className={css.pageNavigationBar}>
      {breadcrumbs && <Breadcrumbs onGoBack={onGoBack} paths={breadcrumbs} />}
      <div
        style={onGoBack && { paddingTop: '0.625rem' }}
        className={css.headerWrapper}
      >
        <div className={css.titleAndCaption}>
          <h1 className={css.title}>
            {title} {number > 0 && <span className={css.number}>{number}</span>}
          </h1>
          {caption && <p className={css.caption}>{caption}</p>}
        </div>
        <div className={css.actions}>{children}</div>
      </div>
    </div>
  );
};
